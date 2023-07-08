import { coordinatesToSquareName } from "./utilities";

export function Player(humanOrMachine) {
  let isHuman = undefined;
  if (humanOrMachine === "human") {
    isHuman = true;
  } else if (humanOrMachine === "machine") {
    isHuman = false;
  }

  function makeMove(markedSquares = []) {
    //if human, wait for input
    //if machine, pick a legal square to hit
    if (isHuman === false) {
      return computerMove(markedSquares);
    }
    //return square
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

  return { makeMove };
}
