import { compact, sum } from "es-toolkit";
import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const transpose = <T>(grid: T[][]): T[][] => {
  const width = grid[0]?.length ?? 0;
  return Array.from({ length: width }, (_, x) =>
    grid.map((row) => row[x] as T),
  );
};

type Operator = "*" | "+";
type Calculation = { numbers: number[]; operator: Operator };

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
  const data = lines(input).map((l) => l.split(""));

  const transposed = transpose(data);

  const calcBlocks: string[][][] = [[]];
  for (const row of transposed) {
    if (row.every((x) => x === " ")) {
      calcBlocks.push([]);
    } else {
      const array = calcBlocks[calcBlocks.length - 1];
      if (!array) throw new Error("array undefined");
      array.push(row.filter((x) => x !== " " && x !== undefined));
    }
  }

  const calculations: Calculation[] = calcBlocks.flatMap((calcBlock) => {
    const operator = calcBlock[0]?.pop() as Operator;
    return {
      operator,
      numbers: compact(
        calcBlock.map((b) => {
          if (b.length === 0) return undefined;
          return parseInt(b.join(""), 10);
        }),
      ),
    };
  });

  const calculated = calculations.map((c) => doCalc(c));
  return sum(calculated);
};

console.log(solve(input));
