import { FilterRegExpMatchArray } from '@/01/tasks/utils';

export type Configuration = {
  sprigGroups: SprigGroup[];
  sprigs: number[];
  rawData: string;
};

type AllowedChars = '.' | '#' | '?';

type DefinitiveChar = '.' | '#';

export type SprigGroup = {
  type: '.' | '#' | null;
  raw: string;
  length: number;
  isUncertain: boolean;
  solvedNumConfigurations: number;
};

const isDefinitive = (char: string): char is DefinitiveChar => {
  return ['.', '#'].includes(char);
};

const charIsAllowed = (char: string): char is AllowedChars => {
  return ['.', '#', '?'].includes(char);
};

export const parseData = (dataLines: string[]) => {
  const configurations = dataLines.map((dataLine): Configuration => {
    const [groupStr, sprigStr] = dataLine.split(' ');
    const sprigs = sprigStr.match(/\d+/g);
    if (!FilterRegExpMatchArray(sprigs)) {
      throw new Error('Unexepected input');
    }
    const sprigNumbers = sprigs.map((sprig) => parseInt(sprig, 10));

    const sprigGroupsRaw = groupStr.match(/(\.+|(\?*#*)+)/g);
    if (!FilterRegExpMatchArray(sprigGroupsRaw)) {
      throw new Error('Unexpected input');
    }

    const sprigGroups: SprigGroup[] = [];
    sprigGroupsRaw.forEach((group) => {
      if (group.length === 0) {
        return;
      }
      const chars = [...group];
      if (chars.every((char) => char === '.')) {
        sprigGroups.push({
          type: '.',
          length: chars.length,
          raw: group,
          isUncertain: false,
          solvedNumConfigurations: 0,
        });
      } else if (chars.some((char) => char === '?')) {
        sprigGroups.push({
          type: '#',
          length: chars.length,
          raw: group,
          isUncertain: true,
          solvedNumConfigurations: 0,
        });
      } else if (chars.every((char) => char === '#')) {
        sprigGroups.push({
          type: '#',
          length: chars.length,
          raw: group,
          isUncertain: false,
          solvedNumConfigurations: 0,
        });
      } else {
        throw new Error('Unexpected behaviour');
      }
    });

    return {
      rawData: groupStr,
      sprigGroups,
      sprigs: sprigNumbers,
    };
  });

  return configurations;
};
