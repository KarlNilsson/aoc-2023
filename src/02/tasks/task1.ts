import { readFile } from "fs/promises";

const GameData = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

const gameIsValid = (gameData: string) => {
  const redData = gameData.matchAll(/(\d+) red/g);
  for (const redPoint of redData) {
    const redValue = parseInt(redPoint[1], 10);
    if (redValue > GameData.red) {
      return false;
    }
  }

  const greenData = gameData.matchAll(/(\d+) green/g);
  for (const greenPoint of greenData) {
    const greenValue = parseInt(greenPoint[1], 10);
    if (greenValue > GameData.green) {
      return false;
    }
  }

  const blueData = gameData.matchAll(/(\d+) blue/g);
  for (const bluePoint of blueData) {
    const blueValue = parseInt(bluePoint[1], 10);
    if (blueValue > GameData.blue) {
      return false;
    }
  }

  return true;
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/02/${inputFile}`, {
    encoding: "utf8",
  });

  const start = performance.now();
  const dataLines = data.split("\n");

  const validGames = dataLines.filter(gameIsValid);

  const gameIds = validGames.map((game) => {
    const gameMatch = game.match(/\d+/);
    if (gameMatch == null) {
      throw new Error();
    }
    return parseInt(gameMatch[0], 10);
  });

  const result = gameIds.reduce((gameId, acc) => gameId + acc, 0);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
