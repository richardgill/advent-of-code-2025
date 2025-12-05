import { describe, expect, test } from "bun:test";
import { isOverlapping, splitOverlap } from ".";

describe("isOverlapping", () => {
  const testCases = [
    {
      range1: { start: 0, end: 5 },
      range2: { start: 6, end: 7 },
      expected: false,
    },
    {
      range1: { start: 0, end: 5 },
      range2: { start: 5, end: 7 },
      expected: true,
    },
    {
      range1: { start: 0, end: 5 },
      range2: { start: 4, end: 7 },
      expected: true,
    },
    {
      range1: { start: 3, end: 5 },
      range2: { start: 1, end: 2 },
      expected: false,
    },
    {
      range1: { start: 3, end: 5 },
      range2: { start: 1, end: 3 },
      expected: true,
    },
    {
      range1: { start: 3, end: 5 },
      range2: { start: 1, end: 4 },
      expected: true,
    },
    {
      range1: { start: 0, end: 5 },
      range2: { start: 1, end: 4 },
      expected: true,
    },
  ];

  for (const { range1, range2, expected } of testCases) {
    test(`${JSON.stringify(range1, null, 2)} ${JSON.stringify(range2, null, 2)}, ${expected}`, () => {
      expect(isOverlapping(range1, range2)).toBe(expected);
    });
  }
});

describe("split", () => {
  const testCases = [
    {
      range1: { start: 0, end: 5 },
      range2: { start: 6, end: 7 },
      expected: [{ start: 0, end: 5 }],
    },
    {
      range1: { start: 0, end: 5 },
      range2: { start: 5, end: 7 },
      expected: [{ start: 0, end: 4 }],
    },
    {
      range1: { start: 0, end: 5 },
      range2: { start: 4, end: 7 },
      expected: [{ start: 0, end: 3 }],
    },
    {
      range1: { start: 3, end: 5 },
      range2: { start: 1, end: 2 },
      expected: [{ start: 3, end: 5 }],
    },
    {
      range1: { start: 3, end: 5 },
      range2: { start: 1, end: 3 },
      expected: [{ start: 4, end: 5 }],
    },
    {
      range1: { start: 3, end: 5 },
      range2: { start: 1, end: 4 },
      expected: [{ start: 5, end: 5 }],
    },
    {
      range1: { start: 0, end: 5 },
      range2: { start: 1, end: 4 },
      expected: [
        { start: 0, end: 0 },
        { start: 5, end: 5 },
      ],
    },
  ];

  for (const { range1, range2, expected } of testCases) {
    test(`${JSON.stringify(range1, null, 2)} ${JSON.stringify(range2, null, 2)}, ${JSON.stringify(expected)}`, () => {
      expect(splitOverlap(range1, range2)).toEqual(expected);
    });
  }
});
