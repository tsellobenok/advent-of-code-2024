export const getRobotPosition = (grid: string[][]) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '@') {
        return { x, y };
      }
    }
  }

  return { x: 0, y: 0 };
};
