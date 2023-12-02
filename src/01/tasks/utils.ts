const FilterRegExpMatchArray = (
  array: RegExpMatchArray | null
): array is RegExpMatchArray => {
  return array !== null;
};

export { FilterRegExpMatchArray };
