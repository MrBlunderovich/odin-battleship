import { Ship, removeDuplicateSquares } from "./ship.js";
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
    console.log("composeShips input: ", arrayOfShipSquareNames);
    let inputSquares = arrayOfShipSquareNames.map((squareName) =>
      Square(squareName)
    );

    const ships = [];
    const group = [];

    while (inputSquares.length > 0) {
      group.push(inputSquares.pop());
      do {
        const adjacent = [];
        for (let square of group) {
          adjacent.push(...findIntersection(square.perimeter, inputSquares));
        }
        if (adjacent.length > 0) {
          group.push(...adjacent);
        } else {
          ships.push([...group]);
          group.length = 0;
        }
      } while (group.length > 0);
    }

    function findIntersection(perimeterSquares, inputSquares) {
      const inputNames = inputSquares.map((s) => s.name);
      const result = perimeterSquares.filter((square) =>
        inputNames.includes(square.name)
      );
      if (result.length > 0) {
        const resultNames = result.map((s) => s.name);
        console.log(inputSquares);
        const newInputSquares = inputSquares.filter(
          (square) => !resultNames.includes(square.name)
        );
        inputSquares.length = 0;
        inputSquares.push(...newInputSquares);
        console.log(inputSquares);
        return result;
      }
      return [];
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
