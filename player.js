import {
  coordinatesToSquareName,
  defaultShips,
  allSquares,
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

  function makeMove(markedSquares = [], View) {
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
          resolve(computerMoveBetter(markedSquares));
        }, 300);
      });
    }
  }

  const allPossibleSquares = allSquares();

  function computerMoveBetter(markedSquares) {
    const candidateSquares = allPossibleSquares.filter((square) => {
      return !markedSquares.includes(square);
    });
    if (candidateSquares.length === 0) {
      console.error("Unable to make a move");
    }
    const target = Math.floor(Math.random() * candidateSquares.length);
    return candidateSquares[target];
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
