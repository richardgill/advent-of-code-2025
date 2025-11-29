import { expect, test } from "bun:test";

const example1 = await Bun.file(import.meta.dir + "/data/example1.txt").text();

test("example 1", () => {
  expect(true).toBe(true);
});
