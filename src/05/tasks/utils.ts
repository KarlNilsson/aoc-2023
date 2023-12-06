import assert from 'assert';

export type Interval = {
  fromId: number;
  toId: number;
  range: number;
};

export type CategoryMap = {
  from: string;
  to: string;
  intervals: Interval[];
};

export const generateCategories = (dataLines: string[]): CategoryMap[] => {
  const categories: CategoryMap[] = [];
  let i = 0;
  while (i < dataLines.length) {
    let dataLine = dataLines[i];
    if (!dataLine.includes('map:')) {
      i++;
      continue;
    }
    const [, from, to] = Array.from(dataLine.match(/(\w+)-to-(\w+)/) ?? []);
    assert(!!from);
    assert(!!to);

    const category: CategoryMap = {
      from,
      to,
      intervals: [],
    };
    i++;

    while (dataLines[i]?.match(/\d+/g)) {
      const matches = Array.from(dataLines[i].match(/\d+/g) ?? []).map(
        (match) => parseInt(match, 10)
      );
      assert(matches.length >= 3);
      category.intervals.push({
        toId: matches[0],
        fromId: matches[1],
        range: matches[2],
      });
      i++;
    }

    categories.push(category);
  }
  return categories;
};
