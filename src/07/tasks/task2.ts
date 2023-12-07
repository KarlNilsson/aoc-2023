import { readFile } from 'fs/promises';
import { Hand, Score, ScoredHand, sortHand } from './utils';

const CardToNumber: { [key: string]: number } = {
  J: 0,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
};

const setScoreToHand = (hand: Hand): ScoredHand => {
  const map = hand.cards.reduce(
    (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    new Map()
  );

  const numJokers = map.get(0) ?? 0;
  map.delete(0);
  const values = Array.from(map.values());

  if (values.length === 1 || numJokers > 4) {
    return { ...hand, score: Score.FiveOfAKind };
  }

  if (values.length === 5) {
    return { ...hand, score: Score.HighCard };
  }

  if (values.length === 2) {
    if (values.find((value) => value === 1)) {
      return { ...hand, score: Score.FourOfAKind };
    }
    return { ...hand, score: Score.FullHouse };
  }

  if (values.length === 3) {
    if (values.find((value) => value === 3 - numJokers)) {
      return { ...hand, score: Score.ThreeOfAKind };
    }
    if (values.find((value) => value === 2)) {
      return { ...hand, score: Score.TwoPairs };
    }
  }

  return { ...hand, score: Score.OnePair };
};

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/07/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const hands: Hand[] = dataLines.map((dataLine) => {
    const [cardString, bet] = dataLine.split(' ');
    const cards = [...cardString].map((card) => CardToNumber[card]);
    return {
      cards,
      bet: parseInt(bet, 10),
    };
  });

  const scoredHands = hands.map(setScoreToHand);
  const sortedHands = scoredHands.sort(sortHand);
  const rankedHands = sortedHands.map((hand, idx) => ({
    ...hand,
    rank: idx + 1,
  }));

  let rankDiffs: ScoredHand[] = [rankedHands[0]];
  let foundIndex = 0;
  let currentScore = rankDiffs[0].score;
  while (foundIndex >= 0) {
    foundIndex = rankedHands.findIndex(
      (hand) => hand.score > currentScore && hand.cards.includes(0)
    );
    if (foundIndex > 0) {
      rankDiffs.push(rankedHands[foundIndex - 1]);
      rankDiffs.push(rankedHands[foundIndex]);
      currentScore = rankedHands[foundIndex].score;
    }
  }

  console.log(rankDiffs);

  console.log(rankedHands);
  const result = rankedHands.reduce(
    (acc, hand) => acc + hand.bet * hand.rank,
    0
  );

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
