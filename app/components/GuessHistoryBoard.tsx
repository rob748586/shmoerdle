import { checkGuess } from "@/lib/CheckGuess";
import LetterTile from "./LetterTile";

export default function GuessHistoryBoard(props: {
  guess: string;
  word: string;
}) {
  const { guess, word } = props;
  const guessStatus = checkGuess(guess, word || "");
  return (
    <div className="flex justify-center mt-4 gap-2">
      <div className="flex gap-2">
        <LetterTile letter={guess[0] || ""} status={guessStatus[0]} />
        <LetterTile letter={guess[1] || ""} status={guessStatus[1]} />
        <LetterTile letter={guess[2] || ""} status={guessStatus[2]} />
        <LetterTile letter={guess[3] || ""} status={guessStatus[3]} />
        <LetterTile letter={guess[4] || ""} status={guessStatus[4]} />
      </div>
    </div>
  );
}
