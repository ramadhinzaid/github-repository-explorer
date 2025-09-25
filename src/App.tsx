import "./App.css";
import { ButtonSubmit } from "./components/Buttons/Buttons";
import RepositoryList from "./components/List/RepositoryList";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import {
  getUser,
  getUserFailed,
  getUserSuccess,
  reset,
  setKeyword,
} from "./store/userSlice";
import type ErrorType from "./types/ErrorType";
import { getGithubUser } from "./api/githubSearchApi";
import UserList from "./components/List/UserList";
import { X } from "lucide-react";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, keyword, users } = useSelector(
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

  return (
    <>
      <div className="w-full h-full grid grid-cols-12 gap-4">
        <div className="w-full col-span-12 md:col-span-6 lg:col-span-5 overflow-y-auto p-5">
          <form
            method="submit"
            onReset={() => dispatch(reset())}
            onSubmit={handleSearch}
          >
            <div className="flex items-center rounded-md bg-white/5 pl-3 mb-4 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
              <input
                id="keyword"
                type="text"
                className="block min-w-0 grow bg-white p-3 text-base placeholder-italic placeholder-gray-400 focus:outline-none"
                placeholder="Enter username"
              />
              <button type="reset">
                <X className="grid shrink-0 grid-cols-1 focus-within:relative mr-3" />
              </button>
            </div>
            <ButtonSubmit title="Search" isLoading={isLoading} />
          </form>
          {keyword != null &&
          keyword?.length >= 1 &&
          users != null &&
          users?.length >= 1 ? (
            <p className="mt-3 font-medium text-gray-700">
              Showing users for "{keyword}"
            </p>
          ) : (
            <></>
          )}

          <div className="mt-3">
            <UserList />
          </div>
        </div>
        <div className="hidden md:block col-span-6 lg:col-span-7 overflow-y-auto pe-3 py-3">
          <RepositoryList />
        </div>
      </div>
    </>
  );
}

export default App;
