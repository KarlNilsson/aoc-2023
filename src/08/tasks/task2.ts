import { readFile } from 'fs/promises';
import {
  Movement,
  PathNode,
  PathNodeMap,
  getMovementAndPathNodes,
} from './utils';

const getLoopLength = (
  pathNodes: PathNodeMap,
  initialValue: string,
  movementDirections: Movement[]
) => {
  let steps = 0;
  let nextPath = initialValue;
  do {
    const nextNode = pathNodes[nextPath];
    const currentStep = movementDirections[steps % movementDirections.length];
    nextPath = currentStep === 'L' ? nextNode.left : nextNode.right;
  } while (nextPath !== initialValue);
  return steps;
};

const findAllZ = (movementDirections: Movement[], pathNodes: PathNodeMap) => {
  let steps = 0;
  let found = false;
  let nextNodeSet = new Set(
    Object.keys(pathNodes).filter((key) => key[2] === 'A')
  );

  return getLoopLength(
    pathNodes,
    Array.from(nextNodeSet)[0],
    movementDirections
  );

  // const initialSet = Array.from(nextNodeSet).sort().toString();
  // while (!found) {
  //   if (
  //     steps > 0 &&
  //     steps % movementDirections.length === 0 &&
  //     Array.from(nextNodeSet).sort().toString() === initialSet
  //   ) {
  //     console.log('we went full loop, sory');
  //     break;
  //   }
  //   const currentStep = movementDirections[steps % movementDirections.length];
  //   const currentNodes = Array.from(nextNodeSet).map((key) => pathNodes[key]);
  //   nextNodeSet = new Set(
  //     currentNodes.map((node) => (currentStep === 'L' ? node.left : node.right))
  //   );

  //   steps += 1;
  //   if (Array.from(nextNodeSet).every((key) => key[2] === 'Z')) {
  //     found = true;
  //   }
  // }
  // return steps;
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/08/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const { movementDirections, pathNodes } = getMovementAndPathNodes(dataLines);

  const result = findAllZ(movementDirections, pathNodes);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
