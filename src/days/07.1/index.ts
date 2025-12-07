import { uniq } from "es-toolkit";
import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const solve = (input: string) => {
  const data = lines(input).map((line) => line.split(""));
  const firstLine = data[0];
  if (!firstLine) throw new Error("no first line");
  let beamIndexes = [firstLine.findIndex((c) => c === "S")];
  let splitCount = 0;
  for (const line of data.slice(1)) {
    beamIndexes = uniq(
      beamIndexes.flatMap((index) => {
        if (line[index] === ".") {
          return index;
        } else if (line[index] === "^") {
          splitCount++;
          return [index - 1, index + 1];
        }
        throw new Error("unknown char");
      }),
    );
  }
  return splitCount;
};

console.log(solve(input));
