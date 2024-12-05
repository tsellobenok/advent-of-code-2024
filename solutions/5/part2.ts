import { getInput } from '../../utils/files';
import { checkIsValidUpdate, getRulesAndUpdates } from './utils';

export const getAnswer = () => {
  const { updates, rulesMap } = getRulesAndUpdates(getInput(import.meta.url));

  return updates
    .filter(update => !checkIsValidUpdate(update, rulesMap))
    .reduce((acc, update) => {
      const fixed = update
        .split(',')
        .toSorted((a, b) => (rulesMap[a]?.includes(b) ? -1 : 1));

      return acc + +fixed[Math.floor(fixed.length / 2)];
    }, 0);
};
