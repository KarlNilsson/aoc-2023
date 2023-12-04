import { readFile } from 'fs/promises';
import { getWinningNumbersAndBingoNumbers } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/04/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const { winningNumberArrays, bingoNumberArrays } = getWinningNumbersAndBingoNumbers(dataLines);

  const numberOfCards = [...Array(winningNumberArrays.length)].map(() => 1);

  bingoNumberArrays.forEach((bna, idx) => {
    const winningNumbers = bna.filter((bn) =>
      winningNumberArrays[idx].includes(bn)
    );
    for (let i = idx; i < idx + winningNumbers.length; i++) {
      numberOfCards[i + 1] += numberOfCards[idx];
    }
  });

  const result = numberOfCards.reduce((acc, wna) => acc + wna, 0);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;

