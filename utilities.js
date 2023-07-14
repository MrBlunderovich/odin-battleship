export function squareNameToCoordinates(square) {
  const letter = square.slice(0, 1);
  const x = letter.charCodeAt() - 97;
  const y = +square.slice(1) - 1;
  if (x < 0 || y < 0 || x > 9 || y > 9) {
    throw new Error("invalid input");
  }
  return [x, y];
}

export function coordinatesToSquareName([x, y]) {
  if (x < 0 || y < 0 || x > 9 || y > 9) {
    throw new Error("invalid input");
  }
  return String.fromCharCode(x + 97) + (y + 1);
}

export const defaultShips = [
  ["a1", "a1"],
  ["a3", "a3"],
  ["a5", "a5"],
  ["a7", "a7"],
  ["a9", "a10"],
  ["c9", "c10"],
  ["e9", "e10"],
  ["c1", "c3"],
  ["e1", "e3"],
  ["j1", "j4"],
];

export function allSquares() {
  const squares = [];
  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      squares.push(coordinatesToSquareName([x, y]));
    }
  }
  return squares;
}

export function getAreaAroundShip(coordinates) {
  const area = [];
  let highCorner = undefined;
  let lowCorner = undefined;
  if (coordinates[0] + coordinates[1] > coordinates[2] + coordinates[3]) {
    highCorner = [coordinates[0] + 1, coordinates[1] + 1];
    lowCorner = [coordinates[2] - 1, coordinates[3] - 1];
  } else {
    lowCorner = [coordinates[0] - 1, coordinates[1] - 1];
    highCorner = [coordinates[2] + 1, coordinates[3] + 1];
  }
  for (let x = lowCorner[0]; x <= highCorner[0]; x++) {
    area.push([x, lowCorner[1]], [x, highCorner[1]]);
  }
  for (let y = lowCorner[1] + 1; y < highCorner[1]; y++) {
    area.push([lowCorner[0], y], [highCorner[0], y]);
  }
  const inBoardArea = area.filter((coords) => {
    return coords[0] >= 0 && coords[1] >= 0 && coords[0] <= 9 && coords[1] <= 9;
  });
  const inBoardAreaSquareNames = inBoardArea.map((coords) =>
    coordinatesToSquareName(coords)
  );
  return inBoardAreaSquareNames;
}

export function sortShips(ships) {
  return [...ships].sort((a, b) => {
    const a0 = a[0];
    const b0 = b[0];
    return a0 > b0 ? 1 : -1;
  });
}
