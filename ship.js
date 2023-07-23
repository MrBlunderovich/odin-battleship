import Square from "./square.js";

export function Ship(arrayOfSquareNames) {
  const arrayOfSquareObjects = arrayOfSquareNames.map((name) => Square(name));
  if (arrayOfSquareObjects.includes(null)) {
    return null;
  }
  const _squares = sortSquares(arrayOfSquareObjects);
  if (!validateInput(_squares)) {
    return null;
  }
  const _shipLength = _squares.length;
  const _squareNames = names(_squares);
  let timesHit = 0;

  function hit() {
    timesHit += 1;
  }

  const perimeterWithDuplicates = _squares
    .reduce((acc, square) => {
      const newAcc = acc.concat(square.perimeter);
      return newAcc;
    }, [])
    .filter((square) => !_squareNames.includes(square.name));

  const _perimeter = removeDuplicateSquares(perimeterWithDuplicates);

  function isSunk() {
    return timesHit >= _shipLength;
  }

  return {
    isSunk,
    hit,
    get squareNames() {
      return _squares;
    },
    get squareNames() {
      return _squareNames;
    },
    get perimeter() {
      return _perimeter;
    },
  };
}

////////////////////////////

export function names(arrayOfSquareObjects) {
  return arrayOfSquareObjects.map((square) => square.name);
}

export function sortSquares(arrayOfSquareObjects) {
  arrayOfSquareObjects.sort((a, b) => a.sum - b.sum);
  return arrayOfSquareObjects;
}

export function removeDuplicateSquares(arrayOfSquareObjects) {
  const sorted = sortSquares(arrayOfSquareObjects);
  return sorted.reduce((acc, squareObject) => {
    if (!names(acc).includes(squareObject.name)) {
      acc.push(squareObject);
    }
    return acc;
  }, []);
}

///////////////////////VALIDATIONS

//TODO: write tests for validations
//TODO: write JSDocs

export function isSquareSequenceConsecutive(sortedArrayOfSquareObjects) {
  if (sortedArrayOfSquareObjects.length === 1) {
    return true;
  }
  if (sortedArrayOfSquareObjects.length === 0) {
    return false;
  }
  const arrayOfSums = sortedArrayOfSquareObjects.map((square) => square.sum);
  return Boolean(
    arrayOfSums.reduce((previous, current) => {
      if (previous !== false) {
        if (current === previous + 1) {
          return current;
        } else {
          return false;
        }
      } else return false;
    })
  );
}

function isShipStraight(arrayOfSquareObjects) {
  if (
    arrayOfSquareObjects.every(
      (square) => square.x === arrayOfSquareObjects[0].x
    ) ||
    arrayOfSquareObjects.every(
      (square) => square.y === arrayOfSquareObjects[0].y
    )
  ) {
    return true;
  }
  return false;
}

function isLengthOK(sortedArrayOfSquareObjects) {
  const shipLength = sortedArrayOfSquareObjects.length;
  if (shipLength < 1 || shipLength > 4) {
    return false;
  }
  const bowSternDifference =
    Math.abs(
      sortedArrayOfSquareObjects.at(0).sum -
        sortedArrayOfSquareObjects.at(-1).sum
    ) + 1;
  if (bowSternDifference !== shipLength) {
    console.log("something wrong with ship length");
    return false;
  }
  return true;
}

function validateInput(sortedArrayOfSquareObjects) {
  if (!isSquareSequenceConsecutive(sortedArrayOfSquareObjects)) {
    return false;
  }
  if (!isShipStraight(sortedArrayOfSquareObjects)) {
    return false;
  }
  if (!isLengthOK(sortedArrayOfSquareObjects)) {
    return false;
  }
  return true;
}
