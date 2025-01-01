import { getInput } from '../../utils/files';
import { EOL } from 'node:os';

export const getAnswer = () => {
  let grid = getInput(import.meta.url)
    .split(EOL)
    .map(line => line.split(''));
  const mapping = [...grid.map(line => [...line])].reduce(
    (acc, line, row) => {
      line.forEach((char, column) => {
        if (char !== '.') {
          acc[char] = [...(acc[char] || []), [row, column]];
        }
      });

      return acc;
    },
    {} as Record<string, number[][]>,
  );

  const antinodes = new Set<string>();

  for (const [char, positions] of Object.entries(mapping)) {
    if (positions.length === 1) {
      continue;
    }

    for (let i = 0; i < positions.length - 1; i++) {
      const [row1, column1] = positions[i];

      for (let j = i + 1; j < positions.length; j++) {
        const [row2, column2] = positions[j];

        const diffRow = Math.abs(row1 - row2);
        const diffColumn = Math.abs(column1 - column2);

        const antinode1 = [
          row1 - diffRow,
          column1 > column2 ? column1 + diffColumn : column1 - diffColumn,
        ];
        const antinode2 = [
          row2 + diffRow,
          column1 > column2 ? column2 - diffColumn : column2 + diffColumn,
        ];

        if (
          antinode1[0] >= 0 &&
          antinode1[0] < grid.length &&
          antinode1[1] >= 0 &&
          antinode1[1] < grid[0].length
        ) {
          grid[antinode1[0]][antinode1[1]] = '#';
          antinodes.add(antinode1.join(','));
        }

        if (
          antinode2[0] >= 0 &&
          antinode2[0] < grid.length &&
          antinode2[1] >= 0 &&
          antinode2[1] < grid[0].length
        ) {
          grid[antinode2[0]][antinode2[1]] = '#';
          antinodes.add(antinode2.join(','));
        }
      }
    }
  }

  return antinodes.size;
};
