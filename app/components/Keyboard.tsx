import { LetterStatus } from "@/lib/enumerations";
import LetterButton from "./LetterButton";

// Keyboard component that renders a virtual keyboard with letter buttons.
// It takes an onLetterClick callback to handle letter clicks and a notFound array to
// disable buttons for letters that have been guessed but are not in the word.

export default function Keyboard(props: {
  onLetterClick: (letter: string) => void;
  notFound: string[];
  foundExact: string[];
  foundInWord: string[];
  foundSome: string[];
}) {
  const { onLetterClick, notFound, foundExact, foundInWord, foundSome } = props;
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const buttons = rows.map((row, rowIndex) => (
    <div key={rowIndex} className="flex justify-center gap-1">
      {row.split("").map((letter) => (
        <LetterButton
          key={letter}
          letter={letter}
          disabled={notFound.includes(letter)}
          status={
            foundExact.includes(letter)
              ? LetterStatus.FoundAll
              : foundInWord.includes(letter)
                ? LetterStatus.Present
                : foundInWord.includes(letter)
                  ? LetterStatus.FoundSome
                  : foundSome.includes(letter)
                    ? LetterStatus.FoundSome
                    : notFound.includes(letter)
                      ? LetterStatus.Absent
                      : undefined
          }
          onClick={onLetterClick}
        />
      ))}
    </div>
  ));
  return (
    <div className="flex flex-col gap-1 border border-gray-300 rounded-md p-1">
      {buttons}
    </div>
  );
}
