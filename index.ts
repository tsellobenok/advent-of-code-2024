import fs from 'node:fs';
import path from 'node:path';

import { measurePerformance } from './utils/performance';

const results = await Promise.all(
  fs
    .readdirSync(path.resolve('./solutions'))
    .sort((a, b) => +a - +b)
    .map(async solutionFolder => {
      const { 0: result1, 1: result2 } = await Promise.allSettled([
        import(`./solutions/${solutionFolder}/part1`),
        import(`./solutions/${solutionFolder}/part2`),
      ]);

      const getPart1Answer = result1.value?.getAnswer;
      const getPart2Answer = result2.value?.getAnswer;

      return [
        getPart1Answer && {
          Day: `Day ${solutionFolder}: Part 1`,
          Answer: getPart1Answer(),
          Time: measurePerformance(getPart1Answer),
        },
        getPart2Answer && {
          Day: `Day ${solutionFolder}: Part 2`,
          Answer: getPart2Answer(),
          Time: measurePerformance(getPart2Answer),
        },
        {
          Day: '---------------',
          Answer: '---------------',
          Time: '---------------',
        },
      ].filter(Boolean);
    }),
);

console.table(results.flat());
