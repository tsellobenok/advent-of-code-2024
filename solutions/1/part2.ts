import { EOL } from 'node:os';
import { getInput } from '../../utils/files';

export const getAnswer = () => {
  const { left, presenceCount } = getInput(import.meta.url)
    .split(EOL)
    .reduce(
      (acc, line) => {
        const [leftValue, rightValue] = line.split('   ');

        acc.left.push(+leftValue);
        acc.presenceCount[rightValue] =
          (acc.presenceCount[rightValue] || 0) + 1;

        return acc;
      },
      { left: [], presenceCount: {} } as {
        left: number[];
        presenceCount: Record<string, number>;
      },
    );

  return left.reduce((acc, curr) => acc + curr * (presenceCount[curr] || 0), 0);
};
