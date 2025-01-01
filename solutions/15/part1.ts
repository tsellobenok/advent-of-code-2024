import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { getRobotPosition } from './utils.ts';
import { DIRECTIONS } from './const.ts';

export const getAnswer = () => {
  const input = getInput(import.meta.url);
  const [gridStr, movementsStr] = input.split(EOL + EOL);

  const grid = gridStr.split(EOL).map(s => s.split(''));
  const movements = movementsStr
    .split('')
    .filter(i => Object.keys(DIRECTIONS).includes(i));

  const initPosition = getRobotPosition(grid);

  let currentPosition = { ...initPosition };

  for (let moveIndex = 0; moveIndex < movements.length; moveIndex++) {
    const move = movements[moveIndex];

    const { x, y } = DIRECTIONS[move];

    const newX = currentPosition.x + x;
    const newY = currentPosition.y + y;

    if (grid[newY][newX] === '.') {
      grid[currentPosition.y][currentPosition.x] = '.';
      currentPosition = { x: newX, y: newY };
      grid[newY][newX] = '@';
      continue;
    }

    if (grid[newY][newX] === '#') {
      continue;
    }

    if (grid[newY][newX] === 'O') {
      let freeX = newX + x;
      let freeY = newY + y;

      while (grid[freeY][freeX] !== '.' && grid[freeY][freeX] !== '#') {
        freeX = freeX + x;
        freeY = freeY + y;
      }

      // try to move to the next position
      let hasFreeSpace = grid[freeY][freeX] === '.';

      if (hasFreeSpace) {
        grid[currentPosition.y][currentPosition.x] = '.';
        currentPosition = { x: newX, y: newY };
        grid[newY][newX] = '@';
        grid[freeY][freeX] = 'O';
      }
    }
  }

  let sum = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'O') {
        sum += 100 * y + x
      }
    }
  }

  return sum
};

