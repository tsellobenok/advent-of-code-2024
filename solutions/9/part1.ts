import { getInput } from '../../utils/files';

const getMap = () => {
  const input = getInput(import.meta.url);

  let map = []
  let index = 0;

  for (let i = 0; i < input.length; i += 2) {
    map.push(...Array(+input[i]).fill(index.toString()));
    map.push(...'.'.repeat(+input[i + 1] || 0));
    index++;
  }

  return map;
};

export const getAnswer = () => {
  const map = getMap();

  while (map.includes('.')) {
    const el = map.pop() as string;

    if (el !== '.') {
      map[map.findIndex(x => x == '.')] = el;
    }
  }

  return map.reduce((acc, curr, index) => {
    const v = +curr * index;

    return acc + v;
  }, 0);
};
