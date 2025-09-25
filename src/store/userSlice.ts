import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GithubUser, GithubUserItem } from "../types/GithubUser";
import type ErrorType from "../types/ErrorType";

const initialState: GithubUser = {
  users: null,
  selectedUser: null,
  keyword: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "Github User",
  initialState,
  reducers: {
    reset: () => initialState,
    getUser: (state) => {
      state.isLoading = true;
      state.error = null;
      state.users = null;
    },
    getUserSuccess: (state, action: PayloadAction<GithubUserItem[]>) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = null;
    },
    getUserFailed: (state, action: PayloadAction<ErrorType>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setKeyword: (state, action: PayloadAction<string | null>) => {
      state.keyword = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<GithubUserItem | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const {
  reset,
  getUser,
  getUserSuccess,
  getUserFailed,
  setKeyword,
  setSelectedUser,
} = userSlice.actions;

export default userSlice.reducer;
