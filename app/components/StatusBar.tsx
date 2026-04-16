import { GameStatus } from "@/lib/enumerations";

export default function StatusBar(props: { status: GameStatus; word: string }) {
  const { status, word } = props;
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
          Please refresh to play again.
        </div>
      )}
    </>
  );
}
