import { readFile } from 'fs/promises';
import { generateCategories } from './utils';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/05/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const seedMatch = dataLines[0].match(/\d+/g) ?? [];
  const seedIds = seedMatch.map((seed) => parseInt(seed, 10));

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

  console.log('soil');
  console.log(soilIds.map((val, idx) => [val, idx]));
  console.log('fertilizer');
  console.log(fertilizerIds.map((val, idx) => [val, idx]));
  console.log('water');
  console.log(waterIds.map((val, idx) => [val, idx]));
  console.log('light');
  console.log(lightIds.map((val, idx) => [val, idx]));
  console.log('temperature');
  console.log(temperatureIds.map((val, idx) => [val, idx]));
  console.log('humidity');
  console.log(humidityIds.map((val, idx) => [val, idx]));
  console.log('location');
  console.log(locationIds.map((val, idx) => [val, idx]));

  const result = locationIds.reduce(
    (lowest, locationId) => (locationId < lowest ? locationId : lowest),
    locationIds[0]
  );

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
