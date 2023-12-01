import { readFile } from 'fs/promises';
import { FilterRegExpMatchArray } from './utils';

const stringToNumberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

type NumberKey = keyof typeof stringToNumberMap;

type DigitOrString = string | NumberKey;

const isNotDigit = (
  digitOrString: DigitOrString
): digitOrString is NumberKey => {
  return isNaN(parseInt(digitOrString, 10));
};

const mapMixedToNumbers = (array: string[]) =>
  array.map((digitOrString) => {
    if (isNotDigit(digitOrString)) {
      return stringToNumberMap[digitOrString];
    }
    return parseInt(digitOrString, 10);
  });

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/01/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const digitsFromRegex = dataLines.map((line: string) =>
    Array.from(
      line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
    )
      .filter(FilterRegExpMatchArray)
      .map((arr) => arr[1])
  );

  const mappedDigits = digitsFromRegex.map(mapMixedToNumbers);

  const firstAndLastCombined = mappedDigits.map(
    (digits) => `${digits[0]}${digits[digits.length - 1]}`
  );

  const sumOfNumbers = firstAndLastCombined.reduce(
    (acc, curr) => acc + parseInt(curr, 10),
    0
  );

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return sumOfNumbers;
};

export default Task;
