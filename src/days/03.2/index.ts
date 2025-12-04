import { max, sum } from "es-toolkit/compat";
import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const parseBanks = (input: string) => {
  const banks = lines(input);
  return banks.map((b) => b.split("").map((n) => parseInt(n, 10)));
};

const maxIndex = (numbers: number[]) => {
  const highest = max(numbers);
  return numbers.findIndex((n) => n === highest);
};

const findHighest = (bank: number[]) => {
  let leftToDrop = bank.length - (12 - 1);
  let currentIndex = 0;
  let result = "";

  while (result.length < 12) {
    const nextIndex =
      maxIndex(bank.slice(currentIndex, currentIndex + leftToDrop)) +
      currentIndex;
    leftToDrop -= nextIndex - currentIndex;
    const nextValue = bank[nextIndex];
    result = `${result}${nextValue}`;
    currentIndex = nextIndex + 1;
  }

  return parseInt(result, 10);
};

const solve = (input: string) => {
  const banks = parseBanks(input);
  const highestBanks = banks.map((bank) => findHighest(bank));
  return sum(highestBanks);
};

console.log(solve(input));
