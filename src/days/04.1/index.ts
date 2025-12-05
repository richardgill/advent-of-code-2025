import { gridToString, lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const calcAdjacentCounts = (grid: string[][]): number[][] => {
  const gridWidth = grid[0]?.length;
  if (!gridWidth) throw new Error("gridWidth undefined");
  const gridHeight = grid.length;
  return grid.map((row, y) => {
    return row.map((cell, x) => {
      if (cell !== "@") {
        return -1;
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

const solve = (input: string) => {
  const data = lines(input);
  const grid = data.map((d) => d.split(""));
  console.log(gridToString(grid));

  const adjacentCounts = calcAdjacentCounts(grid);

  return adjacentCounts.flat().filter((x) => x !== -1 && x < 4).length;
};

console.log(solve(input));
