import { squareNameToCoordinates, coordinatesToSquareName } from "./utilities";

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
