"use client";
import { LetterStatus } from "@/lib/enumerations";

export function checkGuess(guess: string, word: string): LetterStatus[] {
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
