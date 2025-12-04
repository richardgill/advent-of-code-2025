import { max, sum } from "es-toolkit/compat";
import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

const parseBanks = (input: string) => {
  const banks = lines(input);
  return banks.map((b) => b.split("").map((n) => parseInt(n, 10)));
};

const findHighest = (bank: number[]) => {
  const highestForEachB = bank.slice(0, bank.length - 1).map((b, index) => {
    const rightOfB = bank.slice(index + 1, bank.length);
    const maxDigitRight = max(rightOfB) ?? -1;
    return b * 10 + maxDigitRight;
  });
  return max(highestForEachB);
};

const solve = (input: string) => {
  const banks = parseBanks(input);
  const highestBanks = banks.map((bank) => findHighest(bank));
  return sum(highestBanks);
};

console.log(solve(input));
