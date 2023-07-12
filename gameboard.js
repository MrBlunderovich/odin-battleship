import { Ship } from "./ship.js";

export function Gameboard() {
  const ships = [];
  const hits = [];
  const goodShots = [];

  function receiveAttack(squareName) {
    hits.push(squareName);
    for (let ship of ships) {
      if (ship.squares.includes(squareName)) {
        ship.hit();
        if (ship.isSunk()) {
          goodShots.length = 0;
        } else {
          goodShots.push(squareName);
        }
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

  function unavailableSquares() {
    return ships.reduce((acc, ship) => {
      return [...acc, ...ship.squares, ...ship.area];
    }, []);
  }

  function shipSquares() {
    return ships.reduce((acc, ship) => {
      return acc.concat(ship.squares);
    }, []);
  }

  return {
    ships,
    hits,
    goodShots,
    receiveAttack,
    areAllSunk,
    addShips,
    markedSquares,
    shipSquares,
  };
}
