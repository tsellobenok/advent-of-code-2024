import { getInput } from '../../utils/files';
import { extractNumbers } from './utils.ts';

export const getAnswer = () =>
  getInput(import.meta.url)
    .match(/mul\(\d+,\d+\)/g)
    ?.reduce((acc, match) => {
      const [n1, n2] = extractNumbers(match);

      return acc + n1 * +n2;
    }, 0);
