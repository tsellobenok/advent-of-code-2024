import { EOL } from 'node:os';
import { getInput } from '../../utils/files';
import { getItemPosition, isValidPoint } from '../../utils/common.ts';

import MinHeap from 'heap-js';

type Direction = '>' | '<' | '^' | 'v';

const DIRECTIONS: Record<Direction, [number, number]> = {
  '>': [1, 0],
  '<': [-1, 0],
  '^': [0, -1],
  v: [0, 1],
};

const ROTATE_LEFT: Record<Direction, Direction> = {
  '>': '^',
  '^': '<',
  '<': 'v',
  v: '>',
};

const ROTATE_RIGHT: Record<Direction, Direction> = {
  '>': 'v',
  v: '<',
  '<': '^',
  '^': '>',
};

export const getAnswer = () => {
  const input = getInput(import.meta.url);
  const grid = input.split(EOL).map(line => line.split(''));

  const startPosition = getItemPosition(grid, 'S');
  const endPosition = getItemPosition(grid, 'E');

  const dijkstra = () => {
    const visited = new Set<string>();
    const heap = new MinHeap<{
      x: number;
      y: number;
      score: number;
      steps: Set<string>;
      direction: Direction;
    }>((a, b) => a.score - b.score);

    heap.push({
      x: startPosition.x,
      y: startPosition.y,
      score: 0,
      direction: '>',
      steps: new Set(),
    });

    while (!heap.isEmpty()) {
      const { x, y, score, steps, direction } = heap.pop()!;

      if (x === endPosition.x && y === endPosition.y) {
        return score;
      }

      const state = `${x},${y},${direction}`;

      if (visited.has(state)) continue;

      visited.add(state);

      const [dx, dy] = DIRECTIONS[direction];
      const newX = x + dx;
      const newY = y + dy;

      if (isValidPoint(grid, newX, newY) && grid[newY][newX] !== '#') {
        heap.push({
          x: newX,
          y: newY,
          steps: new Set(...steps.values(), `${x},${y}`),
          score: score + 1,
          direction,
        });
      }

      const leftDirection = ROTATE_LEFT[direction];
      const rightDirection = ROTATE_RIGHT[direction];

      heap.push({ x, y, steps, score: score + 1000, direction: leftDirection });
      heap.push({
        x,
        y,
        steps,
        score: score + 1000,
        direction: rightDirection,
      });
    }

    return -1;
  };

  return dijkstra();
};
