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
    steps += 1;
  } while (nextPath[2] !== 'Z');
  return steps;
};

const findAllZ = (movementDirections: Movement[], pathNodes: PathNodeMap) => {
  let nextNodeSet = new Set(
    Object.keys(pathNodes).filter((key) => key[2] === 'A')
  );

  return Array.from(nextNodeSet).map((node, idx) => ({
    node,
    idx,
    length: getLoopLength(pathNodes, node, movementDirections),
  }));
};

function lowerCommonMultiplicle(a: number, b: number) {
  return (a / greatestCommonDivider(a, b)) * b;
}

function greatestCommonDivider(a: number, b: number): number {
  var t = 0;
  a < b && ((t = b), (b = a), (a = t));
  t = a % b;
  return t ? greatestCommonDivider(b, t) : b;
}

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/08/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const { movementDirections, pathNodes } = getMovementAndPathNodes(dataLines);

  const result = findAllZ(movementDirections, pathNodes);
  const lcmResult = result.reduce(
    (acc, curr) => lowerCommonMultiplicle(acc, curr.length),
    1
  );

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return lcmResult;
};

export default Task;
