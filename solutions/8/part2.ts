import { getInput } from '../../utils/files';
import { EOL } from 'node:os';
import { isValidPoint } from './utils.ts';

export const getAnswer = () => {
  const grid = getInput(import.meta.url)
    .split(EOL)
    .map(line => line.split(''));
  let debugGrid = [...grid.map(line => [...line])];

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

      antinodes.add(row1 + ',' + column1);

      for (let j = i + 1; j < positions.length; j++) {
        const [row2, column2] = positions[j];

        antinodes.add(row2 + ',' + column2);

        const diffRow = Math.abs(row1 - row2);
        const diffColumn = Math.abs(column1 - column2);

        const antiNode1 = [
          row1 - diffRow,
          column1 >= column2 ? column1 + diffColumn : column1 - diffColumn,
        ];
        const antiNode2 = [
          row2 + diffRow,
          column1 >= column2 ? column2 - diffColumn : column2 + diffColumn,
        ];

        while (isValidPoint(grid, antiNode1[0], antiNode1[1])) {
          // TODO: Remove
          ['.', '#'].includes(grid[antiNode1[0]][antiNode1[1]]) && antinodes.add(antiNode1.join(','));
          debugGrid[antiNode1[0]][antiNode1[1]] = '#';

          antiNode1[0] = antiNode1[0] - diffRow
          antiNode1[1] = column1 >= column2 ? antiNode1[1] + diffColumn : antiNode1[1] - diffColumn;
        }

        while (isValidPoint(grid, antiNode2[0], antiNode2[1])) {
          // TODO: Remove
          debugGrid[antiNode2[0]][antiNode2[1]] = '#';
          ['.', '#'].includes(grid[antiNode2[0]][antiNode2[1]]) && antinodes.add(antiNode2.join(','));

          antiNode2[0] = antiNode2[0] + diffRow;
          antiNode2[1] = column1 >= column2 ? antiNode2[1] - diffColumn : antiNode2[1] + diffColumn;

        }
      }
    }
  }

  return antinodes.size;
};
