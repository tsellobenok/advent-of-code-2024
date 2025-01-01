import { getInput } from '../../utils/files';
import { EOL } from 'node:os';

export const getAnswer = () => {
  const input = getInput(import.meta.url);
  const [towelsStr, patternsStr] = input.split(EOL + EOL);
  const towels = towelsStr.split(', ');

  return patternsStr.split(EOL).reduce((acc, pattern) => {
    const includedTowels = towels.filter(towel => pattern.includes(towel));
    const match = pattern.match(new RegExp(`^(${includedTowels.join('|')})+$`));

    return acc + Number(!!match?.length);
  }, 0);
};
