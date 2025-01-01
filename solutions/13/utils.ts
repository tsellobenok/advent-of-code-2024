import { EOL } from 'node:os';
import { MOVE_REGEXP, POSITION_REGEXP } from './const';

export const getXY = (move: string, regexp: RegExp) => {
  const match = move.match(regexp);

  if (!match) {
    throw new Error('Cannot extract X and Y coordinates.');
  }

  return { x: parseInt(match[1], 10), y: parseInt(match[2], 10) };
};

export const extractData = (block: string) => {
  const [buttonA, buttonB, prize] = block.split(EOL);
  const { x: ax, y: ay } = getXY(buttonA, MOVE_REGEXP);
  const { x: bx, y: by } = getXY(buttonB, MOVE_REGEXP);
  const { x, y } = getXY(prize, POSITION_REGEXP);

  return { ax, ay, bx, by, x, y };
};
