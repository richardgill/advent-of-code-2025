import { sum } from "es-toolkit";
import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const transpose = (grid: string[][]) => {
  const height = grid.length;
  const width = grid[0]?.length ?? -1;

  console.log("zzz ", { height, width });
  const newGrid = Array.from({ length: width }, () => Array(height).fill(0));
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      newGrid[x][y] = grid[y][x];
    }
  }
  return newGrid;
};

type Calculation = { numbers: number[]; operator: "*" | "+" };

const doCalc = (calc: Calculation): number => {
  if (calc.operator === "*") {
    return calc.numbers.reduce((prev, current) => prev * current, 1);
  }
  if (calc.operator === "+") {
    return calc.numbers.reduce((prev, current) => prev + current, 0);
  }
  throw new Error(`unknown operator ${calc.operator}`);
};

const solve = (input: string) => {
  const data = lines(input).map((l) => l.split(/\s+/).filter((x) => x !== ""));
  console.log("zzz datao", data);
  const grid = transpose(data);
  console.log("zzz grid", grid);
  const calculations = grid.map(
    (row): Calculation => ({
      numbers: row.slice(0, row.length - 1).map((x) => parseInt(x, 10)),
      operator: row[row.length - 1],
    }),
  );
  const calculated = calculations.map((c) => doCalc(c));
  console.log("zzz calculations", calculated);
  return sum(calculated);
};

console.log(solve(input));
