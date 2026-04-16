export default function LetterButton(props: {
  letter: string;
  onClick: (letter: string) => void;
}) {
  const { letter, onClick } = props;

  return (
    <button
      className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md text-lg font-bold text-gray-700 dark:text-gray-300 dark:border-gray-600"
      onClick={() => onClick(letter)}
    >
      {letter}
    </button>
  );
}
