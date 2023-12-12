import { readFile } from 'fs/promises';
import {
  calculateDistances,
  emptyRowsAndCols,
  generateGalaxy,
  generateStarPairs,
} from './utils';

const GapSize = 1;

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/11/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  let galaxy = generateGalaxy(dataLines);

  const [gapRows, gapCols] = emptyRowsAndCols(galaxy);

  const starPairs = generateStarPairs(galaxy);
  const distances = calculateDistances(starPairs, gapRows, gapCols, GapSize);

  const result = distances.reduce((acc, distance) => acc + distance, 0);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
