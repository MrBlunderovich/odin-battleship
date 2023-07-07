export function Ship([bow, stern]) {
  const coordinates = [
    ...squareNameToCoordinates(bow),
    ...squareNameToCoordinates(stern),
  ];
  let shipLength = null;
  let shipIsVertical = null;
  if (coordinates[0] === coordinates[2]) {
    shipIsVertical = true;
    shipLength = checkLength(coordinates[1], coordinates[3]);
  } else if (coordinates[1] === coordinates[3]) {
    shipIsVertical = false;
    shipLength = checkLength(coordinates[0], coordinates[2]);
  } else {
    throw new Error("invalid coordinates");
  }

  function checkLength(start, end) {
    const length = Math.abs(start - end) + 1;
    if (length > 4) {
      throw new Error("too long a ship");
    }
    return length;
  }

  const squares = shipSquares();

  function shipSquares() {
    if (shipLength === 1) {
      return [bow];
    }
    if (shipLength === 2) {
      return [bow, stern];
    }
    const squares = [];
    if (shipIsVertical) {
      const x = coordinates[0];
      const yStart = Math.min(coordinates[1], coordinates[3]);
      const yEnd = Math.max(coordinates[1], coordinates[3]);
      for (let y = yStart; y <= yEnd; y++) {
        squares.push(coordinatesToSquareName([x, y]));
      }
    } else {
      const y = coordinates[1];
      const xStart = Math.min(coordinates[0], coordinates[2]);
      const xEnd = Math.max(coordinates[0], coordinates[2]);
      for (let x = xStart; x <= xEnd; x++) {
        squares.push(coordinatesToSquareName([x, y]));
      }
    }
    return squares;
  }

  let timesHit = 0;

  function hit() {
    timesHit += 1;
  }

  return {
    get isSunk() {
      return timesHit >= shipLength;
    },
    hit,
    squares,
  };
}
//////////////////////////////////////////////////////////////
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
