import { chunk, range, sum } from "es-toolkit";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const isChunksSymmetrical = (nString: string, chunkSize: number) => {
  const chunks = chunk(nString.split(""), chunkSize).map((c) => c.join(""));
  return chunks.length > 1 && chunks.every((c) => c === chunks[0]);
};

const isSymmetrical = (nString: string): boolean => {
  return range(1, Math.ceil(nString.length / 2) + 1).some((chunkSize) => {
    return isChunksSymmetrical(nString, chunkSize);
  });
};

export const isInvalid = (n: number): boolean => {
  const nString = String(n);

  return isSymmetrical(nString);
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
