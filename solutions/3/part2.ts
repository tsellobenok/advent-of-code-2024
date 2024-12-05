import { getInput } from '../../utils/files';
import { extractNumbers } from './utils.ts';

export const getAnswer = () => {
  const lines =
    getInput(import.meta.url).match(
      /((do\(\))|(don't\(\))|(mul\(\d+,\d+\)))/g,
    ) || [];

  let include = true;
  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === 'do()') {
      include = true;
      continue;
    }

    if (lines[i] === "don't()") {
      include = false;
      continue;
    }

    if (include) {
      const [n1, n2] = extractNumbers(lines[i]);

      sum += n1 * n2;
    }
  }

  return sum;
};
