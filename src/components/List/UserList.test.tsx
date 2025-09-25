import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserList from "./UserList";
import * as githubSearchApi from "../../api/githubSearchApi";

describe("UserList", () => {
  const mockStore = configureStore([]);
  vi.mock("../api/githubSearchApi");

  it("renders the loading state", () => {
    const store = mockStore({
      user: {
        users: null,
        selectedUser: null,
        isLoading: true,
        error: null,
        keyword: null,
      },
      repository: { repositories: null, isLoading: false, error: null },
    });
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );
    const hashLoader = document.querySelector("#react-spinners-HashLoader");
    expect(hashLoader).toBeInTheDocument();
  });

  it("renders the error state", () => {
    const error = { code: 500, message: "Internal Server Error" };
    const store = mockStore({
      user: {
        users: null,
        selectedUser: null,
        isLoading: false,
        error,
        keyword: null,
      },
      repository: { repositories: null, isLoading: false, error: null },
    });
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );
    const errorMessage = screen.getByText("Internal Server Error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders an empty list when no users are found", () => {
    const store = mockStore({
      user: {
        users: [],
        selectedUser: null,
        isLoading: false,
        error: null,
        keyword: null,
      },
      repository: { repositories: null, isLoading: false, error: null },
    });
    const { container } = render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders the list of users and handles user selection", async () => {
    const users = [
      { id: 1, name: "user1" },
      { id: 2, name: "user2" },
    ];
    const store = mockStore({
      user: {
        users,
        selectedUser: null,
        isLoading: false,
        error: null,
        keyword: "test",
      },
      repository: { repositories: [], isLoading: false, error: null },
    });

    const getGithubUserRepository = vi
      .spyOn(githubSearchApi, "getGithubUserRepository")
      .mockResolvedValue([]);

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    const user1 = screen.getByText("user1");
    const user2 = screen.getByText("user2");
    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();

    fireEvent.click(user1);

    expect(getGithubUserRepository).toHaveBeenCalledWith("user1");
  });
});
