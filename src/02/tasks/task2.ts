import { readFile } from 'fs/promises';

const minNumDieForGame = (gameData: string): [number, number, number] => {
  let redMin = 0;
  let greenMin = 0;
  let blueMin = 0;

  const games = gameData.matchAll(/(\d+) (red|green|blue)/g);
  for (const game of games) {
    const value = parseInt(game[1], 10);
    if (game[2] === 'red') {
      redMin = Math.max(redMin, value);
    }
    if (game[2] === 'green') {
      greenMin = Math.max(greenMin, value);
    }
    if (game[2] === 'blue') {
      blueMin = Math.max(blueMin, value);
    }
  }

  return [redMin, greenMin, blueMin];
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/02/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const minDiePerGame = dataLines.map(minNumDieForGame);
  const result = minDiePerGame.reduce((acc, [r, g, b]) => acc + r * g * b, 0);

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
