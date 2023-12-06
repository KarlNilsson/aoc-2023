import { readFile } from 'fs/promises';
import { Race, solveRace } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/06/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const times = dataLines[0].match(/(\d+\s+)/g) ?? [];
  const recordDistances = dataLines[1].match(/\d+/g) ?? [];

  const races: Race[] = times.map((time, idx) => ({
    time: parseInt(time.replace(/ /g, ''), 10),
    recordDistance: parseInt(recordDistances[idx].replace(/ /g, ''), 10),
  }));

  const numberOfTimes = races.map((race) => solveRace(race));

  const result = numberOfTimes.reduce((acc, num) => acc * num, 1);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
