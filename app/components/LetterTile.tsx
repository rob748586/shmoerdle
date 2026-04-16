import { LetterStatus } from "@/lib/enumerations";

export default function LetterTile(props: {
  letter: string;
  status: LetterStatus;
}) {
  const { letter, status } = props;

  const statusClasses = {
    [LetterStatus.Correct]: "bg-green-500 text-white",
    [LetterStatus.Present]: "bg-yellow-500 text-white",
    [LetterStatus.Absent]: "bg-gray-500 text-white",
    [LetterStatus.Unused]: "bg-gray-200 text-gray-500",
  };

  const tileClass = statusClasses[status] || "bg-gray-200 text-gray-500";

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center text-2xl font-bold ${tileClass}`}
    >
      {letter}
    </div>
  );
}
