import { getInput } from '../../utils/files.ts';
import { EOL } from 'node:os';

export const validateCoords = ({
  cols,
  rows,
  x,
  y,
}: {
  cols: number;
  rows: number;
  x: number;
  y: number;
}) => x >= 0 && x < rows && y >= 0 && y < cols;

export const getGrid = (): string[][] =>
  getInput(import.meta.url)
    .split(EOL)
    .map(line => line.split(''));
