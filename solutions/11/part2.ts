import { getInput } from '../../utils/files';

export const getAnswer = () => {
  const input = getInput(import.meta.url).split(' ');

  let stones = new Map();

  input.forEach(stone => {
    stones.set(stone, 1);
  });

  let attempt = 0;

  while (attempt < 75) {
    let attemptData = new Map();

    const uniqueStones = Array.from(stones.keys());

    for (let stone of uniqueStones) {
      const stonesAmount = stones.get(stone);
      const num = +stone;

      if (num === 0) {
        attemptData.set('1', (attemptData.get('1') || 0) + stonesAmount);
        continue;
      }

      if (stone.length > 1 && stone.length % 2 === 0) {
        const first = stone.slice(0, Math.floor(stone.length / 2));
        const second = Number(
          stone.slice(Math.floor(stone.length / 2)),
        ).toString();

        attemptData.set(first,   (attemptData.get(first)   || 0) + stonesAmount);
        attemptData.set(second, (attemptData.get(second) || 0) + stonesAmount);

        continue;
      }

      const newVal = (num * 2024).toString();

      attemptData.set(newVal, (attemptData.get(newVal) || 0) + stonesAmount);
    }

    stones = attemptData;

    attempt++;
  }

  return Array.from(stones.values()).reduce((acc, curr) => acc + curr, 0);
};
