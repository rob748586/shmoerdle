import { GameStatus } from "@/lib/enumerations";

// GameWinLoseDisplay component that renders the win/loss message and a reset button based on the game status.

export default function GameWinLoseDisplay(props: {
  status: GameStatus;
  word: string;
  resetGame: () => void;
}) {
  const { status, word, resetGame } = props;
  return (
    <>
      {status === GameStatus.Won && (
        <div className="mt-4 text-green-500 text-xl font-bold text-center">
          Congratulations! You've guessed the word!
        </div>
      )}
      {status === GameStatus.Lost && (
        <div className="mt-4 text-red-500 text-xl font-bold text-center">
          Sorry, you've run out of guesses. The word was <strong>{word}</strong>
          .
        </div>
      )}
      {status !== GameStatus.Playing && (
        <div className="mt-4 text-blue-500 text-xl font-bold text-center">
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </>
  );
}
