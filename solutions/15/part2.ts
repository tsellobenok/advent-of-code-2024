import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { getRobotPosition } from './utils.ts';
import { DIRECTIONS } from './const.ts';

const convertMap = (grid: string[][]) => {
  const newGrid: string[][] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      newGrid[y] = newGrid[y] || [];

      if (grid[y][x] === 'O') {
        newGrid[y].push('[', ']');
        continue;
      }

      if (grid[y][x] === '@') {
        newGrid[y].push(grid[y][x], '.');
        continue;
      }

      newGrid[y].push(grid[y][x], grid[y][x]);
    }
  }

  return newGrid;
};

const canMoveVertically = (
  grid: string[][],
  startX: number,
  y: number,
  dx: number,
  dy: number,
  blocksCoordinates: { startX: number; y: number }[] = [],
): { canMove: boolean; blocksCoordinates: { startX: number; y: number }[] } => {
  blocksCoordinates.push({ startX, y });

  const newY = y + dy;

  if (grid[newY][startX] === '#' || grid[newY][startX + 1] === '#') {
    return { canMove: false, blocksCoordinates };
  }

  if (grid[newY][startX] === '[') {
    return canMoveVertically(grid, startX, newY, dx, dy, blocksCoordinates);
  }

  const isBlockAtVerticalLeft = grid[newY][startX] === ']';
  const isBlockAtVerticalRight = grid[newY][startX + 1] === '[';

  if (isBlockAtVerticalLeft || isBlockAtVerticalRight) {
    const left = isBlockAtVerticalLeft
      ? canMoveVertically(grid, startX - 1, newY, dx, dy, blocksCoordinates)
      : { canMove: true, blocksCoordinates };
    const right = isBlockAtVerticalRight
      ? canMoveVertically(grid, startX + 1, newY, dx, dy, blocksCoordinates)
      : { canMove: true, blocksCoordinates };

    return {
      canMove: left.canMove && right.canMove,
      blocksCoordinates,
    };
  }

  return {
    canMove: grid[newY][startX] === '.' && grid[newY][startX] === '.',
    blocksCoordinates,
  };
};

const canMoveHorizontally = (
  grid: string[][],
  startX: number,
  y: number,
  dx: number,
) => {
  let freeSpaceX = startX + dx;

  while (grid[y][freeSpaceX] !== '#') {
    if (grid[y][freeSpaceX] === '.') {
      return freeSpaceX;
    }

    freeSpaceX = freeSpaceX + dx;
  }

  return -1;
};

export const getAnswer = () => {
  const input = getInput(import.meta.url);
  const [gridStr, movementsStr] = input.split(EOL + EOL);

  const grid = gridStr.split(EOL).map(s => s.split(''));
  const movements = movementsStr
    .split('')
    .filter(i => Object.keys(DIRECTIONS).includes(i));
  const convertedGrid = convertMap(grid);
  const initPosition = getRobotPosition(convertedGrid);

  let currentPosition = { ...initPosition };

  for (let moveIndex = 0; moveIndex < movements.length; moveIndex++) {
    const move = movements[moveIndex];
    const { x, y } = DIRECTIONS[move];

    const newX = currentPosition.x + x;
    const newY = currentPosition.y + y;

    if (convertedGrid[newY][newX] === '.') {
      convertedGrid[currentPosition.y][currentPosition.x] = '.';
      currentPosition = { x: newX, y: newY };
      convertedGrid[newY][newX] = '@';
      continue;
    }

    if (convertedGrid[newY][newX] === '#') {
      continue;
    }

    if (move === '<' || move === '>') {
      let freeSpaceX = canMoveHorizontally(
        convertedGrid,
        currentPosition.x,
        currentPosition.y,
        x,
      );

      if (freeSpaceX !== -1) {
        let tempX = newX + x;

        convertedGrid[currentPosition.y][currentPosition.x] = '.';
        currentPosition = { x: newX, y: currentPosition.y };
        convertedGrid[currentPosition.y][newX] = '@';

        while (x > 0 ? tempX <= freeSpaceX : tempX >= freeSpaceX) {
          if (x > 0) {
            convertedGrid[currentPosition.y][tempX] =
              convertedGrid[currentPosition.y][tempX - x] === '[' ? ']' : '[';
          } else {
            convertedGrid[currentPosition.y][tempX] =
              convertedGrid[currentPosition.y][tempX - x] === ']' ? '[' : ']';
          }

          tempX += x;
        }

        continue;
      }

      continue;
    }

    if (
      convertedGrid[newY][newX] === '[' ||
      convertedGrid[newY][newX] === ']'
    ) {
      const { canMove, blocksCoordinates } = canMoveVertically(
        convertedGrid,
        convertedGrid[newY][newX] === '[' ? newX : newX - 1,
        newY,
        x,
        y,
      );

      if (canMove) {
        const blocks = blocksCoordinates.toReversed().sort((a, b) => b.y - a.y);

        blocks.forEach(block => {
          convertedGrid[block.y][block.startX] = '.';
          convertedGrid[block.y][block.startX + 1] = '.';
        });

        blocks.forEach(block => {
          convertedGrid[block.y + y][block.startX] = '[';
          convertedGrid[block.y + y][block.startX + 1] = ']';
        });

        convertedGrid[currentPosition.y][currentPosition.x] = '.';
        currentPosition = { x: newX, y: newY };
        convertedGrid[newY][newX] = '@';
      }
    }
  }

  let sum = 0;

  for (let y = 0; y < convertedGrid.length; y++) {
    for (let x = 0; x < convertedGrid[y].length; x++) {
      if (convertedGrid[y][x] === '[') {
        sum += 100 * y + x;
      }
    }
  }

  return sum;
};
