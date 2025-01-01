export const isValidPoint = (
  grid: string[][],
  row: number,
  column: number,
) =>
  row >= 0 &&
  row < grid.length &&
  column >= 0 &&
  column < grid[0].length;
