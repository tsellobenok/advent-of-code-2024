import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { extractData } from './utils';

export const getAnswer = () =>
  getInput(import.meta.url)
    .split(EOL + EOL)
    .reduce((acc, block) => {
      const { ax, ay, bx, by, x, y } = extractData(block);
      const a = (by * x - bx * y) / (by * ax - bx * ay);
      const b = (x - a * ax) / bx;

      if (Math.round(a) === a && Math.round(b) === b) {
        return acc + a * 3 + b;
      }

      return acc;
    }, 0);

