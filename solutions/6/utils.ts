import {
  DIRECTION_ORDER,
  DIRECTIONS,
  getNextDirection,
} from '../../utils/common.ts';

export const BLOCK = '#';
export const OBSTACLE = 'O';

export const DEBUG = {
  v: '|',
  '^': '|',
  '<': '–',
  '>': '–',
};

export const checkIfOutOfBounds = (
  row: number,
  column: number,
  grid: string[][],
) => row < 0 || row >= grid.length || column < 0 || column >= grid[0].length;

export const getNextCoords = (
  row,
  column,
  direction,
  grid,
  rotateOnly = false,
) => {
  const [x, y] = DIRECTIONS[direction];
  const nextRow = row + y;
  const nextColumn = column + x;

  if (checkIfOutOfBounds(nextRow, nextColumn, grid)) {
    throw new Error('Out of bounds');
  }

  if (
    grid[nextRow][nextColumn] === BLOCK ||
    grid[nextRow][nextColumn] === OBSTACLE
  ) {
    return getNextCoords(row, column, getNextDirection(direction), grid, true);
  }

  return {
    row: rotateOnly ? row : nextRow,
    column: rotateOnly ? column : nextColumn,
    direction,
  };
};

export const getGuard = (grid: string[][]) => {
  let x = -1;
  let y = -1;
  let direction = '';

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (DIRECTION_ORDER.includes(grid[row][column])) {
        y = row;
        x = column;
        direction = grid[row][column];
        break;
      }
    }

    if (x >= 0 && y >= 0) {
      break;
    }
  }

  return { x, y, direction };
};

export const checkForLoop = ({
  currentRow,
  currentColumn,
  currentDirection,
  grid,
}) => {
  try {
    let gridToDebug;

    const { row: obstacleRow, column: obstacleColumn } = getNextCoords(
      currentRow,
      currentColumn,
      currentDirection,
      grid,
    );

    // set obstacle on the next step
    const gridWithObstacle = grid.map((row, rowIndex) =>
      row.map((column, columnIndex) =>
        rowIndex === obstacleRow && columnIndex === obstacleColumn
          ? OBSTACLE
          : column,
      ),
    );

    gridToDebug = [...gridWithObstacle.map(row => [...row])];

    let loop = false;
    let foundExit = false;

    let currentRowNew = currentRow;
    let currentColumnNew = currentColumn;
    let currentDirectionNew = currentDirection;

    let visited: Record<string, number> = {};

    while (!loop && !foundExit) {
      try {
        const {
          row: nextRow,
          column: nextColumn,
          direction: nextDirection,
        } = getNextCoords(
          currentRowNew,
          currentColumnNew,
          currentDirectionNew,
          gridWithObstacle,
        );

        visited[nextRow + ',' + nextColumn] =
          (visited[nextRow + ',' + nextColumn] || 0) + 1;

        gridToDebug[currentRowNew][currentColumnNew] =
          nextDirection !== currentDirectionNew
            ? '+'
            : DEBUG[currentDirectionNew];
        gridToDebug[nextRow][nextColumn] = nextDirection;

        currentColumnNew = nextColumn;
        currentRowNew = nextRow;
        currentDirectionNew = nextDirection;

        if (visited[nextRow + ',' + nextColumn] > 10) {
          loop = true;
          break;
        }
      } catch (err) {
        foundExit = true;
      }
    }

    return { loop, obstacleRow, obstacleColumn };
  } catch (err) {
    console.error(err);

    return { loop: false };
  }
};
