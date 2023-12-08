import { FilterRegExpMatchArray } from '@/01/tasks/utils';

export type PathNodeMap = {
  [key: string]: PathNode;
};

export type PathNode = {
  left: string;
  right: string;
};

export type Movement = 'L' | 'R';

export const isMovement = (movement: string): movement is Movement => {
  return ['R', 'L'].includes(movement);
};

export const getMovementAndPathNodes = (dataLines: string[]) => {
  const movementDirections = [...dataLines[0]].filter(isMovement);

  const pathNodes: PathNodeMap = {};
  dataLines.slice(2).forEach((dataLine) => {
    const parts = dataLine.match(/([\dA-Za-z]+)/g);
    if (FilterRegExpMatchArray(parts)) {
      pathNodes[parts[0]] = {
        left: parts[1],
        right: parts[2],
      };
    }
  });

  return { movementDirections, pathNodes };
};
