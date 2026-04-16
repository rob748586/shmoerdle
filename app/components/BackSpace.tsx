export default function BackSpace(props: {
  disabled?: boolean;
  onClick: () => void;
}) {
  const { disabled, onClick } = props;
  const buttonClass = disabled
    ? "bg-gray-400 dark:bg-gray-900 text-white dark:text-gray-600 cursor-not-allowed"
    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 ";

  return (
    <button
      disabled={disabled}
      className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center border border-gray-400 rounded-md md:text-lg font-bold  dark:border-gray-600 ${buttonClass}`}
      onClick={() => onClick()}
    >
      ⌫
    </button>
  );
}
