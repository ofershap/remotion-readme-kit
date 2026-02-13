type TypingResult = {
  visibleText: string;
  isComplete: boolean;
  cursorVisible: boolean;
};

export const getTypingState = (
  text: string,
  startFrame: number,
  currentFrame: number,
  framesPerChar: number = 2,
): TypingResult => {
  const elapsed = currentFrame - startFrame;

  if (elapsed < 0) {
    return { visibleText: "", isComplete: false, cursorVisible: false };
  }

  const charCount = Math.min(Math.floor(elapsed / framesPerChar), text.length);
  const isComplete = charCount >= text.length;
  const cursorVisible = Math.floor(elapsed / 15) % 2 === 0;

  return {
    visibleText: text.slice(0, charCount),
    isComplete,
    cursorVisible,
  };
};

export const getTypingDuration = (
  text: string,
  framesPerChar: number = 2,
): number => {
  return text.length * framesPerChar;
};
