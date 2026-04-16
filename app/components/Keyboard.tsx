import LetterButton from "./LetterButton";

export default function Keyboard(props: {
  onLetterClick: (letter: string) => void;
}) {
  const { onLetterClick } = props;
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  const buttons = rows.map((row, rowIndex) => (
    <div key={rowIndex} className="flex justify-center gap-1">
      {row.split("").map((letter) => (
        <LetterButton key={letter} letter={letter} onClick={onLetterClick} />
      ))}
    </div>
  ));
  return <div className="flex flex-col gap-1">{buttons}</div>;
}
