import { LetterStatus } from "@/lib/enumerations";

// LetterTile component that renders a single letter tile with a specific status
// (correct, present, absent, unused) based on the result of the guess evaluation.

export default function LetterTile(props: {
  letter: string;
  status: LetterStatus;
}) {
  const { letter, status } = props;

  const statusClasses = {
    [LetterStatus.FoundAll]:
      "bg-green-500 text-white border border-gray-400 rounded-md",
    [LetterStatus.FoundSome]:
      "bg-yellow-500 text-white border border-gray-400 rounded-md",
    [LetterStatus.Present]:
      "bg-yellow-500 text-white border border-gray-400 rounded-md",
    [LetterStatus.Absent]:
      "bg-gray-500 text-white border border-gray-400 rounded-md",
    [LetterStatus.Unused]:
      "bg-gray-200 text-gray-500 border border-gray-400 rounded-md",
  };

  const tileClass = statusClasses[status] || "bg-gray-200 text-gray-500";

  return (
    <div
      className={`relative w-12 h-12 flex items-center justify-center text-2xl font-bold ${tileClass}`}
    >
      {status === LetterStatus.FoundSome ? (
        <div className="absolute top-0 left-0 right-0 bg-green-500 opacity-50 h-[50%] z-5" />
      ) : null}
      <div className={`relative z-100`}>{letter}</div>
    </div>
  );
}
