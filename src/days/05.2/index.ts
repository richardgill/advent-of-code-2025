import { compact, sum } from "es-toolkit";
import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

type Range = { start: number; end: number };

const parseFresh = (freshString: string): Range[] => {
  const freshIngredients = lines(freshString).map((line) => {
    const [start, end] = line.split("-");
    if (!start) throw new Error("start missing");
    if (!end) throw new Error("end missing");
    return { start: parseInt(start, 10), end: parseInt(end, 10) };
  });
  return freshIngredients;
};

export const isOverlapping = (r1: Range, r2: Range) => {
  return (
    (r1.start >= r2.start && r1.start <= r2.end) ||
    (r1.end >= r2.start && r1.end <= r2.end) ||
    (r1.start <= r2.start && r1.end >= r2.end)
  );
};

const findOverlapping = (
  range: Range,
  existingRanges: Range[],
): Range | undefined => {
  return existingRanges.find((er) => isOverlapping(range, er));
};

export const splitOverlap = (range: Range, existingRange: Range): Range[] => {
  if (range.start >= existingRange.start && range.end <= existingRange.end) {
    return [];
  }
  let beforeRange: Range | undefined;
  if (range.start < existingRange.start) {
    beforeRange = { start: range.start, end: existingRange.start - 1 };
  }

  let afterRange: Range | undefined;

  if (range.end > existingRange.end) {
    afterRange = { start: existingRange.end + 1, end: range.end };
  }
  return compact([beforeRange, afterRange]);
};

const withoutOverlaps = (freshIngredients: Range[], result: Range[] = []) => {
  const [first, ...rest] = freshIngredients;
  if (!first) {
    return result;
  }
  const nextOverlap = findOverlapping(first, result);

  if (!nextOverlap) {
    return withoutOverlaps(rest, [first, ...result]);
  }
  const newRanges = splitOverlap(first, nextOverlap);
  return withoutOverlaps([...newRanges, ...rest], result);
};

export const solve = (input: string) => {
  const [freshString, availableString] = input.split("\n\n");

  if (!freshString) throw new Error("freshString undefined");
  if (!availableString) throw new Error("availableString undefined");

  const freshIngredients = parseFresh(freshString);

  const noOverlaps = withoutOverlaps(freshIngredients);

  return sum(noOverlaps.map((r) => r.end - r.start + 1));
};

console.log(solve(input));
