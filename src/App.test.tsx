import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import * as githubSearchApi from "./api/githubSearchApi";

describe("App Integration Test", () => {
  vi.mock("./api/githubSearchApi");

  it("should search for a user, select a user, and display their repositories", async () => {
    const users = [{ id: "1", name: "testuser" }];
    const repositories = [
      {
        id: "1",
        name: "repo1",
        description: "description1",
        star: 10,
      },
    ];

    const getGithubUser = vi
      .spyOn(githubSearchApi, "getGithubUser")
      .mockResolvedValue(users);
    const getGithubUserRepository = vi
      .spyOn(githubSearchApi, "getGithubUserRepository")
      .mockResolvedValue(repositories);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Enter username");
    const searchButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(searchInput, { target: { value: "testuser" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getGithubUser).toHaveBeenCalledWith("testuser");
    });

    await waitFor(() => {
      const user = screen.getByText("testuser");
      expect(user).toBeInTheDocument();
    });

    const user = screen.getByText("testuser");
    fireEvent.click(user);

    await waitFor(() => {
      expect(getGithubUserRepository).toHaveBeenCalledWith("testuser");
    });

    await waitFor(() => {
        const repo = screen.getAllByText("repo1");
        expect(repo.length).toBe(2);
    });
  });
});
