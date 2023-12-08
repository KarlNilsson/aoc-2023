import { readFile } from 'fs/promises';
import { Movement, PathNodeMap, getMovementAndPathNodes } from './utils';

const findZZZ = (movementDirections: Movement[], pathNodes: PathNodeMap) => {
  let steps = 0;
  let found = false;
  let nextNode = 'AAA';
  while (!found) {
    const currentStep = movementDirections[steps % movementDirections.length];
    const currentNode = pathNodes[nextNode];
    if (currentNode == null) {
      throw new Error('Unexepectedly null');
    }
    if (currentStep === 'L') {
      nextNode = currentNode.left;
    } else {
      nextNode = currentNode.right;
    }

    steps += 1;
    if (nextNode === 'ZZZ') {
      found = true;
    }
  }
  return steps;
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/08/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const { movementDirections, pathNodes } = getMovementAndPathNodes(dataLines);

  const result = findZZZ(movementDirections, pathNodes);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
