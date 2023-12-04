import { FilterRegExpMatchArray } from '@/01/tasks/utils';

export const getWinningNumbersAndBingoNumbers = (dataLines: string[]) => {
  const splitLines = dataLines.map((dataLine) => dataLine.split('|'));

  const winningNumberArrays = splitLines
    .map((splitLine) => splitLine[0].split(':')[1].match(/\d+/g))
    .filter(FilterRegExpMatchArray)
    .map((numArray) => numArray.map((num) => parseInt(num, 10)));

  const bingoNumberArrays = splitLines
    .map((splitLine) => splitLine[1].match(/\d+/g))
    .filter(FilterRegExpMatchArray)
    .map((numArray) => numArray.map((num) => parseInt(num, 10)));
  return { winningNumberArrays, bingoNumberArrays };
}