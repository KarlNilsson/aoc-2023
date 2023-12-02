import { readFile } from "fs/promises";

const minNumDieForGame = (gameData: string): [number, number, number] => {
  let redMin = 0;
  let greenMin = 0;
  let blueMin = 0;

  const redData = gameData.matchAll(/(\d+) red/g);
  for (const redPoint of redData) {
    const redValue = parseInt(redPoint[1], 10);
    redMin = Math.max(redMin, redValue);
  }

  const greenData = gameData.matchAll(/(\d+) green/g);
  for (const greenPoint of greenData) {
    const greenValue = parseInt(greenPoint[1], 10);
    greenMin = Math.max(greenMin, greenValue);
  }

  const blueData = gameData.matchAll(/(\d+) blue/g);
  for (const bluePoint of blueData) {
    const blueValue = parseInt(bluePoint[1], 10);
    blueMin = Math.max(blueMin, blueValue);
  }

  return [redMin, greenMin, blueMin];
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/02/${inputFile}`, {
    encoding: "utf8",
  });

  const start = performance.now();
  const dataLines = data.split("\n");

  const minDiePerGame = dataLines.map(minNumDieForGame);
  const multipliedDieValues = minDiePerGame.map(
    ([red, green, blue]) => red * green * blue
  );
  const result = multipliedDieValues.reduce((val, acc) => val + acc, 0);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
