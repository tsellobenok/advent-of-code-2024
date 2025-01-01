import { getInput } from '../../utils/files';
import { EOL } from 'node:os';

function generateCombinations(symbols, length) {
  const result = [];

  function backtrack(current) {
    if (current.length === length) {
      result.push(current.join(''));
      return;
    }

    for (const symbol of symbols) {
      current.push(symbol);
      backtrack(current);
      current.pop();
    }
  }

  backtrack([]);
  return result;
}

export const getAnswer = () =>
  getInput(import.meta.url)
    .split(EOL)
    .map(line => line.split(': '))
    .reduce((acc, [testResult, equation]) => {
      const shouldEqual = +testResult;
      const numbers = equation.split(' ').map(Number);
      const possibleOperators = generateCombinations(
        ['+', '*', '|'],
        numbers.length,
      );

      const possiblesResults = possibleOperators
        .map((eq: string) =>
          numbers.reduce(
            (acc, number, numberIndex) => {
              const operator = eq.charAt(numberIndex - 1);

              if (operator === '+') {
                acc.sum += number;
              } else if (operator === '|') {
                acc.sum = Number(acc.sum.toString() + number);
              } else if (operator === '*') {
                acc.sum *= number;
              } else {
                acc.sum = acc.sum + number;
              }

              acc.operator = operator;

              return acc;
            },
            { sum: 0, operator: '' },
          ),
        )
        .map(acc => acc.sum)
        .filter(sum => sum === shouldEqual);

      return acc + shouldEqual * (possiblesResults.length > 0 ? 1 : 0);
    }, 0);
