import { orderBy } from "es-toolkit";
import { lines } from "../../lib/utils";

const input = await Bun.file(import.meta.dir + "/data/input.txt").text();

type Coordinate = { x: number; y: number; z: number };
type Distance = {
  coordinate1: Coordinate;
  coordinate2: Coordinate;
  distance: number;
};

const euclidianDistance = (
  coordinate1: Coordinate,
  coordinate2: Coordinate,
): number => {
  return Math.sqrt(
    (coordinate1.x - coordinate2.x) ** 2 +
      (coordinate1.y - coordinate2.y) ** 2 +
      (coordinate1.z - coordinate2.z) ** 2,
  );
};

const calcDistances = (coordinates: Coordinate[]) => {
  return orderBy(
    coordinates.flatMap((coordinate, index) =>
      coordinates.slice(index + 1).map((c) => ({
        coordinate1: coordinate,
        coordinate2: c,
        distance: euclidianDistance(coordinate, c),
      })),
    ),
    [(x) => x.distance],
    ["desc"],
  );
};

const findCircuitsToConnect = (
  circuits: Coordinate[][],
  distance: Distance,
) => {
  let circuit1Index = -1;
  let circuit2Index = -1;

  const { coordinate1, coordinate2 } = distance;
  circuit1Index = circuits.findIndex((circuit) =>
    circuit.find((c1) => c1 === coordinate1),
  );
  circuit2Index = circuits.findIndex((circuit) =>
    circuit.find((c2) => c2 === coordinate2),
  );
  return { circuit1Index, circuit2Index };
};

const solve = (input: string) => {
  let circuits = lines(input).map((line) => {
    const [x, y, z] = line.split(",").map((x) => parseInt(x, 10));
    return [{ x, y, z }];
  }) as Coordinate[][];

  const distances = calcDistances(circuits.flat());
  for (let counter = 0; counter < 1000; counter++) {
    const distance = distances.pop();
    if (!distance) throw new Error("no distance");
    const { circuit1Index, circuit2Index } = findCircuitsToConnect(
      circuits,
      distance,
    );
    if (circuit1Index !== circuit2Index) {
      circuits[circuit1Index] = [
        ...(circuits[circuit1Index] ?? []),
        ...(circuits[circuit2Index] ?? []),
      ];
      circuits = [
        ...circuits.slice(0, circuit2Index),
        ...circuits.slice(circuit2Index + 1, circuits.length),
      ];
    } else {
      console.log("same circuit - skipping");
    }
  }
  const threeBiggest = circuits
    .map((c) => c.length)
    .toSorted((a, b) => b - a)
    .slice(0, 3);

  return threeBiggest.reduce((prev, current) => prev * current, 1);
};

console.log(solve(input));
