import type { GithubUserItem } from "../types/GithubUser";
import type ErrorType from "../types/ErrorType";
import type { GithubUserRepositoryItem } from "../types/GithubUserRepository";

interface GithubUserResponse {
  id: number;
  login: string;
}
export const getGithubUser = async (
  username: string
): Promise<GithubUserItem[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}`
    );

    if (!response.ok) {
      const error: ErrorType = {
        code: response.status,
        message: response.statusText,
      };
      throw error;
    }

    const data = await response.json();

    if (data.items != undefined && data.items != null) {
      const result: GithubUserItem[] = data.items.map(
        (item: GithubUserResponse) => ({
          id: item.id,
          name: item.login,
        })
      );

      return result;
    }
    const result: GithubUserItem[] = [];
    return result;
  } catch (err) {
    console.error(err);
    const error: ErrorType = {
      code: null,
      message: "unknown error",
    };
    throw error;
  }
};

interface RepositoryResponse {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}

export const getGithubUserRepository = async (
  username: string
): Promise<GithubUserRepositoryItem[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    if (!response.ok) {
      const error: ErrorType = {
        code: response.status,
        message: response.statusText,
      };
      throw error;
    }

    const data = await response.json();
    if (data != undefined && data != null) {
      const result: GithubUserRepositoryItem[] = data.map(
        (item: RepositoryResponse) => {
          return {
            id: item.id.toString(),
            name: item.name,
            description: item.description,
            star: item.stargazers_count,
          };
        }
      );

      return result;
    }
    const result: GithubUserRepositoryItem[] = [];
    return result;
  } catch (err) {
    console.error(err);
    const error: ErrorType = {
      code: null,
      message: "unknown error",
    };
    throw error;
  }
};
