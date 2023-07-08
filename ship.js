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

  const area = getAreaAroundShip();

  function getAreaAroundShip() {
    const area = [];
    let highCorner = undefined;
    let lowCorner = undefined;
    if (coordinates[0] + coordinates[1] > coordinates[2] + coordinates[3]) {
      highCorner = [coordinates[0] + 1, coordinates[1] + 1];
      lowCorner = [coordinates[2] - 1, coordinates[3] - 1];
    } else {
      lowCorner = [coordinates[0] - 1, coordinates[1] - 1];
      highCorner = [coordinates[2] + 1, coordinates[3] + 1];
    }
    for (let x = lowCorner[0]; x <= highCorner[0]; x++) {
      area.push([x, lowCorner[1]], [x, highCorner[1]]);
    }
    for (let y = lowCorner[1] + 1; y < highCorner[1]; y++) {
      area.push([lowCorner[0], y], [highCorner[0], y]);
    }
    const inBoardArea = area.filter((coords) => {
      return (
        coords[0] >= 0 && coords[1] >= 0 && coords[0] <= 9 && coords[1] <= 9
      );
    });
    const inBoardAreaSquareNames = inBoardArea.map((coords) =>
      coordinatesToSquareName(coords)
    );
    return inBoardAreaSquareNames;
  }

  function isSunk() {
    return timesHit >= shipLength;
  }

  return {
    isSunk,
    hit,
    squares,
    area,
  };
}
