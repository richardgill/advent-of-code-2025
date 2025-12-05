import { gridToString, lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const calcAdjacentCounts = (grid: string[][]): number[][] => {
  const gridWidth = grid[0]?.length;
  if (!gridWidth) throw new Error("gridWidth undefined");
  const gridHeight = grid.length;
  return grid.map((row, y) => {
    return row.map((cell, x) => {
      if (cell !== "@") {
        return 99;
      }
      const adjacentIndexes = [
        { x: x - 1, y: y - 1 },
        { x: x, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x - 1, y: y },
        { x: x + 1, y: y },
        { x: x - 1, y: y + 1 },
        { x: x, y: y + 1 },
        { x: x + 1, y: y + 1 },
      ];
      const validAdjacentIndexes = adjacentIndexes.filter(({ x, y }) => {
        return x >= 0 && x < gridWidth && y >= 0 && y < gridHeight;
      });
      const adjacentValues = validAdjacentIndexes.map(
        ({ x, y }) => (grid[y] as string[])[x] as string,
      );
      return adjacentValues.filter((v) => v === "@").length;
    });
  });
};

const countRolls = (grid: string[][]): number => {
  return grid.flat().filter((cell) => cell === "@").length;
};

const solve = (input: string) => {
  const data = lines(input);
  const grid = data.map((d) => d.split(""));

  const originalRollCount = grid.flat().filter((x) => x === "@").length;
  let rollCount = Number.POSITIVE_INFINITY;

  while (countRolls(grid) < rollCount) {
    console.log(gridToString(grid));
    rollCount = countRolls(grid);
    const adjacentCounts = calcAdjacentCounts(grid);

    adjacentCounts.forEach((row, y) => {
      return row.forEach((count, x) => {
        if (count < 4 && grid[y]) {
          grid[y][x] = ".";
        }
      });
    });
  }
  return originalRollCount - countRolls(grid);
};

console.log(solve(input));
