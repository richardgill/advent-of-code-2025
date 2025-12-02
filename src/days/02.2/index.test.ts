import { expect, test } from "bun:test";
import { isInvalid } from ".";

const example1 = await Bun.file(import.meta.dir + "/data/example1.txt").text();

test("1111111", () => {
  expect(isInvalid(111111)).toBe(true);
});
test("123123", () => {
  expect(isInvalid(123123)).toBe(true);
});
test("1234123", () => {
  expect(isInvalid(1234123)).toBe(false);
});
test("99999", () => {
  expect(isInvalid(99999)).toBe(true);
});
test("3", () => {
  expect(isInvalid(3)).toBe(false);
});
