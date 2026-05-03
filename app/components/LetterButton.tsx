// LetterButton component that renders a single letter button for the virtual keyboard.
// It takes a letter, a disabled state, and an onClick callback to handle button clicks.

import { LetterStatus } from "@/lib/enumerations";

export default function LetterButton(props: {
  letter: string;
  disabled?: boolean;
  status?: LetterStatus;
  onClick: (letter: string) => void;
}) {
  const { letter, disabled, status, onClick } = props;
  let buttonClass = disabled
    ? "bg-gray-400 dark:bg-gray-900 text-white dark:text-gray-600 cursor-not-allowed"
    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 ";

  if (status === LetterStatus.FoundAll) {
    buttonClass = "bg-green-500 text-white";
  } else if (status === LetterStatus.FoundSome) {
    buttonClass = "bg-yellow-500 text-white";
  } else if (status === LetterStatus.Present) {
    buttonClass = "bg-yellow-500 text-white";
  } else if (status === LetterStatus.Absent) {
    buttonClass = "bg-gray-400 text-white dark:bg-gray-900 dark:text-gray-600";
  }

  return (
    <button
      disabled={disabled}
      className={`relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center border border-gray-300 rounded-md md:text-lg font-bold  dark:border-gray-600 ${buttonClass}`}
      onClick={() => onClick(letter)}
    >
      {status === LetterStatus.FoundSome ? (
        <div className="w-[100%] h-[50%] top-0 left-0 absolute bg-green-500 z-5"></div>
      ) : null}
      <div className={`relative z-10`}>{letter}</div>
    </button>
  );
}
