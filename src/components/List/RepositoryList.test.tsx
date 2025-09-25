import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RepositoryList from "./RepositoryList";

describe("RepositoryList", () => {
  const mockStore = configureStore([]);

  it("renders the loading state", () => {
    const store = mockStore({
      user: {
        users: [],
        selectedUser: null,
        isLoading: false,
        error: null,
        keyword: null,
      },
      repository: { repositories: null, isLoading: true, error: null },
    });
    render(
      <Provider store={store}>
        <RepositoryList />
      </Provider>
    );
    const hashLoader = document.querySelector("#react-spinners-HashLoader");
    expect(hashLoader).toBeInTheDocument();
  });

  it("renders the error state", () => {
    const error = { code: 500, message: "Internal Server Error" };
    const store = mockStore({
      user: {
        users: [],
        selectedUser: null,
        isLoading: false,
        error: null,
        keyword: null,
      },
      repository: { repositories: null, isLoading: false, error },
    });
    render(
      <Provider store={store}>
        <RepositoryList />
      </Provider>
    );
    const errorMessage = screen.getByText("Internal Server Error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the 'select user' message", () => {
    const store = mockStore({
      user: {
        users: null,
        selectedUser: null,
        isLoading: false,
        error: null,
        keyword: null,
      },
      repository: { repositories: null, isLoading: false, error: null },
    });
    render(
      <Provider store={store}>
        <RepositoryList />
      </Provider>
    );
    const message = screen.getByText(
      "Please select user to see the user Repository"
    );
    expect(message).toBeInTheDocument();
  });

  it("renders the 'empty repository' message", () => {
    const store = mockStore({
      user: {
        users: [{ id: 1, name: "test" }],
        selectedUser: { id: 1, name: "test" },
        isLoading: false,
        error: null,
        keyword: "test",
      },
      repository: { repositories: [], isLoading: false, error: null },
    });
    render(
      <Provider store={store}>
        <RepositoryList />
      </Provider>
    );
    const message = screen.getByText("Empty Repository");
    expect(message).toBeInTheDocument();
  });

  it("renders the list of repositories", () => {
    const repositories = [
      {
        id: "1",
        name: "repo1",
        description: "description1",
        star: 10,
      },
      {
        id: "2",
        name: "repo2",
        description: "description2",
        star: 20,
      },
    ];
    const store = mockStore({
      user: {
        users: [{ id: 1, name: "test" }],
        selectedUser: { id: 1, name: "test" },
        isLoading: false,
        error: null,
        keyword: "test",
      },
      repository: { repositories, isLoading: false, error: null },
    });
    render(
      <Provider store={store}>
        <RepositoryList />
      </Provider>
    );
    const repo1 = screen.getByText("repo1");
    const repo2 = screen.getByText("repo2");
    expect(repo1).toBeInTheDocument();
    expect(repo2).toBeInTheDocument();
  });
});
