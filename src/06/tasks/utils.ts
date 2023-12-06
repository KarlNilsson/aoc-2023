export type Race = {
  time: number;
  recordDistance: number;
};

export const solveRace = (race: Race) => {
  const bestPossibleTime = Math.floor(race.time / 2);

  let currentMin = 0;
  let currentMax = bestPossibleTime;
  while (currentMin <= currentMax) {
    const currentTime = Math.floor((currentMax + currentMin) / 2);
    const distance = Math.abs((race.time - currentTime) * currentTime);
    if (distance > race.recordDistance) {
      currentMax = currentTime - 1;
      // console.log(`winning time: ${currentTime}`);
    } else {
      currentMin = currentTime + 1;
    }
  }

  const result =
    2 * (bestPossibleTime - currentMin + 1) - ((race.time + 1) % 2);
  return result;
};
