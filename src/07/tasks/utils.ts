export enum Score {
  HighCard = 0,
  OnePair = 1,
  TwoPairs = 2,
  ThreeOfAKind = 3,
  FullHouse = 4,
  FourOfAKind = 5,
  FiveOfAKind = 6,
}

export type Hand = {
  cards: number[];
  bet: number;
};

export type ScoredHand = Hand & {
  score: Score;
};

export const sortHand = (handA: ScoredHand, handB: ScoredHand) => {
  if (handA.score > handB.score) {
    return 1;
  } else if (handA.score < handB.score) {
    return -1;
  }

  let cardIndex = 0;
  do {
    if (handA.cards[cardIndex] > handB.cards[cardIndex]) {
      return 1;
    } else if (handA.cards[cardIndex] < handB.cards[cardIndex]) {
      return -1;
    }
    cardIndex += 1;
  } while (cardIndex < handA.cards.length);
  return 0;
};
