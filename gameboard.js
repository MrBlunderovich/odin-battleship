import { squareNameToCoordinates, coordinatesToSquareName } from "./utilities";
import { Ship } from "./ship";

const defaultShips = [
  ["a1", "a1"],
  ["a3", "a3"],
  ["a5", "a5"],
  ["a7", "a7"],
  ["a9", "a10"],
  ["c9", "c10"],
  ["d9", "d10"],
  ["c1", "c3"],
  ["e1", "e3"],
  ["j1", "j4"],
];

export function Gameboard() {
  const ships = [];
  const hits = [];

  function receiveAttack(squareName) {
    hits.push(squareName);
    ships.forEach((ship) => {
      if (ship.squares.includes(squareName)) {
        ship.hit();
      }
    });
  }

  function areAllSunk() {
    if (ships.length === 0) {
      return undefined;
    }
    return ships.reduce((verdict, currentShip) => {
      return verdict && currentShip.isSunk;
    }, true);
  }

  function addShips(coordinates) {
    coordinates.forEach((item) => ships.push(Ship(item)));
  }

  return {
    ships,
    hits,
    receiveAttack,
    areAllSunk,
    addShips,
  };
}
