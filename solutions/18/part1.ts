import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { isValidPoint } from '../../utils/common.ts';

const directions: [x: number, y: number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export const getAnswer = () => {
  const input = getInput(import.meta.url);
  const blocks = input.split(EOL).map(s => s.split(',').map(Number));
  const dimension = 70;

  const grid = new Array(dimension + 1)
    .fill('.')
    .map(() => new Array(dimension + 1).fill('.'));

  for (let sec = 0; sec < 1024; sec++) {
    const [x, y] = blocks[sec];

    grid[y][x] = '#';
  }

  const bfs = (startX: number, startY: number, endX: number, endY: number) => {
    const queue: { x: number; y: number; steps: number }[] = [];
    const visited = new Set<string>();

    queue.push({ x: startX, y: startY, steps: 0 });
    visited.add(`${startX},${startY}`);

    while (queue.length > 0) {
      const { x, y, steps } = queue.shift()!;

      if (x === endX && y === endY) {
        return steps;
      }

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          isValidPoint(grid, newX, newY) &&
          grid[newY][newX] === '.' &&
          !visited.has(`${newX},${newY}`)
        ) {
          visited.add(`${newX},${newY}`);
          queue.push({ x: newX, y: newY, steps: steps + 1 });
        }
      }
    }

    return -1;
  };

  return bfs(0, 0, dimension, dimension);
};
