import { LetterStatus } from "@/lib/enumerations";
import LetterTile from "./LetterTile";
import BackSpace from "./BackSpace";
import Keyboard from "./Keyboard";

// InputControl component that renders the current guess input area and the on-screen keyboard for letter entry and deletion.

export default function InputControl(props: {
  guess: string;
  notFound: string[];
  onLetterEntered: (letter: string) => void;
  onDelete: () => void;
}) {
  const { guess, notFound, onLetterEntered, onDelete } = props;

  return (
    <>
      {" "}
      <div className="flex justify-center mt-6 mb-6 gap-2 bg-gray-50 border border-gray-800 dark:bg-gray-800 p-4 rounded-md">
        <LetterTile letter={guess[0] || ""} status={LetterStatus.Unused} />
        <LetterTile letter={guess[1] || ""} status={LetterStatus.Unused} />
        <LetterTile letter={guess[2] || ""} status={LetterStatus.Unused} />
        <LetterTile letter={guess[3] || ""} status={LetterStatus.Unused} />
        <LetterTile letter={guess[4] || ""} status={LetterStatus.Unused} />
        <BackSpace onClick={() => onDelete()} />
      </div>
      <Keyboard
        notFound={notFound}
        onLetterClick={(letter: string) => onLetterEntered(letter)}
      />
    </>
  );
}
