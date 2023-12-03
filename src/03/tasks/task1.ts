import { readFile } from 'fs/promises';
import {
  EngineLine,
  NumberInterval,
  findNumbersForEngineLine,
  getNumberIndicies,
  isNumber,
} from './utils';

const getIndiciesOfSymbols = (dataLine: string): number[] => {
  const symbolArray = Array.from(dataLine.matchAll(/[^\d.]/g));
  const indicies = symbolArray.map((symbol) => symbol.index).filter(isNumber);
  return indicies;
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/03/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const foundNumbers: NumberInterval[] = [];
  const engineLines: EngineLine[] = [];

  for (let i = 0; i < dataLines.length; i++) {
    const dataLine = dataLines[i];
    const symbolPositions = getIndiciesOfSymbols(dataLine);
    const numberIndicies = getNumberIndicies(dataLine);

    engineLines.push({
      numbers: numberIndicies,
      symbols: symbolPositions,
    });
  }

  const checkSurroundingNumbers = (x: number, y: number) => {
    if (x > 0) {
      const engineLine = engineLines[x - 1];
      foundNumbers.push(...findNumbersForEngineLine(engineLine, y));
    }
    if (x < engineLines.length - 1) {
      const engineLine = engineLines[x + 1];
      foundNumbers.push(...findNumbersForEngineLine(engineLine, y));
    }

    const engineLine = engineLines[x];
    foundNumbers.push(...findNumbersForEngineLine(engineLine, y));
  };

  engineLines.forEach((engineLine, idx) => {
    engineLine.symbols.forEach((symbolIndex) => {
      checkSurroundingNumbers(idx, symbolIndex);
    });
  });

  const result = foundNumbers.reduce((acc, fn) => acc + fn.numValue, 0);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
