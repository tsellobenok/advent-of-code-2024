export const measurePerformance = (fn: () => any) => {
  const results = [];

  for (let i = 0; i < 1000; i++) {
    performance.mark('start');
    fn();
    performance.mark('end');
    results.push(performance.measure('start', 'start', 'end').duration);
  }

  return `${(
    results.reduce((acc, duration) => acc + duration, 0) / results.length
  ).toFixed(2)}ms`;
};
