/**
 *
 * @param {string|[number, number]} coordinates
 */
export default function Square(coordinates) {
  let name = null;
  let [_x, _y] = [null, null];
  if (
    typeof coordinates === "string" &&
    (coordinates.length === 2 || coordinates.length === 3)
  ) {
    name = coordinates;
    [_x, _y] = squareNameToCoordinates(name);
  } else if (Array.isArray(coordinates) && coordinates.length === 2) {
    if (!checkIfOnBoard(coordinates)) {
      return null;
    }
    _x = coordinates[0];
    _y = coordinates[1];
    name = coordinatesToSquareName(coordinates);
  } else {
    console.warn("Square received unexpected input: ", coordinates);
    return null;
    //throw new Error("Wrong input");
  }

  /* function randomCoordinates(){
    function random(){return Math.floor(Math.random()*10)}
    return [random(),random()]
  } */

  function _adjacent(_x, _y) {
    const adjacentCoordinates = [
      [_x + 1, _y],
      [_x - 1, _y],
      [_x, _y + 1],
      [_x, _y - 1],
    ];
    const adjacentCoordinatesOnBoard = adjacentCoordinates.filter((coords) =>
      checkIfOnBoard(coords)
    );
    return adjacentCoordinatesOnBoard.map((coordinates) => Square(coordinates));
  }

  function _sumOfCoordinates(x, y) {
    return x + y;
  }

  function _perimeter(_x, _y) {
    const perimeterCoordinates = [
      [_x + 1, _y],
      [_x - 1, _y],
      [_x, _y + 1],
      [_x, _y - 1],
      [_x - 1, _y - 1],
      [_x + 1, _y + 1],
      [_x - 1, _y + 1],
      [_x + 1, _y - 1],
    ];
    const perimeterCoordinatesOnBoard = perimeterCoordinates.filter((coords) =>
      checkIfOnBoard(coords)
    );
    return perimeterCoordinatesOnBoard.map((coordinates) =>
      Square(coordinates)
    );
  }

  return {
    name,
    get coordinates() {
      return [_x, _y];
    },
    get x() {
      return _x;
    },
    get y() {
      return _y;
    },
    get adjacent() {
      return _adjacent(_x, _y);
    },
    get perimeter() {
      return _perimeter(_x, _y);
    },
    get sum() {
      return _sumOfCoordinates(_x, _y);
    },
    allSquares,
  };
}

/**
 * Returns false if coordinates are outside of the board, true otherwise.
 * @param {[number, number]} coordinates
 * @returns {boolean}
 */
export function checkIfOnBoard(coordinates) {
  const [x, y] = coordinates;
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    coordinates.length !== 2
  ) {
    return false;
  }
  if (x < 0 || y < 0 || x > 9 || y > 9) {
    return false;
  }
  return true;
}

/**
 * Returns array of X and Y coordinates.
 * @param {string} square
 * @returns {[number,number]}
 */
export function squareNameToCoordinates(square) {
  const letter = square.slice(0, 1);
  const x = letter.charCodeAt() - 97;
  const y = +square.slice(1) - 1;
  if (!checkIfOnBoard([x, y])) {
    throw new Error("invalid input");
  }
  return [x, y];
}

/**
 * Returns a string with square name.
 * @param {[number,number]} coordinates
 * @returns {string}
 */
export function coordinatesToSquareName([x, y]) {
  if (!checkIfOnBoard([x, y])) {
    throw new Error("invalid input");
  }
  return String.fromCharCode(x + 97) + (y + 1);
}

/**
 * Returns an array of all squares (square objects) on a 10x10 board.
 * @returns {[]}
 */
export function allSquares() {
  const squares = [];
  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      squares.push(Square([x, y]));
    }
  }
  return squares;
}
