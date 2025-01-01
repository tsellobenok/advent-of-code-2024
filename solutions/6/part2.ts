import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { getGuard, getNextCoords, checkForLoop } from './utils';


// TODO: Fix, should be 1663
export const getAnswer = () => {
  const grid = getInput(import.meta.url)
    .split(EOL)
    .map(line => line.split(''));
  const { x, y, direction } = getGuard(grid);

  let currentRow = y;
  let currentColumn = x;
  let currentDirection = direction;

  let foundExit = false;
  let count = 0;
  let obstacles = new Set();

  while (!foundExit) {
    try {
      const {
        row: nextRow,
        column: nextColumn,
        direction: nextDirection,
      } = getNextCoords(currentRow, currentColumn, currentDirection, grid);

      const {
        loop,
        obstacleRow,
        obstacleColumn,
      } = checkForLoop({
        currentColumn,
        currentDirection,
        currentRow,
        grid,
      });

      if (loop) {
        !obstacles.has(`${obstacleRow},${obstacleColumn}`) && count++;
        obstacles.add(`${obstacleRow},${obstacleColumn}`);
      }

      currentRow = nextRow;
      currentColumn = nextColumn;
      currentDirection = nextDirection;
    } catch (err) {
      foundExit = true;
    }
  }

  return count;
};
