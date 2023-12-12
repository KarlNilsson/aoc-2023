import { cloneDeep } from 'lodash';
import { readFile } from 'fs/promises';
import { Configuration, parseData } from './utils';
import { combinations } from 'mathjs';

const numberArrayFits = (groupLength: number, numberArray: number[]) => {
  const numberLengthWithGaps =
    numberArray.reduce((acc, num) => acc + num, 0) + (numberArray.length - 1);
  return groupLength > numberLengthWithGaps;
};

const solveConfiguration = (configuration: Configuration) => {
  let numConfigurations = 0;
  const currentGroups = cloneDeep(configuration.sprigGroups).reverse();
  const { sprigs } = configuration;

  currentGroups.forEach((group) => {
    if (group.type === '.') {
      return;
    }
    const currentNumbers: number[] = [];
    while (numberArrayFits(group.length, currentNumbers) && sprigs.length > 0) {
      const currentNum = sprigs.pop();
      if (currentNum == null) {
        throw new Error('Unexpected null/undefined');
      }
      currentNumbers.push(currentNum);
    }
    console.log(`Group: ${group.raw}`);
    console.log(`Solved with: [${currentNumbers}]`);
    const numCombinations =
      currentNumbers.reduce((acc, num) => acc + num, 0) +
      (currentNumbers.length - 1);
    console.log(`Combinations: ${combinations(group.length, numCombinations)}`);
    console.log('------------');
  });

  return numConfigurations;
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/12/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const configurations = parseData(dataLines);
  // configurations.forEach((configuration, idx) => {
  //   console.log(`Configuration ${idx}:`);
  //   console.log('------------------');
  //   console.log(configuration.rawData);
  //   console.log(`Sprigs: ${configuration.sprigs.join(', ')}`);
  //   console.log('Groups: ');
  //   configuration.sprigGroups.forEach((group) => {
  //     console.log(group);
  //   });
  //   console.log('------------------');
  //   console.log('');
  //   console.log('------------------');
  // });

  const result = solveConfiguration(configurations[1]);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }
};

export default Task;
