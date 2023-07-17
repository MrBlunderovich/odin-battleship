import { allSquares } from "./square.js";

export function Player(humanOrMachine, gameboard) {
  const board = gameboard;
  let isHuman = undefined;
  if (humanOrMachine === "human") {
    isHuman = true;
  } else if (humanOrMachine === "machine") {
    isHuman = false;
  }

  function makeMove(opponentsBoard, View) {
    if (isHuman === true) {
      return new Promise((resolve) => {
        View.movePromiseCallback = resolve;
      });
    } else if (isHuman === false) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const moveSquareName = computerMoveBetter(opponentsBoard);
          if (moveSquareName) {
            resolve(moveSquareName);
          } else {
            reject("Computer failed to move");
          }
        }, 300);
      });
    }
  }

  const allPossibleSquares = allSquares();

  function computerMoveBetter(opponentsBoard) {
    const markedSquareNames = opponentsBoard.markedSquares();

    const goodShots = opponentsBoard.goodShots
      .map((squareName) => Square(squareName))
      .sort((a, b) => a.sum - b.sum);

    let potentialSquares = allPossibleSquares;

    if (goodShots.length === 1) {
      potentialSquares = goodShots[0].adjacent;
    } else if (goodShots.length > 1) {
      const minSquare = goodShots.at(0);
      const maxSquare = goodShots.at(-1);
      if (minSquare.x === maxSquare.x) {
        //ship is vertical
        const preMin = Square([minSquare.x, minSquare.y - 1]);
        const postMax = Square([minSquare.x, minSquare.y + 1]);
        potentialSquares = [preMin, postMax];
      } else if (minSquare.y === maxSquare.y) {
        //ship is horizontal
        const preMin = Square([minSquare.x - 1, minSquare.y]);
        const postMax = Square([minSquare.x + 1, minSquare.y]);
        potentialSquares = [preMin, postMax];
      } else {
        console.warn("unexpected result");
      }
    }

    const candidateSquares = potentialSquares.filter(
      (square) => !!square && !markedSquareNames.includes(square.name)
    );

    if (candidateSquares.length === 0) {
      console.error("Unable to make a move");
      return null;
    }
    const target = Math.floor(Math.random() * candidateSquares.length);
    return candidateSquares[target];
  }

  const defaultShipCoordinates = [
    ["c1"],
    ["a1"],
    ["a3"],
    ["a5"],
    ["a7", "a8"],
    ["a10", "b10"],
    ["d10", "e10"],
    ["d10", "e10", "f10"],
    ["h10", "i10", "j10"],
    ["j8", "j7", "j6", "j5"],
  ];

  function populateBoard(placement = null) {
    if (placement === "default") {
      board.setShips(defaultShipCoordinates);
    }
    //TODO: add localStorage
  }

  return {
    makeMove,
    board,
    isHuman,
    populateBoard,
    playerDescription: humanOrMachine,
  };
}
