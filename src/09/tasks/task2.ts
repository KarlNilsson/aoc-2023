import { readFile } from 'fs/promises';
import { HistoryNumbers, extractHistoryNumbers } from './utils';

const findFirstInHistory = (history: HistoryNumbers): number => {
  const newHistory: number[] = [];
  for (let i = history.length - 1; i > 0; i--) {
    newHistory.push(history[i] - history[i - 1]);
  }
  if (newHistory.every((num) => num === 0)) {
    return history[0];
  }
  const reversedHistory = newHistory.reverse();
  const newVal = findFirstInHistory(reversedHistory);
  const result = history[0] - newVal;
  return result;
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/09/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const historyNumbers: HistoryNumbers[] = extractHistoryNumbers(dataLines);

  const firstInHistories = historyNumbers.map(findFirstInHistory);
  const result = firstInHistories.reduce((acc, fih) => acc + fih, 0);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
