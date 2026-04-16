"use server";
import fs from "fs";

// This function validates a word to ensure it is suitable for the wordset.
// It checks that the word is exactly 5 characters long and does not contain any invalid
// characters such as hyphens, spaces, or digits.
function validateWord(word: string) {
  if (word.length !== 5) {
    return false;
  }
  ["-", " ", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].forEach(
    (char) => {
      if (word.includes(char)) {
        return false;
      }
    },
  );
  return true;
}

export default async function loadWordset() {
  const filePath = process.cwd() + "/public/aacompletewordset.json";
  const wordset = fs.readFileSync(filePath, "utf-8");
  const definitions = JSON.parse(wordset);

  const filtered = Object.keys(definitions).filter((word) =>
    validateWord(word.toUpperCase()),
  );
  return filtered;
}
