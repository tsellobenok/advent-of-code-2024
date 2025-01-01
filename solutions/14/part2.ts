import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { isValidPoint } from '../../utils/common.ts';

const isTree = (grid: string[][]) => {
  const possibleTrunks = []

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== '.') {
        let looksLikeTrunk = true;

        for (let cy = 0; cy < 3; cy++) {
          if (!looksLikeTrunk) {
            break;
          }

          for (let cx = 0; cx < 3; cx++) {
            if (!isValidPoint(grid, y + cy, x + cx) || grid[y + cy][x + cx] === '.') {
              looksLikeTrunk = false;
              break;
            }
          }
        }

        looksLikeTrunk && possibleTrunks.push(x, y);
      }
    }
  }


  return possibleTrunks.length;
};

export const getAnswer = () => {
  const input = getInput(import.meta.url);
  const robots = input.split(EOL).map(s => {
    const numbers = s.match(/-?\d+/g)?.map(Number);

    if (!numbers) {
      throw new Error('Cannot extract numbers.');
    }

    const [px, py, vx, vy] = numbers;

    return { px, py, vx, vy };
  });

  const height = 103;
  const width = 101;

  let s = 0;

  const grid = new Array(height)
    .fill('.')
    .map(() => new Array(width).fill('.'));

  while (!isTree(grid)) {
    for (let i = 0; i < robots.length; i++) {
      const { px, py, vx, vy } = robots[i];

      let newPx = px + vx;
      let newPy = py + vy;

      if (newPx < 0) {
        newPx = width + newPx;
      }

      if (newPy < 0) {
        newPy = height + newPy;
      }

      if (newPx >= width) {
        newPx = newPx % width;
      }

      if (newPy >= height) {
        newPy = newPy % height;
      }

      grid[robots[i].py][robots[i].px] = '.';
      grid[newPy][newPx] = '+';

      robots[i].px = newPx;
      robots[i].py = newPy;
    }

    s++;
  }

  return s;
};

