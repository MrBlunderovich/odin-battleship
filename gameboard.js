import { Ship } from "./ship.js";
import Square from "./square.js";

export function Gameboard() {
  const ships = [];
  const hits = [];
  const goodShots = [];
  //const sunkShipsSquareNames = [];

  function receiveAttack(squareName) {
    hits.push(squareName);
    for (let ship of ships) {
      if (ship.squareNames.includes(squareName)) {
        ship.hit();
        if (ship.isSunk()) {
          goodShots.length = 0;
          //sunkShipsSquareNames.push(...ship.squareNames);
        } else {
          goodShots.push(squareName);
        }
        return true;
      }
    }
    return false;
  }

  /* function areAllSunk() {
    if (ships.length === 0) {
      console.warn("ships.length equals zero");
      return null;
    }
    return sunkShipsSquareNames.length === 20;
  } */

  function areAllSunk() {
    if (ships.length === 0) {
      console.warn("ships.length equals zero");
      return null;
    }
    return ships.reduce((verdict, currentShip) => {
      return verdict && currentShip.isSunk();
    }, true);
  }

  function setShips(arrayOfSquareNames) {
    ships.length = 0;
    arrayOfSquareNames.forEach((squareName) => ships.push(Ship(squareName)));
  }

  function _markedSquareNames() {
    const sunkShipsPerimeter = ships
      .reduce((acc, ship) => {
        if (ship.isSunk()) {
          return acc.concat(ship.perimeter);
        }
        return acc;
      }, [])
      .map((square) => square.name);
    return [...hits, ...sunkShipsPerimeter];
  }

  function _shipSquareNames() {
    return ships.reduce((acc, ship) => {
      return acc.concat(ship.squareNames);
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
    //setShips(ships.map(s=>s.squareNames))
  }

  return {
    //sunkShipsSquareNames,
    ships,
    setShips,
    hits,
    receiveAttack,
    goodShots,
    areAllSunk,
    get markedSquareNames() {
      return _markedSquareNames();
    },
    get shipSquareNames() {
      return _shipSquareNames();
    },
    composeShips,
  };
}
