import { sum } from "es-toolkit";
import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

type Operator = "*" | "+";
type Calculation = { numbers: number[]; operator: Operator };

const transpose = <T>(grid: T[][]): T[][] => {
  const width = grid[0]?.length ?? 0;
  return Array.from({ length: width }, (_, x) =>
    grid.map((row) => row[x] as T),
  );
};

const doCalc = (calc: Calculation): number =>
  calc.operator === "*"
    ? calc.numbers.reduce((a, b) => a * b, 1)
    : sum(calc.numbers);

const parseCalculation = (row: string[]): Calculation => ({
  numbers: row.slice(0, -1).map((x) => parseInt(x, 10)),
  operator: row.at(-1) as Operator,
});

const solve = (input: string) => {
  const data = lines(input).map((l) => l.split(/\s+/).filter(Boolean));
  const columns = transpose(data);
  return sum(columns.map(parseCalculation).map(doCalc));
};

console.log(solve(input));
