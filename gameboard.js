import { squareNameToCoordinates, coordinatesToSquareName } from "./utilities";

export function Gameboard() {
  const ships = [];
  const hits = [];

  function receiveAttack(squareName) {
    hits.push(squareName);
  }

  function isAllSunk() {
    //
  }

  return {
    ships,
    hits,
    receiveAttack,
    isAllSunk,
  };
}
