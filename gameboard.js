import { Ship } from "./ship.js";
import Square from "./square.js";

export function Gameboard() {
  const ships = [];
  const hits = [];
  const goodShots = [];

  function receiveAttack(squareName) {
    hits.push(squareName);
    for (let ship of ships) {
      if (ship.squareNames.includes(squareName)) {
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

  function shipSquares() {
    return ships.reduce((acc, ship) => {
      return acc.concat(ship.squares);
    }, []);
  }

  //////////////////////////////////////////////COMPOSE

  function composeShips(arrayOfShipSquareNames) {
    if (arrayOfShipSquareNames.length !== 20) {
      return null;
    }

    let inputSquares = arrayOfShipSquareNames.map((squareName) =>
      Square(squareName)
    );
    const ships = [];

    while (inputSquares.length > 0) {
      const currentSquare = inputSquares.pop();
      const candidateSquares = currentSquare.perimeter;
      const groupOfSquares = candidateSquares.filter((square) =>
        inputSquares.map((s) => s.name).includes(square.name)
      );

      if (groupOfSquares.length > 0) {
        inputSquares = inputSquares.filter(
          (square) => !groupOfSquares.map((s) => s.name).includes(square.name)
        );

        const newShip = Ship(groupOfSquares);
        if (newShip) {
          ships.push(newShip);
        } else {
          return null;
        }
      }
    }

    return ships.length === 10 ? ships : null;
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
    composeShips,
  };
}
