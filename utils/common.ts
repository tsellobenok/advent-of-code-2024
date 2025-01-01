export const isValidPoint = (grid: string[][], row: number, column: number) =>
  row >= 0 && row < grid.length && column >= 0 && column < grid[0].length;

export const getItemPosition = (grid: string[][], item: string) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === item) {
        return { x, y };
      }
    }
  }

  return { x: 0, y: 0 };
};

export const DIRECTIONS: Record<string, [x: number, y: number]> = {
  v: [0, 1],
  '^': [0, -1],
  '<': [-1, 0],
  '>': [1, 0],
};

export const DIRECTION_ORDER = ['^', '>', 'v', '<'];

export const getNextDirection = (direction: string) => {
  const index = DIRECTION_ORDER.indexOf(direction);

  return DIRECTION_ORDER[(index + 1) % DIRECTION_ORDER.length];
};

export const getPreviousDirection = (direction: string) => {
  const index = DIRECTION_ORDER.indexOf(direction);
  const nextIndex = index === 0 ? DIRECTION_ORDER.length - 1 : index - 1;

  return DIRECTION_ORDER[nextIndex];
};
