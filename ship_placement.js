import { squareNameToCoordinates, getAreaAroundShip } from "./utilities.js";

export function checkCompliance(arrayOfShips, squareGroups) {
  let verdict = true;
  if (arrayOfShips.length !== 10) {
    verdict = false;
    console.warn("should be ten ships");
  } else if (arrayOfShips.some((shipArray) => shipArray.length !== 2)) {
    verdict = false;
    console.warn("should be two coordinates");
  } /* else if (
    arrayOfShips.some((shipArray) => {
      const coordinates = shipArray.map((squareName) =>
        squareNameToCoordinates(squareName)
      );
      return (
        coordinates[0][0] !== coordinates[1][0] &&
        coordinates[0][1] !== coordinates[1][1]
      );
    })
  ) {
    verdict = false;
    console.warn("ships should be straight");
  } */ else if (
    squareGroups.some((group) => {
      const coordinates = group.map((squareName) =>
        squareNameToCoordinates(squareName)
      );
      const xCoordinates = coordinates.map((coord) => coord[0]);
      const yCoordinates = coordinates.map((coord) => coord[1]);
      const isVertical = yCoordinates.every(
        (coord) => coord === yCoordinates[0]
      );
      const isHorizontal = xCoordinates.every(
        (coord) => coord === xCoordinates[1]
      );
      return !(isVertical || isHorizontal);
    })
  ) {
    verdict = false;
    console.warn("ships should be straight");
  }

  return verdict;
}

///////////////////////////////////////////////////////////////////////////////////
export function composeShipCoordinates(arrayOfRawSquares) {
  if (arrayOfRawSquares.length !== 20) {
    return null;
  }
  //const squareCoordinates = rawSquares.map(square=>squareNameToCoordinates(square))
  let rawSquares = [...arrayOfRawSquares];
  const squareGroups = [];
  const currentGroup = [];
  while (rawSquares.length > 0) {
    /* let currentSquare = currentGroup.length===0?rawSquares.pop()
    :currentGroup[currentGroup.length-1] */
    if (currentGroup.length === 0) {
      currentGroup.push(rawSquares.pop());
    }
    const currentSquare = currentGroup.at(-1);
    const coordinates = squareNameToCoordinates(currentSquare);
    const adjacentSquares = getAreaAroundShip([...coordinates, ...coordinates]);
    const adjacentInRaw = adjacentSquares.filter((square) =>
      rawSquares.includes(square)
    );
    rawSquares = rawSquares.filter((square) => !adjacentInRaw.includes(square));

    if (adjacentInRaw.length > 0) {
      currentGroup.push(...adjacentInRaw);
    } else {
      if (currentGroup.length === 1) {
        currentGroup.push(currentSquare);
      }
      squareGroups.push([...currentGroup]);
      currentGroup.length = 0;
    }
  }
  squareGroups.forEach((square) =>
    square.sort((a, b) => {
      const aSumOfCoordinates = squareNameToCoordinates(a).reduce(
        (acc, num) => acc + num
      );
      const bSumOfCoordinates = squareNameToCoordinates(b).reduce(
        (acc, num) => acc + num
      );
      return aSumOfCoordinates - bSumOfCoordinates;
    })
  );
  const ships = squareGroups.map((group) => [group.at(0), group.at(-1)]);

  const areValidShips = checkCompliance(ships, squareGroups);

  return areValidShips ? ships : null;
}
