import {
  coordinatesToSquareName,
  defaultShips,
  allSquares,
  squareNameToCoordinates,
} from "./utilities.js";

export function Player(humanOrMachine, gameboard) {
  const playerDescription = humanOrMachine;
  const board = gameboard;
  let isActive = false;
  let isHuman = undefined;
  if (humanOrMachine === "human") {
    isHuman = true;
  } else if (humanOrMachine === "machine") {
    isHuman = false;
  }

  function makeMove(opponentsBoard, View) {
    isActive = true;
    if (isHuman === true) {
      return new Promise((resolve) => {
        View.movePromiseCallback = resolve;
      });
    } else if (isHuman === false) {
      isActive = false;
      //return computerMove(markedSquares);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const move = computerMoveBetter(opponentsBoard);
          if (move) {
            resolve(move);
          } else {
            reject("Computer failed to move");
          }
        }, 300);
      });
    }
  }

  const allPossibleSquares = allSquares();

  function computerMoveBetter(opponentsBoard) {
    const markedSquares = opponentsBoard.markedSquares();
    const goodShots = opponentsBoard.goodShots;
    let potentialSquares = allPossibleSquares;

    if (goodShots.length === 1) {
      potentialSquares = adjacentSquares(goodShots[0]);
    } else if (goodShots.length > 1) {
      const sortedCoordinates = goodShots
        .map((square) => squareNameToCoordinates(square))
        .sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
      const minSquare = sortedCoordinates.slice(0, 1)[0];
      const maxSquare = sortedCoordinates.slice(-1)[0];
      if (minSquare[0] === maxSquare[0]) {
        //ship is vertical
        const preMin = [minSquare[0], minSquare[1] - 1];
        const postMax = [maxSquare[0], maxSquare[1] + 1];
        potentialSquares = endSquaresOnboard(preMin, postMax);
      } else if (minSquare[1] === maxSquare[1]) {
        //ship is horizontal
        const preMin = [minSquare[0] - 1, minSquare[1]];
        const postMax = [maxSquare[0] + 1, maxSquare[1]];
        potentialSquares = endSquaresOnboard(preMin, postMax);
      } else {
        console.warn("unexpected result");
      }
    }

    const candidateSquares = potentialSquares.filter((square) => {
      return !markedSquares.includes(square);
    });

    if (candidateSquares.length === 0) {
      console.error("Unable to make a move");
      return null;
    }
    const target = Math.floor(Math.random() * candidateSquares.length);
    return candidateSquares[target];
  }

  function endSquaresOnboard(preMin, postMax) {
    return [preMin, postMax]
      .filter((coordinates) => {
        const [x, y] = coordinates;
        return !(x < 0 || y < 0 || x > 9 || y > 9);
      })
      .map((square) => coordinatesToSquareName(square));
  }

  function adjacentSquares(square) {
    const [x, y] = squareNameToCoordinates(square);
    const adjacent = [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ];
    const adjacentOnBoard = adjacent.filter((coordinates) => {
      const [x, y] = coordinates;
      return !(x < 0 || y < 0 || x > 9 || y > 9);
    });
    const result = adjacentOnBoard.map((square) =>
      coordinatesToSquareName(square)
    );
    return result;
  }

  /* function computerMove(markedSquares) {
    let target = newTarget();
    while (markedSquares.includes(target)) {
      target = newTarget();
    }
    return target;

    function newTarget() {
      return coordinatesToSquareName([randomNumber(), randomNumber()]);
    }
    function randomNumber() {
      return Math.floor(Math.random() * 10);
    }
  } */

  function populateBoard(placement = null) {
    if (placement === "default") {
      board.addShips(defaultShips);
    }
  }

  return { makeMove, board, isHuman, populateBoard, playerDescription };
}
