import { FolderGit2, Star, UserSearch } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { ErrorCard, MessageCard } from "../Cards/Cards";
import Loading from "../Loading/Loading";

export default function RepositoryList() {
  const { users, selectedUser } = useSelector((state: RootState) => state.user);
  const { repositories, isLoading, error } = useSelector(
    (state: RootState) => state.repository
  );
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorCard error={error} />;
  }

  if (
    repositories === undefined ||
    repositories === null ||
    users === null ||
    users.length == 0 ||
    selectedUser == null ||
    repositories?.length <= 0
  ) {
    if (repositories != undefined && repositories?.length <= 0) {
      return <MessageCard message="Empty Repository" icon={FolderGit2} />;
    }

    return (
      <MessageCard
        message="Please select user to see the user Repository"
        icon={UserSearch}
      />
    );
  }
  return repositories!.map((repository) => {
    return (
      <div
        key={repository.id}
        className="bg-gray-300 rounded-md p-3 my-2 flex justify-between items-start"
      >
        <div>
          <h3 className="font-bold text-gray-800">{repository.name}</h3>
          <p className="text-sm text-gray-600">{repository.description}</p>
        </div>
        <div className="flex items-center space-x-1 text-gray-600">
          <span className="font-bold text-gray-800">{repository.star}</span>
          <Star size={16} fill="black" color="black" />
        </div>
      </div>
    );
  });
}
