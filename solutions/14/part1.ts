import { EOL } from 'node:os';
import { getInput } from '../../utils/files';

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

  const grid = new Array(height)
    .fill('.')
    .map(() => new Array(width).fill('.'));

  for (let s = 0; s < 100; s++) {
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

      grid[robots[i].py][robots[i].px] =
        Number(grid[robots[i].py][robots[i].px]) - 1
          ? Number(grid[robots[i].py][robots[i].px]) - 1 + ''
          : '.';
      grid[newPy][newPx] =
        (grid[newPy][newPx] === '.' ? 0 : Number(grid[newPy][newPx])) + 1;

      robots[i].px = newPx;
      robots[i].py = newPy;
    }
  }

  const quadrants = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const middleY = Math.floor(height / 2);
      const middleX = Math.floor(width / 2);

      if (y < middleY && x < middleX) {
        quadrants.topLeft += Number(grid[y][x]) || 0;
      }

      if (y < middleY && x > middleX) {
        quadrants.topRight += Number(grid[y][x]) || 0;
      }

      if (y > middleY && x < middleX) {
        quadrants.bottomLeft += Number(grid[y][x]) || 0;
      }

      if (y > middleY && x > middleX) {
        quadrants.bottomRight += Number(grid[y][x]) || 0;
      }
    }
  }

  return (
    quadrants.topLeft *
    quadrants.topRight *
    quadrants.bottomLeft *
    quadrants.bottomRight
  );
};
