import { range, sum } from "es-toolkit";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const isEvenLength = (nString: string) => {
  return nString.length % 2 === 0;
};

const isSymmetrical = (nString: string): boolean => {
  const midPoint = nString.length / 2;
  return nString.slice(0, midPoint) === nString.slice(midPoint, nString.length);
};

const isInvalid = (n: number): boolean => {
  const nString = String(n);

  return isEvenLength(nString) && isSymmetrical(nString);
};

const invalidIdsInRange = (start: number, end: number): number[] => {
  const r = range(start, end);
  return r.filter(isInvalid);
};

const solve = (input: string) => {
  const ranges = input.split(",").map((range) => {
    const split = range.split("-");
    return {
      start: parseInt(split[0] as string, 10),
      end: parseInt(split[1] as string, 10),
    };
  });

  const invalidIds = ranges.flatMap(({ start, end }) =>
    invalidIdsInRange(start, end + 1),
  );
  return sum(invalidIds);
};

console.log(solve(input));
