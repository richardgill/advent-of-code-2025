import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const parseLine = (line: string) => {
  return {
    direction: line.slice(0, 1),
    numTurns: parseInt(line.slice(1, line.length), 10),
  };
};

const solve = (input: string) => {
  const data = lines(input);
  let dialNumber = 50;
  let zeroCount = 0;
  for (const line of lines(input)) {
    const { direction, numTurns } = parseLine(line);
    const addition = direction === "R" ? numTurns : -1 * numTurns;
    dialNumber = (dialNumber + addition) % 100;

    if (dialNumber === 0) {
      zeroCount++;
    }
  }
  return zeroCount;
};

console.log(solve(input));
