export const lines = (input: string): string[] => input.trim().split("\n");

export const gridToString = (grid: string[][]) =>
  grid.map((g) => g.join("")).join("\n");
