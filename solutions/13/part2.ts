import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { extractData } from './utils.ts';
import { A_PRICE, B_PRICE } from './const.ts';

const MULTIPLIER = 10000000000000;

export const getAnswer = () => {
  const input = getInput(import.meta.url);

  return input.split(EOL + EOL).reduce((acc, block) => {
    const { ax, ay, bx, by, x, y } = extractData(block);

    const a = (by * (MULTIPLIER + x) - bx * (MULTIPLIER + y)) / (by * ax - bx * ay);
    const b = ((MULTIPLIER + x) - a * ax) / bx;

    if (Math.round(a) === a && Math.round(b) === b) {
      return acc + a * A_PRICE + b * B_PRICE;
    }

    return acc;
  }, 0);
};
