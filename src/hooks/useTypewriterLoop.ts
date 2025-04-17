import { useEffect, useState } from "react";

export function useTypewriterLoop(words: string[], speed = 100, pause = 1000) {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    let timeout: NodeJS.Timeout;

    if (deleting) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText === "") {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }, speed / 2);
    } else {
      if (displayedText !== currentWord) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => {
          setDeleting(true);
        }, pause);
      }
    }

    return () => clearTimeout(timeout);
  }, [words, index, displayedText, deleting, speed, pause]);

  return displayedText;
}
