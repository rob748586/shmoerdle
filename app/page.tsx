"use client";

import { GameStatus, LetterStatus } from "@/lib/enumerations";
import loadWordset from "@/lib/loadWordset";
import Image from "next/image";
import { useState, useEffect } from "react";
import Keyboard from "./components/Keyboard";
import LetterTile from "./components/LetterTile";
import { checkGuess } from "@/app/components/CheckGuess";
import StatusBar from "./components/StatusBar";

export default function Home() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [word, setWord] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState(GameStatus.Playing);

  function chooseRandomWord() {
    if (words.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    setWord(randomWord);
  }

  async function fetchWordset() {
    const wordset = await loadWordset();
    setWords(wordset);
  }

  useEffect(() => {
    if (words.length === 0) {
      fetchWordset();
    } else {
      if (!word) {
        chooseRandomWord();
      }
    }
  }, [words]);
  const guess = guesses[guesses.length - 1] || "";
  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-200 font-sans dark:bg-black ">
      <Image
        src="/shmoerdle.png"
        loading="eager"
        alt="Logo"
        width={200}
        height={200}
      />
      <p className="text-2xl mx-4 text-center text-gray-700 dark:text-gray-300">
        A wordle clone built with Next.js and Tailwind CSS.
      </p>
      {words.length > 0 && (
        <div className="mt-6 text-lg">
          {guesses.map((guess, index) => {
            if (index < guesses.length - 1) {
              const guessStatus = checkGuess(guess, word || "");
              return (
                <div key={index} className="flex justify-center mt-4 gap-2">
                  <div className="flex gap-2">
                    <LetterTile
                      letter={guess[0] || ""}
                      status={guessStatus[0]}
                    />
                    <LetterTile
                      letter={guess[1] || ""}
                      status={guessStatus[1]}
                    />
                    <LetterTile
                      letter={guess[2] || ""}
                      status={guessStatus[2]}
                    />
                    <LetterTile
                      letter={guess[3] || ""}
                      status={guessStatus[3]}
                    />
                    <LetterTile
                      letter={guess[4] || ""}
                      status={guessStatus[4]}
                    />
                  </div>
                </div>
              );
            }
          })}
          {gameStatus === GameStatus.Playing ? (
            <>
              {" "}
              <div className="flex justify-center mt-3 mb-3 gap-2">
                <LetterTile
                  letter={guess[0] || ""}
                  status={LetterStatus.Unused}
                />
                <LetterTile
                  letter={guess[1] || ""}
                  status={LetterStatus.Unused}
                />
                <LetterTile
                  letter={guess[2] || ""}
                  status={LetterStatus.Unused}
                />
                <LetterTile
                  letter={guess[3] || ""}
                  status={LetterStatus.Unused}
                />
                <LetterTile
                  letter={guess[4] || ""}
                  status={LetterStatus.Unused}
                />
              </div>
              <Keyboard
                onLetterClick={(letter) => {
                  if (gameStatus !== GameStatus.Playing) {
                    return;
                  }
                  // If the last guess is empty, start a new guess with the clicked letter.
                  const newGuess = (guesses[guesses.length - 1] || "") + letter;
                  // If the new guess is 5 letters or less, update the current guess.
                  if (newGuess.length <= 5) {
                    setGuesses([...guesses.slice(0, -1), newGuess]);
                  }
                  // If the new guess is exactly 5 letters, finalize the guess and start a new empty guess.
                  if (newGuess.length === 5) {
                    setGuesses([...guesses.slice(0, -1), newGuess, ""]);
                  }

                  if (guesses.length > 0 && newGuess === word) {
                    setGameStatus(GameStatus.Won);
                  }
                  if (
                    guesses.length >= 5 &&
                    newGuess !== word &&
                    newGuess.length === 5
                  ) {
                    setGameStatus(GameStatus.Lost);
                  }
                }}
              />
            </>
          ) : null}
          <StatusBar status={gameStatus} word={word || ""} />
        </div>
      )}
      <div className="bottom-0 absolute">
        <p>Loaded {words.length} words from the wordset.</p>
      </div>
    </div>
  );
}
