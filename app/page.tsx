"use client";
import loadWordset from "@/lib/loadWordset";
import { useEffect, useState } from "react";
import LetterTile from "./components/LetterTile";
import { GameStatus, LetterStatus } from "@/lib/enumerations";
import Keyboard from "./components/Keyboard";

function checkGuess(guess: string, word: string): LetterStatus[] {
  guess = guess.toLowerCase();
  word = word.toLowerCase();
  const statusArray: LetterStatus[] = [];

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      statusArray.push(LetterStatus.Correct);
    } else if (word.includes(guess[i])) {
      statusArray.push(LetterStatus.Present);
    } else {
      statusArray.push(LetterStatus.Absent);
    }
  }

  return statusArray;
}

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
  const guessStatus = checkGuess(guess, word || "");
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-200 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-between dark:bg-black sm:items-start">
        <div className="flex flex-col items-center justify-center w-full flex-1 text-center ">
          <h1 className="text-6xl font-bold mb-3">Welcome to Shmoerdle!</h1>
          <p className="mt-3 text-2xl">
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
              <div className="flex justify-center mt-4 mb-4 gap-2">
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
              {gameStatus === GameStatus.Won && (
                <div className="mt-4 text-green-500 text-xl font-bold">
                  Congratulations! You've guessed the word!
                </div>
              )}
              {gameStatus === GameStatus.Lost && (
                <div className="mt-4 text-red-500 text-xl font-bold">
                  Sorry, you've run out of guesses. The word was{" "}
                  <strong>{word}</strong>.
                </div>
              )}
              {gameStatus !== GameStatus.Playing && (
                <div className="mt-4 text-blue-500 text-xl font-bold">
                  Please refresh to play again.
                </div>
              )}
            </div>
          )}
          <div className="bottom-0 absolute fixed">
            <p>Loaded {words.length} words from the wordset.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
