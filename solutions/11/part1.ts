import { getInput } from '../../utils/files';

export const getAnswer = () => {
  const attempts = 25;
  const input = getInput(import.meta.url);

  let stones = input.split(' ');
  let attempt = 0;

  while (attempt < attempts) {
    let length=  stones.length;

    for (let i = 0; i < length; i++) {
      const currStr = stones[i];
      const currentNum = +currStr;

      if (currentNum === 0) {
        stones[i] = (currentNum + 1).toString();
        continue;
      }

      if (currStr.length > 1 && currStr.length % 2 === 0) {
        const arr = currStr.split('');
        stones[i] = arr.slice(0, Math.floor(arr.length / 2)).join('');
        stones.push(Number(arr.slice(Math.floor(arr.length / 2)).join('')).toString())
        continue;
      }

      stones[i] = (currentNum * 2024).toString();
    }

    attempt++;
  }

  return stones.length;
};
