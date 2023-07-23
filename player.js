import Square, { allSquares } from "./square.js";

export function Player(humanOrMachine, gameboard) {
  const board = gameboard;
  let isHuman = undefined;
  if (humanOrMachine === "human") {
    isHuman = true;
  } else if (humanOrMachine === "machine") {
    isHuman = false;
  }

  function makeMove(opponentsBoard, View, AIDelay = 500) {
    if (isHuman === true) {
      return new Promise((resolve) => {
        View.movePromiseCallback = resolve;
      });
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const moveSquareName = computerMoveBetter(opponentsBoard);
        if (moveSquareName) {
          resolve(moveSquareName);
        } else {
          reject("Computer failed to move");
        }
      }, AIDelay);
    });
  }

  const allPossibleSquares = allSquares();

  function computerMoveBetter(opponentsBoard) {
    const goodShots = opponentsBoard.goodShots
      .map((squareName) => Square(squareName))
      .sort((a, b) => a.sum - b.sum);

    const potentialSquares =
      goodShots.length > 0 ? frontAndBack(goodShots) : allPossibleSquares;

    const candidateSquares = potentialSquares.filter(
      (square) =>
        square && !opponentsBoard.markedSquareNames.includes(square.name)
    );

    if (candidateSquares.length === 0) {
      console.error("Unable to make a move");
      return null;
    }
    const target = Math.floor(Math.random() * candidateSquares.length);
    return candidateSquares[target].name;
  }

  const defaultShipCoordinates = [
    ["c1"],
    ["a1"],
    ["a3"],
    ["a5"],
    ["a7", "a8"],
    ["a10", "b10"],
    ["j3", "j2"],
    ["d10", "e10", "f10"],
    ["h10", "i10", "j10"],
    ["j8", "j7", "j6", "j5"],
  ];

  function populateBoard(shipCoordinates = undefined) {
    if (shipCoordinates) {
      localStorage.setItem("ships", JSON.stringify(shipCoordinates));
    }

    if (isHuman) {
      const savedShips = localStorage.getItem("ships");
      if (savedShips) {
        board.setShips(JSON.parse(savedShips));
      } else {
        board.setShips(defaultShipCoordinates);
        localStorage.setItem("ships", JSON.stringify(defaultShipCoordinates));
      }
    } else {
      const autoShipCoordinates = autoPosition();
      board.setShips(autoShipCoordinates);
    }
  }

  //AUTO//AUTO//AUTO//AUTO//AUTO//AUTO//AUTO//AUTO//AUTO//AUTO//AUTO//AUTO//AUTO

  function autoPosition() {
    const template = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

    const available = {
      squares: allSquares(),
      get squareNames() {
        return this.squares.map((square) => square.name);
      },
      remove(squares) {
        const squareNames = squares.map((square) => square.name);
        const newSquares = this.squares.filter(
          (s) => !squareNames.includes(s.name)
        );
        this.squares = newSquares;
      },
    };
    const ships = [];

    //////////////////////////////////////////
    for (let shipSize of template) {
      //console.log({ shipSize });
      const newShipSquares = [];
      newShipSquares.push(spliceRandomSquare(available.squares));

      //////////////////////////////////////////////////////////////////////
      while (newShipSquares.length < shipSize) {
        const potentialSquares = frontAndBack(newShipSquares).filter(
          (square) => {
            return !!square && available.squareNames.includes(square.name);
          }
        );
        if (potentialSquares.length === 0) {
          //try again
          console.log("ships collision");
          newShipSquares.length = 0;
          newShipSquares.push(spliceRandomSquare(available.squares));
        } else {
          newShipSquares.push(spliceRandomSquare(potentialSquares));
          available.remove(newShipSquares);
        }
      }
      //////////////////////////////////////////////////////////////////////

      const perimeter = newShipSquares.reduce(
        (acc, square) => [...acc, ...square.perimeter],
        []
      );

      available.remove(perimeter);
      ships.push(newShipSquares);
    }
    //////////////////////////////////////////

    ships.sort((a, b) => a.sum - b.sum);
    const shipCoordinatesArray = ships.map((arrayOfSquareObjects) => {
      return arrayOfSquareObjects.map((s) => s.name);
    });
    const allShipSquareNames = shipCoordinatesArray.reduce(
      (acc, ship) => [...acc, ...ship],
      []
    );
    if (ships.length !== 10 || allShipSquareNames.length !== 20) {
      console.warn("Autopositioning failed");
      return undefined;
    }

    return shipCoordinatesArray;

    /**
     * Removes random element from input array and returns it.
     * @param {[]} squares
     * @returns {any}
     */
    function spliceRandomSquare(squares) {
      const randomIndex = Math.floor(Math.random() * squares.length);
      return squares.splice(randomIndex, 1).at(0);
    }
  }

  return {
    makeMove,
    board,
    isHuman,
    populateBoard,
    playerDescription: humanOrMachine,
  };
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/**
 * Return an array of squares that are at the ends of input squares.
 *
 * @param {[]}
 * @returns {[]}
 */
export function frontAndBack(arrayOfSquareObjects) {
  const sortedArrayOfSquareObjects = [...arrayOfSquareObjects].sort(
    (a, b) => a.sum - b.sum
  );
  if (sortedArrayOfSquareObjects.length > 1) {
    const minSquare = sortedArrayOfSquareObjects.at(0);
    const maxSquare = sortedArrayOfSquareObjects.at(-1);
    if (minSquare.x === maxSquare.x) {
      //ship is vertical
      const preMin = Square([minSquare.x, minSquare.y - 1]);
      const postMax = Square([maxSquare.x, maxSquare.y + 1]);
      return [preMin, postMax];
    } else if (minSquare.y === maxSquare.y) {
      //ship is horizontal
      const preMin = Square([minSquare.x - 1, minSquare.y]);
      const postMax = Square([maxSquare.x + 1, maxSquare.y]);
      return [preMin, postMax];
    } else {
      console.warn("Failed to find squares in front and at the back");
      return undefined;
    }
  } else if (sortedArrayOfSquareObjects.length === 1) {
    return sortedArrayOfSquareObjects[0].adjacent;
  }
  console.warn("Input should not be empty");
  return undefined;
}
