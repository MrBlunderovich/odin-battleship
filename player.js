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
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(computerMoveBetter(opponentsBoard));
        }, 300);
      });
    }
  }

  const allPossibleSquares = allSquares();

  function computerMoveBetter(opponentsBoard) {
    const markedSquares = opponentsBoard.markedSquares();
    const previousGoodHit = opponentsBoard.previousGoodHit;
    const potentialSquares = previousGoodHit
      ? adjacentSquares(previousGoodHit)
      : allPossibleSquares;
    const candidateSquares = potentialSquares.filter((square) => {
      return !markedSquares.includes(square);
    });
    if (candidateSquares.length === 0) {
      console.error("Unable to make a move");
    }
    const target = Math.floor(Math.random() * candidateSquares.length);
    return candidateSquares[target];
  }

  function adjacentSquares(square) {
    console.log("PGH: ", squareNameToCoordinates(square));
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
    console.log("adjacent: ", result);
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
