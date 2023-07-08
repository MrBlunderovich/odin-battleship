import { squareNameToCoordinates, coordinatesToSquareName } from "./utilities";
import { Ship } from "./ship";

export function Gameboard() {
  const ships = [];
  const hits = [];

  function receiveAttack(squareName) {
    hits.push(squareName);
    for (let ship of ships) {
      if (ship.squares.includes(squareName)) {
        ship.hit();
        return true;
      }
    }
    return false;
  }

  function areAllSunk() {
    if (ships.length === 0) {
      return undefined;
    }
    return ships.reduce((verdict, currentShip) => {
      return verdict && currentShip.isSunk();
    }, true);
  }

  function addShips(coordinates) {
    coordinates.forEach((item) => ships.push(Ship(item)));
  }

  function markedSquares() {
    const sunkShipSquaresAndAreas = ships.reduce((acc, ship) => {
      if (ship.isSunk()) {
        return [...acc, ...ship.area];
      }
      return acc;
    }, []);
    return [...hits, ...sunkShipSquaresAndAreas];
  }

  return {
    ships,
    hits,
    receiveAttack,
    areAllSunk,
    addShips,
    markedSquares,
  };
}
