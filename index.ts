import fs from 'node:fs';
import path from 'node:path';

import { measurePerformance } from './utils/performance';

const results = await Promise.all(
  fs
    .readdirSync(path.resolve('./solutions'))
    .sort((a, b) => +a - +b)
    .map(async solutionFolder => {
      const {
        0: { getAnswer: getPart1Answer },
        1: { getAnswer: getPart2Answer },
      } = await Promise.all([
        import(`./solutions/${solutionFolder}/part1`),
        import(`./solutions/${solutionFolder}/part2`),
      ]);

      return [
        {
          Day: `Day ${solutionFolder}: Part 1`,
          Answer: getPart1Answer(),
          Time: measurePerformance(getPart1Answer),
        },
        {
          Day: `Day ${solutionFolder}: Part 2`,
          Answer: getPart2Answer(),
          Time: measurePerformance(getPart2Answer),
        },
        {
          Day: '---------------',
          Answer: '---------------',
          Time: '---------------',
        }
      ];
    }),
);

console.table(results.flat());
