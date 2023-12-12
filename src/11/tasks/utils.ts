type Cell = {
  coordinates: {
    row: number;
    col: number;
  };
  type: 'empty' | 'star';
};

export type Galaxy = Cell[][];

export type StarPair = { star1: Cell; star2: Cell };

export const generateGalaxy = (dataLines: string[]) => {
  return dataLines.map((dataLine, row) =>
    [...dataLine].map(
      (char, col): Cell => ({
        coordinates: { row, col },
        type: char === '.' ? 'empty' : 'star',
      })
    )
  );
};

export const emptyRowsAndCols = (galaxy: Galaxy) => {
  const emptyRows = galaxy.filter((row) =>
    row.every((cell) => cell.type === 'empty')
  );

  const gapRows = emptyRows.map((row) => row[0].coordinates.row);
  const gapCols: number[] = [];

  for (let i = 0; i < galaxy.length - 1; i++) {
    let currentCol: Cell[] = [];
    for (let j = 0; j < galaxy[i].length; j++) {
      currentCol.push(galaxy[j][i]);
    }
    if (currentCol.every((cell) => cell.type === 'empty')) {
      gapCols.push(currentCol[0].coordinates.col);
    }
  }
  return [gapRows, gapCols];
};

export const generateStarPairs = (galaxy: Galaxy) => {
  const stars = galaxy
    .flatMap((rows) => rows.filter((cell) => cell.type === 'star'))
    .map((star, idx) => ({ ...star, id: idx + 1 }));
  const cellPairs: StarPair[] = [];
  for (let i = 0; i < stars.length - 1; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      cellPairs.push({ star1: stars[i], star2: stars[j] });
    }
  }
  return cellPairs;
};

export const calculateDistances = (
  starPairs: StarPair[],
  gapRows: number[],
  gapCols: number[],
  gapSize: number
) => {
  return starPairs.map(({ star1, star2 }) => {
    const {
      coordinates: { row: row1, col: col1 },
    } = star1;
    const {
      coordinates: { row: row2, col: col2 },
    } = star2;

    const gapFilter = (value1: number, value2: number) => (gap: number) =>
      gap < Math.max(value1, value2) && gap > Math.min(value1, value2);

    const numRowGaps = gapRows.filter(gapFilter(row1, row2)).length;
    const numColGaps = gapCols.filter(gapFilter(col1, col2)).length;
    const rowDistance = row1 - row2;
    const colDistance = col1 - col2;
    return (
      Math.abs(rowDistance) +
      numRowGaps * gapSize +
      Math.abs(colDistance) +
      numColGaps * gapSize
    );
  });
};
