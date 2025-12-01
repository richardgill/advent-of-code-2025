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
    for (let i = 0; i < numTurns; i++) {
      const addition = direction === "R" ? 1 : -1;
      dialNumber += addition;
      if (dialNumber === 100) {
        dialNumber = 0;
      }
      if (dialNumber === -1) {
        dialNumber = 99;
      }
      if (dialNumber === 0) {
        zeroCount++;
      }
    }
  }
  return zeroCount;
};

console.log(solve(input));
