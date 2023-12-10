import { readFile } from 'fs/promises';
import { HistoryNumbers, extractHistoryNumbers } from './utils';

const findLastInHistory = (history: HistoryNumbers): number => {
  const newHistory: number[] = [];
  for (let i = 0; i < history.length - 1; i++) {
    newHistory.push(history[i + 1] - history[i]);
  }
  if (newHistory.every((num) => num === 0)) {
    return history.slice(-1)[0];
  }
  return history.slice(-1)[0] + findLastInHistory(newHistory);
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/09/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const historyNumbers: HistoryNumbers[] = extractHistoryNumbers(dataLines);

  const lastInHistories = historyNumbers.map(findLastInHistory);
  const result = lastInHistories.reduce((acc, lih) => acc + lih, 0);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
