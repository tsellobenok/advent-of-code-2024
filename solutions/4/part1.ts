import { getGrid, validateCoords } from './utils';

export const getAnswer = () => {
  const grid = getGrid();
  const word = 'XMAS';

  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [0, 1], //   Right
    [1, 0], //   Down
    [0, -1], //  Left
    [-1, 0], //  Up
    [1, 1], //   Down-right
    [1, -1], //  Down-left
    [-1, 1], //  Up-right
    [-1, -1], // Up-left
  ];
  const wordLength = word.length;

  let count = 0;

  const bfs = (startX: number, startY: number) => {
    let found = 0;

    for (const [dx, dy] of directions) {
      let queue = [[startX, startY, 1]];

      while (queue.length > 0) {
        const [x, y, index] = queue.shift() || [];

        if (index === wordLength) {
          found++;
          break;
        }

        const nx = x + dx;
        const ny = y + dy;
        const isValid = validateCoords({
          cols,
          rows,
          x: nx,
          y: ny,
        });

        if (isValid && grid[nx][ny] === word[index]) {
          queue.push([nx, ny, index + 1]);
        } else {
          break;
        }
      }
    }

    return found;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === word[0]) {
        count += bfs(i, j);
      }
    }
  }

  return count;
};
