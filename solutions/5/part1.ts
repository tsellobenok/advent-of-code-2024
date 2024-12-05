import { getInput } from '../../utils/files';
import { checkIsValidUpdate, getRulesAndUpdates } from './utils';

export const getAnswer = () => {
  const { updates, rulesMap } = getRulesAndUpdates(getInput(import.meta.url));

  return updates
    .filter(update => checkIsValidUpdate(update, rulesMap))
    .reduce(
      (acc, update) =>
        acc + +update.split(',')[Math.floor(update.split(',').length / 2)],
      0,
    );
};
