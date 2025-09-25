import type ErrorType from "./ErrorType";

export interface GithubUser {
  users: GithubUserItem[] | null;
  selectedUser: GithubUserItem | null;
  keyword: string | null;
  isLoading: boolean;
  error: ErrorType | null;
}

export interface GithubUserItem {
  id: string;
  name: string | null;
}
