import Image from "next/image";

// Header component that renders the logo and a brief description of the game.

export default function Header() {
  return (
    <>
      <Image
        className="height-auto"
        src="/shmoerdle.png"
        loading="eager"
        alt="Logo"
        width={200}
        height={200}
      />
      <p className="text-2xl mx-4 text-center text-gray-700 dark:text-gray-300">
        A wordle clone built with Next.js and Tailwind CSS.
      </p>
    </>
  );
}
