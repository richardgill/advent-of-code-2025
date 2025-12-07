import { groupBy, sumBy } from "es-toolkit";
import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const solve = (input: string) => {
  const data = lines(input).map((line) => line.split(""));
  const firstLine = data[0];
  if (!firstLine) throw new Error("no first line");
  let beamIndexes = [
    { index: firstLine.findIndex((c) => c === "S"), beamCount: 1 },
  ];
  for (const line of data.slice(1)) {
    const allBeamIndexes = beamIndexes.flatMap(({ index, beamCount }) => {
      if (line[index] === ".") {
        return { index, beamCount };
      } else if (line[index] === "^") {
        return [
          { index: index - 1, beamCount },
          { index: index + 1, beamCount },
        ];
      }
      throw new Error("unknown char");
    });
    const grouped = Object.entries(
      groupBy(allBeamIndexes, (item) => item.index),
    );
    beamIndexes = grouped.map(([_drop, beams]) => ({
      index: beams[0]?.index ?? -1,
      beamCount: sumBy(beams, (b) => b.beamCount),
    }));
  }
  return sumBy(beamIndexes, ({ beamCount }) => beamCount);
};

console.log(solve(input));
