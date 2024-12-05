import { getGrid, validateCoords } from './utils';

export const getAnswer = () => {
  const grid = getGrid();
  const rows = grid.length;
  const cols = grid[0].length;

  let count = 0;

  const masSequences = [
    ['M', 'A', 'S'],
    ['S', 'A', 'M'],
  ];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const isCenter = grid[x][y] === 'A';

      if (!isCenter) {
        continue;
      }

      for (let seq1 of masSequences) {
        for (let seq2 of masSequences) {
          const [topLeftX, topLeftY] = [x - 1, y + 1];
          const [topRightX, topRightY] = [x + 1, y + 1];

          const [bottomLeftX, bottomLeftY] = [x - 1, y - 1];
          const [bottomRightX, bottomRightY] = [x + 1, y - 1];

          const isValid =
            validateCoords({ rows, cols, x: bottomLeftX, y: bottomLeftY }) &&
            validateCoords({ rows, cols, x: topRightX, y: topRightY }) &&
            validateCoords({ rows, cols, x: topLeftX, y: topLeftY }) &&
            validateCoords({ rows, cols, x: bottomRightX, y: bottomRightY });

          count += +(
            isValid &&
            grid[bottomLeftX][bottomLeftY] === seq1[0] &&
            grid[topRightX][topRightY] === seq1[2] &&
            grid[topLeftX][topLeftY] === seq2[0] &&
            grid[bottomRightX][bottomRightY] === seq2[2]
          );
        }
      }
    }
  }

  return count;
};
