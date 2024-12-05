import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { isSafe } from './utils';

export const getAnswer = () =>
  getInput(import.meta.url)
    .split(EOL)
    .reduce((acc, line) => {
      const levels = line.split(' ').map(val => +val);
      const safe = isSafe(levels);

      return (
        acc +
        +(
          safe ||
          levels.some((_, index) =>
            isSafe(levels.filter((_, i) => i !== index)),
          )
        )
      );
    }, 0);
