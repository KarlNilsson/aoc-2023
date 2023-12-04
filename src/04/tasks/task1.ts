import { readFile } from 'fs/promises';
import { getWinningNumbersAndBingoNumbers } from './utils';

// To prevent calculating powers every time, we can precalculate them
const twoFactors: { [key: number]: number } = {
  0: 0,
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
  6: 32,
  7: 64,
  8: 128,
  9: 256,
  10: 512,
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/04/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const { winningNumberArrays, bingoNumberArrays } = getWinningNumbersAndBingoNumbers(dataLines);

  const matchingNumbers = bingoNumberArrays.map(
    (bna, idx) =>
      bna.filter((bn) => winningNumberArrays[idx].includes(bn)).length
  );

  const result = matchingNumbers.reduce(
    (acc, matchingNumber) => acc + twoFactors[matchingNumber],
    0
  );

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
