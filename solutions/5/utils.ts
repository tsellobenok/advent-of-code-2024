import { EOL } from 'node:os';

export const getRulesAndUpdates = (input: string) => {
  const [rulesStr, updatesStr] = input.split(EOL + EOL);

  const rules = rulesStr.split(EOL);
  const updates = updatesStr.split(EOL);

  const rulesMap = rules.reduce(
    (acc, rule) => {
      const [n1, n2] = rule.split('|');

      acc[n1] = [...(acc[n1] || []), n2];

      return acc;
    },
    {} as Record<string, string[]>,
  );

  return { updates, rulesMap };
};

export const checkIsValidUpdate = (
  update: string,
  rulesMap: Record<string, string[]>,
) => {
  const numbers = update.split(',');

  let valid = true;

  for (let i = 1; i < numbers.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (rulesMap[numbers[i]]?.includes(numbers[j])) {
        valid = false;
        break;
      }
    }

    if (!valid) break;
  }

  return valid;
};
