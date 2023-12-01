import { readFile } from 'fs/promises';
import { FilterRegExpMatchArray } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/01/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const digitsFromRegex = dataLines
    .map((line: string) => line.match(/\d/g))
    .filter(FilterRegExpMatchArray);

  const firstAndLastCombined = digitsFromRegex.map(
    (digits) => `${digits[0]}${digits[digits.length - 1]}`
  );

  const sumOfNumbers = firstAndLastCombined.reduce(
    (acc, curr) => acc + parseInt(curr, 10),
    0
  );

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return sumOfNumbers;
};

export default Task;
