import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type ErrorType from "../types/ErrorType";
import type {
  GithubUserRepository,
  GithubUserRepositoryItem,
} from "../types/GithubUserRepository";

const initialState: GithubUserRepository = {
  repositories: null,
  isLoading: false,
  error: null,
};

const repositorySlice = createSlice({
  name: "Github User Repository",
  initialState,
  reducers: {
    getRepository: (state) => {
      state.isLoading = true;
      state.error = null;
      state.repositories = null;
    },
    getRepositorySuccess: (
      state,
      action: PayloadAction<GithubUserRepositoryItem[]>
    ) => {
      state.isLoading = false;
      state.repositories = action.payload;
      state.error = null;
    },
    getRepositoryFailed: (state, action: PayloadAction<ErrorType>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getRepository, getRepositorySuccess, getRepositoryFailed } =
  repositorySlice.actions;

export default repositorySlice.reducer;
