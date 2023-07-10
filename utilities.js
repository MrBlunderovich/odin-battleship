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
