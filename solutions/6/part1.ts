import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { getGuard, getNextCoords } from './utils';

export const getAnswer = () => {
  const grid = getInput(import.meta.url)
    .split(EOL)
    .map(line => line.split(''));
  const { x, y, direction } = getGuard(grid);

  let currentRow = y;
  let currentColumn = x;
  let currentDirection = direction;

  let foundExit = false;
  let count = 1;

  const visited = new Set();

  while (!foundExit) {
    try {
      const {
        row: nextRow,
        column: nextColumn,
        direction: nextDirection,
      } = getNextCoords(currentRow, currentColumn, currentDirection, grid);

      currentRow = nextRow;
      currentColumn = nextColumn;
      currentDirection = nextDirection;

      !visited.has(`${nextRow},${nextColumn}`) && count++;
      visited.add(`${nextRow},${nextColumn}`);
    } catch (err) {
      foundExit = true;
    }
  }

  return count;
};
