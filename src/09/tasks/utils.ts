import { FilterRegExpMatchArray } from '@/01/tasks/utils';

export type HistoryNumbers = number[];

export const extractHistoryNumbers = (
  dataLines: string[]
): HistoryNumbers[] => {
  return dataLines.map((dataLine) => {
    const regExpMatchArray = dataLine.match(/-?\d+/g);
    if (!FilterRegExpMatchArray(regExpMatchArray)) {
      throw new Error('Unexpectedly null');
    }
    return regExpMatchArray.map((val) => parseInt(val, 10));
  });
};
