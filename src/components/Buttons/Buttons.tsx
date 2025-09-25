export function ButtonSubmit({
  title,
  onClick,
  isLoading,
}: {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isLoading === true}
      className="w-full p-3 bg-blue-500 text-white rounded-md text-base font-medium cursor-pointer transition-colors disabled:bg-gray-500 hover:bg-blue-600 active:bg-blue-700"
    >
      {isLoading === true ? "Loading" : title}
    </button>
  );
}
