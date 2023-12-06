import { readFile } from 'fs/promises';
import { generateCategories } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/05/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const seedMatch = dataLines[0].match(/\d+/g) ?? [];
  const seedData = seedMatch.map((seed) => parseInt(seed, 10));

  const seedIds: number[] = [];
  for (let i = seedData[0]; i < seedData[0] + seedData[1]; i++) {
    seedIds.push(i);
  }
  for (let i = seedData[2]; i < seedData[2] + seedData[3]; i++) {
    seedIds.push(i);
  }

  const maps = generateCategories(dataLines);

  const mapIds = (ids: number[], from: string, to: string): number[] => {
    const categoryMap = maps.find((map) => map.from === from && map.to === to);
    if (categoryMap == null) {
      console.error('empty map!');
      return [];
    }
    return ids.map((id) => {
      for (const interval of categoryMap.intervals) {
        const { fromId, toId, range } = interval;
        if (id >= fromId && id < fromId + range) {
          return toId + (id - fromId);
        }
      }
      return id;
    });
  };

  const soilIds = mapIds(seedIds, 'seed', 'soil');
  const fertilizerIds = mapIds(soilIds, 'soil', 'fertilizer');
  const waterIds = mapIds(fertilizerIds, 'fertilizer', 'water');
  const lightIds = mapIds(waterIds, 'water', 'light');
  const temperatureIds = mapIds(lightIds, 'light', 'temperature');
  const humidityIds = mapIds(temperatureIds, 'temperature', 'humidity');
  const locationIds = mapIds(humidityIds, 'humidity', 'location');

  const result = locationIds.reduce(
    (lowest, locationId) => (locationId < lowest ? locationId : lowest),
    locationIds[0]
  );

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
