import type ErrorType from "./ErrorType";

export interface GithubUserRepository {
  repositories: GithubUserRepositoryItem[] | null;
  isLoading: boolean;
  error: ErrorType | null;
}

export interface GithubUserRepositoryItem {
  id: string;
  name: string | null;
  description: string | null;
  star: number | null;
}
