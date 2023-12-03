export type EngineLine = {
  numbers: NumberInterval[];
  symbols: number[];
};

export type NumberInterval = {
  numValue: number;
  start: number;
  end: number;
};

export const isNumber = (input?: number): input is number => {
  return input != null;
};

export const findNumbersForEngineLine = (engineLine: EngineLine, y: number) => {
  const getNumberAtIndex = (engineLine: EngineLine, idx: number) => {
    return engineLine.numbers.find(
      (number) => number.start <= idx && number.end > idx
    );
  };

  const localNumberIntervals: NumberInterval[] = [];
  for (let i = -1; i <= 1; i++) {
    const numberInterval = getNumberAtIndex(engineLine, y + i);
    if (
      numberInterval != null &&
      localNumberIntervals.find(
        (ni) => ni.numValue === numberInterval.numValue
      ) == null
    ) {
      localNumberIntervals.push(numberInterval);
    }
  }
  return localNumberIntervals;
};

export const getNumberIndicies = (dataLine: string): NumberInterval[] => {
  let positions: NumberInterval[] = [];
  const numbers = Array.from(dataLine.matchAll(/\d+/g));

  numbers.forEach((number) => {
    const numValue = number[0];
    const start = number.index;
    if (!isNumber(start)) {
      return;
    }
    const end = start + numValue.length;
    positions.push({
      numValue: parseInt(numValue, 10),
      start,
      end,
    });
  });
  return positions;
};
