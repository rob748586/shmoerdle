"use client";
import { LetterStatus } from "@/lib/enumerations";

function foundAllInWord(guess: string, word: string, letter: string): boolean {
  let total_guess = 0;
  let total_word = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      total_word++;
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (word[i] == guess[i] && guess[i] === letter) {
      total_guess++;
    }
  }
  return total_guess == total_word;
}

export function checkGuess(guess: string, word: string): LetterStatus[] {
  guess = guess.toLowerCase();
  word = word.toLowerCase();
  const statusArray: LetterStatus[] = [];

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === word[i]) {
      if (!foundAllInWord(guess, word, guess[i]))
        statusArray.push(LetterStatus.FoundSome);
      else statusArray.push(LetterStatus.FoundAll);
    } else if (word.includes(guess[i])) {
      statusArray.push(LetterStatus.Present);
    } else {
      statusArray.push(LetterStatus.Absent);
    }
  }

  return statusArray;
}
