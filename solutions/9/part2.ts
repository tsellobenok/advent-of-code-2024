import { getInput } from '../../utils/files';

const getMap = () => {
  const input = getInput(import.meta.url);

  let map = [];
  let index = 0;

  for (let i = 0; i < input.length; i += 2) {
    map.push(...Array(+input[i]).fill(index.toString()));
    map.push(...'.'.repeat(+input[i + 1] || 0));
    index++;
  }

  return map;
};

export const getLastBlock = (map: string[], endAt: number) => {
  let blockStart = endAt;
  let blockEnd = endAt;

  while (map[blockEnd] === '.' && blockEnd >= 0) {
    blockStart--;
    blockEnd--;
  }

  while (
    map[blockStart] !== '.' &&
    map[blockStart] === map[blockEnd] &&
    blockStart >= 0
  ) {
    blockStart--;
  }

  blockStart++;

  return { blockStart, blockEnd, block: map.slice(blockStart, blockEnd + 1) };
};

export const getAnswer = () => {
  const map = getMap();

  let { block: lastBlock, blockStart: lastBlockStart } = getLastBlock(
    map,
    map.length - 1,
  );
  let currentBlock = lastBlock;
  let currentBlockStart = lastBlockStart;

  while (currentBlock.length) {
    const emptySpaceStart = map.findIndex((el, index) => {
      if (el !== '.' || index >= currentBlockStart) {
        return false;
      }

      let valid = true;

      for (let i = index; i < index + currentBlock.length; i++) {
        if (map[i] !== '.') {
          valid = false;
          break;
        }
      }

      return valid;
    });

    if (emptySpaceStart !== -1) {
      for (let i = 0; i < currentBlock.length; i++) {
        map[i + emptySpaceStart] = currentBlock[i];
        map[currentBlockStart + i] = '.';
      }
    }

    const { blockStart, block } = getLastBlock(map, currentBlockStart - 1);

    currentBlock = block;
    currentBlockStart = blockStart;
  }

  return map.reduce((acc, curr, index) => {
    const v = (+curr * index) || 0;

    return acc + v;
  }, 0);
};
