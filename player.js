import { coordinatesToSquareName, defaultShips } from "./utilities";

export function Player(humanOrMachine, gameboard) {
  const board = gameboard;
  let isActive = false;
  let isHuman = undefined;
  if (humanOrMachine === "human") {
    isHuman = true;
  } else if (humanOrMachine === "machine") {
    isHuman = false;
  }

  function makeMove(markedSquares = []) {
    isActive = true;
    if (isHuman === false) {
      isActive = false;
      return computerMove(markedSquares);
    }
  }

  function computerMove(markedSquares) {
    let target = newTarget();
    while (markedSquares.includes(target)) {
      target = newTarget();
    }
    return target;

    function newTarget() {
      return coordinatesToSquareName([randomNumber(), randomNumber()]);
    }
    function randomNumber() {
      return Math.floor(Math.random() * 9);
    }
  }

  function populateBoard(defaultPlacement = false) {
    if (defaultPlacement) {
      board.addShips(defaultShips);
    }
  }

  return { makeMove, board, isHuman, populateBoard };
}
