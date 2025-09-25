import "./App.css";
import { ButtonSubmit } from "./components/Buttons";
import { ChevronDown, ChevronUp } from "lucide-react";
import RepositoryList from "./components/RepositoryList";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import {
  getUser,
  getUserFailed,
  getUserSuccess,
  reset,
  setKeyword,
  setSelectedUser,
} from "./store/userSlice";
import type ErrorType from "./types/ErrorType";
import { getGithubUser, getGithubUserRepository } from "./api/githubSearchApi";
import type { GithubUserItem } from "./types/GithubUser";
import {
  getRepository,
  getRepositoryFailed,
  getRepositorySuccess,
} from "./store/repositorySlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, users, keyword, selectedUser } = useSelector(
    (state: RootState) => state.user
  );

  async function searchGithubUser(username: string) {
    dispatch(getUser());
    try {
      const users = await getGithubUser(username);
      dispatch(getUserSuccess(users));
    } catch (error) {
      dispatch(getUserFailed(error as ErrorType));
    }
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const formElements = target.elements as typeof target.elements & {
      keyword: { value: string };
    };
    const username = formElements.keyword.value;
    if (username.length != 0) {
      dispatch(setKeyword(username));
      searchGithubUser(username);
    } else if (username.length == 0) {
      dispatch(reset());
    }
  }

  async function searchGithubUserRepository(username: string) {
    dispatch(getRepository());
    try {
      const repositories = await getGithubUserRepository(username);
      dispatch(getRepositorySuccess(repositories));
    } catch (error) {
      dispatch(getRepositoryFailed(error as ErrorType));
    }
  }

  function handleSelectUser(user: GithubUserItem) {
    if (user.id != selectedUser?.id) {
      dispatch(setSelectedUser(user));
      searchGithubUserRepository(user.name ?? "");
    } else {
      dispatch(setSelectedUser(null));
    }
  }

  return (
    <>
      <div className="w-full h-full grid grid-cols-3 gap-4">
        <div className="w-full col-span-3 md:col-span-1 overflow-y-auto p-5">
          <div className="search-container">
            <form method="submit" onSubmit={handleSearch}>
              <input
                id="keyword"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md text-base mb-4 bg-white placeholder-italic placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter username"
              />
              <ButtonSubmit title="Search" isLoading={isLoading} />
            </form>
          </div>
          {keyword != null && keyword?.length >= 1 ? (
            <p className="mt-3 font-medium text-gray-700">
              Showing users for "{keyword}"
            </p>
          ) : (
            <></>
          )}

          <div className="mt-3">
            {users === null || users === undefined || users?.length <= 0 ? (
              <></>
            ) : (
              users.map((user) => {
                return (
                  <>
                    <div
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className="flex items-center justify-between bg-gray-200 p-3 my-2.5 rounded-md cursor-pointer"
                    >
                      <span className="font-medium text-gray-700">
                        {user.name}
                      </span>
                      {selectedUser?.id === user.id ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </div>

                    {selectedUser?.id === user.id ? (
                      <div className="ps-3 md:hidden">
                        <RepositoryList />
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })
            )}
          </div>
        </div>
        <div className="hidden md:block col-span-2 overflow-y-auto pe-3 py-3">
          <RepositoryList />
        </div>
      </div>
    </>
  );
}

export default App;
