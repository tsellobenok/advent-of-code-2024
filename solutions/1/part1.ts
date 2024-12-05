import { EOL } from 'node:os';
import { getInput } from '../../utils/files';

export const getAnswer = () => {
  const { left, right } = getInput(import.meta.url)
    .split(EOL)
    .reduce(
      (acc, line) => {
        const [leftValue, rightValue] = line.split('   ');

        acc.left.push(+leftValue);
        acc.right.push(+rightValue);

        return acc;
      },
      { left: [], right: [] } as { left: number[]; right: number[] },
    );

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  return left.reduce(
    (acc, curr, index) => acc + Math.abs(curr - right[index]),
    0,
  );
};
