import { readFile } from "fs/promises";

const GameData = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

const gameIsValid = (gameData: string) => {
  const diceRolls = gameData.matchAll(/(\d+) (red|green|blue)/g);
  for (const die of diceRolls) {
    const value = parseInt(die[1], 10);
    if (die[2] === "red" && value > GameData.red) {
      return false;
    }
    if (die[2] === "green" && value > GameData.green) {
      return false;
    }
    if (die[2] === "blue" && value > GameData.blue) {
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
    const gameId = game.match(/\d+/);
    if (gameId == null) {
      throw new Error();
    }
    return parseInt(gameId[0], 10);
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
