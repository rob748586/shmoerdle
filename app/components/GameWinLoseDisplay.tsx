import { GameStatus } from "@/lib/enumerations";

// GameWinLoseDisplay component that renders the win/loss message and a reset button based on the game status.

export default function GameWinLoseDisplay(props: {
  status: GameStatus;
  word: string;
  meanings: string[];
  resetGame: () => void;
}) {
  const { status, word, resetGame } = props;
  const capitalizedWord = word[0].toUpperCase() + word.slice(1);
  return (
    <>
      {status === GameStatus.Won && (
        <div className="mt-4 text-green-500 text-xl font-bold text-center m-2">
          Congratulations! You&apos;ve guessed the word!
        </div>
      )}
      {status === GameStatus.Lost && (
        <div className="mt-4 text-red-500 text-xl font-bold text-center m-2">
          Sorry, you&apos;ve run out of guesses. The word was{" "}
          <strong>{capitalizedWord}</strong>.
        </div>
      )}
      {status !== GameStatus.Playing && (
        <>
          <div className="mt-4 text-gray-700 text-lg font-sm text-center border p-2 rounded bg-gray-100 mx-4">
            <strong>{capitalizedWord}</strong>:
            <div className="mt-2 text-gray-700 text-lg font-xs text-center mx-4">
              {props.meanings.map((meaning, index) => (
                <p key={index}>
                  {"- "}
                  {meaning}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-4 text-blue-500 text-xl font-bold text-center">
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </>
      )}
    </>
  );
}
