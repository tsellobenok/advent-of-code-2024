import { EOL } from 'node:os';
import { getInput } from '../../utils/files';

const countWaysToSegment = (array: string[], pattern: string) => {
  const memo = new Map();

  const helper = (s: string) => {
    if (s === '') return 1;

    if (memo.has(s)) return memo.get(s);

    let count = 0;

    for (const word of array) {
      if (s.startsWith(word)) {
        const remainder = s.slice(word.length);

        count += helper(remainder);
      }
    }

    memo.set(s, count);

    return count;
  };

  return helper(pattern);
};

export const getAnswer = () => {
  const input = getInput(import.meta.url);
  const [towelsStr, patternsStr] = input.split(EOL + EOL);
  const towels = towelsStr.split(', ');
  const patterns = patternsStr.split(EOL);

  return patterns.reduce(
    (acc, pattern) => acc + countWaysToSegment(towels, pattern),
    0,
  );
};
