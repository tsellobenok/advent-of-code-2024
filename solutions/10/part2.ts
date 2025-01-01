import { getInput } from '../../utils/files';
import { EOL } from 'node:os';

const directions: Record<string, [x: number, y: number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

const isValidPoint = (grid: string[][], row: number, column: number) =>
  row >= 0 &&
  row < grid.length &&
  column >= 0 &&
  column < grid[0].length;


const findTrailScore = (grid: string[][], row: number, column: number): any => {
  const currentValue = +grid[row][column];

  if (currentValue === 9) {
    return 1;
  }

  return Object.values(directions)
    .map((dir) => {
      const [dx, dy] = dir;
      const newPosition = [row + dy, column + dx];

      if (!isValidPoint(grid, newPosition[0], newPosition[1])) {
        return 0;
      }

      const nextValue = +grid[newPosition[0]][newPosition[1]];
      const slope = nextValue - currentValue;

      if (slope === 1) {
        return findTrailScore(grid, newPosition[0], newPosition[1]);
      }

      return 0;
    }).reduce((acc, curr) => acc + curr, 0);
};

export const getAnswer = () => {
  const grid = getInput(import.meta.url)
    .split(EOL)
    .map(line => line.split(''));

  let sum = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '0') {
        sum += findTrailScore(grid, y, x);
      }
    }
  }

  return sum;
};
