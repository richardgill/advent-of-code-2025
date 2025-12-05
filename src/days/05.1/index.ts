import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const parseFresh = (freshString: string): { start: number; end: number }[] => {
  const freshIngredients = lines(freshString).map((line) => {
    const [start, end] = line.split("-");
    if (!start) throw new Error("start missing");
    if (!end) throw new Error("end missing");
    return { start: parseInt(start, 10), end: parseInt(end, 10) };
  });
  return freshIngredients;
};

const solve = (input: string) => {
  const [freshString, availableString] = input.split("\n\n");

  if (!freshString) throw new Error("freshString undefined");
  if (!availableString) throw new Error("availableString undefined");

  const freshIngredients = parseFresh(freshString);
  const availableIngredients = availableString
    .split("\n")
    .map((i) => parseInt(i, 10));

  const fresh = availableIngredients.filter((i) =>
    freshIngredients.find((fresh) => fresh.start <= i && i <= fresh.end),
  );
  return fresh.length;
};

console.log(solve(input));
