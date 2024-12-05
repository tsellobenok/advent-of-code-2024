const MIN_DIFF = 1;
const MAX_DIFF = 3;

export const isSafe = (levels: number[]) => {
  let decreasing = true;
  let increasing = true;
  let diffIsSafe = true;

  for (let i = 1; i < levels.length; i++) {
    const diff = Math.abs(levels[i] - levels[i - 1]);

    diffIsSafe = diff >= MIN_DIFF && diff <= MAX_DIFF;
    increasing = increasing && levels[i] > levels[i - 1];
    decreasing = decreasing && levels[i] < levels[i - 1];

    if (!diffIsSafe || (!increasing && !decreasing)) {
      break;
    }
  }

  return diffIsSafe && (decreasing || increasing);
};
