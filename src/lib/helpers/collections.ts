export const insertAtIndex = <T>(
  array: T[],
  index: number,
  ...elements: T[]
): T[] => {
  array.splice(index, 0, ...elements);
  return array;
};

export const sortNumberString = (s1: string, s2: string) => {
  const diff = s1.length - s2.length;
  if (diff !== 0) return diff < 0 ? -1 : 1;
  if (s1 === s2) return 0;

  return s1 > s2 ? 1 : -1;
};
