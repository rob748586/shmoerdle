"use client";

// Main game page component that manages the game state and renders the game interface, including the header,
// guess history, input controls, and win/loss display.

import { GameStatus } from "@/lib/enumerations";
import { loadWordset, getMeanings } from "@/lib/WordServerActions";
import { useState, useEffect, useRef } from "react";
import GuessHistoryBoard from "./components/GuessHistoryBoard";
import InputControl from "./components/InputControl";
import Header from "./components/Header";
import GameWinLoseDisplay from "./components/GameWinLoseDisplay";

export default function Home() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [word, setWord] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState(GameStatus.Playing);
  const [notFound, setNotFound] = useState<string[]>([]);
  const [meanings, setMeanings] = useState<string[]>([]);

  // Refs to keep latest state for event handler
  const guessesRef = useRef(guesses);
  const gameStatusRef = useRef(gameStatus);
  const wordRef = useRef(word);
  const notFoundRef = useRef(notFound);
  useEffect(() => {
    notFoundRef.current = notFound;
  }, [notFound]);

  useEffect(() => {
    guessesRef.current = guesses;
  }, [guesses]);
  useEffect(() => {
    gameStatusRef.current = gameStatus;
  }, [gameStatus]);
  useEffect(() => {
    wordRef.current = word;
  }, [word]);

  useEffect(() => {
    // fetch the wordset from the server.
    async function fetchWordset() {
      const wordset = await loadWordset();
      setWords(wordset);
    }
    // choose a random word from the wordset and set it as the current word to guess.
    function chooseRandomWord() {
      if (words.length === 0) {
        return null;
      }
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      setWord(randomWord);
      getMeanings(randomWord).then((wordMeanings) => setMeanings(wordMeanings));
    }
    // If the wordset is not loaded, fetch it and choose a random word.
    if (words.length === 0) {
      fetchWordset().then(() => chooseRandomWord());
    } else {
      // If the wordset is already loaded and no word is currently set, choose a random word. (used when resetting the game)
      if (!word) {
        chooseRandomWord();
      }
    }
  }, [words, word]);

  function resetGame() {
    // resets the game state and chooses a new random word from the wordset.
    setGuesses([]);
    setNotFound([]);
    setGameStatus(GameStatus.Playing);
    setWord(null);
  }

  function DeleteLetter() {
    // Use ref to get the latest guesses
    const guesses = guessesRef.current;
    const lastGuess = guesses[guesses.length - 1] || "";
    if (lastGuess.length === 0) return;
    const newGuess = lastGuess.slice(0, -1);
    setGuesses([...guesses.slice(0, -1), newGuess]);
  }

  function LetterEntered(letter: string) {
    // Use refs to get latest state
    const guesses = guessesRef.current;
    const gameStatus = gameStatusRef.current;
    const word = wordRef.current;
    // safety check to prevent letter entry if the game is already won or lost.
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
      // Update notFound letters based on the new guess, disabling
      // letters on the keyboard that are not in the word.
      let temp = [...notFound];
      for (const letter of newGuess) {
        if (!word?.toUpperCase()?.includes(letter.toUpperCase())) {
          // If the letter is not in the word and not already in the notFound list, add it to the list.
          if (!temp.includes(letter.toUpperCase())) {
            temp = [...temp, letter.toUpperCase()];
          }
        }
      }
      // Update the notFound state with the new list of letters to disable on the keyboard.
      setNotFound([...temp]);

      // Finalize the current guess and start a new empty guess.
      setGuesses([...guesses.slice(0, -1), newGuess, ""]);
    }

    // Test win/loss conditions after the new guess is added to the guesses list.

    // If the player has made at least one guess and the last guess matches the word, set the game status to Won.
    if (guesses.length > 0 && newGuess.toUpperCase() === word?.toUpperCase()) {
      setGameStatus(GameStatus.Won);
    }
    if (
      // If the player has made 5 guesses and the last guess is not correct, set the game status to Lost.
      guesses.length >= 5 &&
      newGuess.toUpperCase() !== word?.toUpperCase() &&
      newGuess.length === 5
    ) {
      setGameStatus(GameStatus.Lost);
    }
  }

  useEffect(() => {
    const pressedKeys = new Set<string>();
    function handleKeyDown(event: KeyboardEvent) {
      let key = event.key;
      if (key.length === 1 && key >= "a" && key <= "z") {
        key = key.toUpperCase();
      }
      if (pressedKeys.has(key)) {
        return;
      }
      if (key.length === 1 && key >= "A" && key <= "Z") {
        if (notFoundRef.current.includes(key)) {
          return;
        }
        LetterEntered(key);
        pressedKeys.add(key);
      } else if (key === "Backspace") {
        DeleteLetter();
        pressedKeys.add(key);
      }
    }
    function handleKeyUp(event: KeyboardEvent) {
      let key = event.key;
      if (key.length === 1 && key >= "a" && key <= "z") {
        key = key.toUpperCase();
      }
      pressedKeys.delete(key);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // Only set up once

  const guess = guesses[guesses.length - 1] || "";
  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-200 font-sans dark:bg-black ">
      <Header />
      {words.length > 0 && (
        <div className="text-lg">
          {guesses.map((guess, index) => {
            if (index < guesses.length - 1) {
              return (
                <GuessHistoryBoard
                  guess={guess}
                  word={word || ""}
                  key={index}
                />
              );
            }
          })}
          {gameStatus === GameStatus.Playing ? (
            <InputControl
              guess={guess}
              notFound={notFound}
              onLetterEntered={(letter: string) => LetterEntered(letter)}
              onDelete={() => DeleteLetter()}
            />
          ) : (
            <GameWinLoseDisplay
              meanings={meanings}
              status={gameStatus}
              word={word || ""}
              resetGame={() => resetGame()}
            />
          )}
        </div>
      )}
      <div className="mt-4 text-gray-700 text-sm text-center">
        <p>Loaded {words.length} words from the wordset.</p>
      </div>
    </div>
  );
}
