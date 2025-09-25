import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import Loading from "../Loading/Loading";
import { ErrorCard } from "../Cards/Cards";
import { ChevronDown, ChevronUp } from "lucide-react";
import RepositoryList from "./RepositoryList";
import type { GithubUserItem } from "../../types/GithubUser";
import {
  getRepository,
  getRepositoryFailed,
  getRepositorySuccess,
} from "../../store/repositorySlice";
import { getGithubUserRepository } from "../../api/githubSearchApi";
import type ErrorType from "../../types/ErrorType";
import { setSelectedUser } from "../../store/userSlice";

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, users, error, selectedUser } = useSelector(
    (state: RootState) => state.user
  );

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

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorCard error={error} />;
  }

  if (users === null || users === undefined || users?.length <= 0) {
    return <></>;
  }
  return users.map((user) => {
    return (
      <div key={user.id}>
        <div
          onClick={() => handleSelectUser(user)}
          className="flex items-center justify-between bg-gray-200 p-3 my-2.5 rounded-md cursor-pointer"
        >
          <span className="font-medium text-gray-700">{user.name}</span>
          {selectedUser?.id === user.id ? <ChevronUp /> : <ChevronDown />}
        </div>

        {selectedUser?.id === user.id ? (
          <div className="ps-3 md:hidden">
            <RepositoryList />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  });
}
