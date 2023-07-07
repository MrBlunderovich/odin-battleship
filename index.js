import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

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
