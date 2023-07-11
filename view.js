import { coordinatesToSquareName } from "./utilities.js";

export const View = (function () {
  let newGameCallback = () => console.error("no callback yet");
  let callbacks = null;
  const playerBoard = document.querySelector(".board.player");
  const opponentBoard = document.querySelector(".board.opponent");
  document.addEventListener("click", handleClick);

  function handleClick(event) {
    if (event.target.matches(".opponent .square")) {
      console.log(event.target.dataset.name);
      if (callbacks) {
        callbacks.resolve(event.target.dataset.name);
        callbacks = null;
      }
    }
    if (event.target.matches(".new-game")) {
      newGameCallback();
    }
  }

  function render([playerGameboard, opponentGameboard]) {
    /* const playerSquares = document.querySelectorAll('.player .square')
    const opponentSquares = document.querySelectorAll('.opponent .square') */
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      //square.className = "";
      if (square.closest(".player")) {
        setSquareClasses(square, playerGameboard, true);
      } else if (square.closest(".opponent")) {
        setSquareClasses(square, opponentGameboard, false);
      } else {
        console.error("Square unidentified");
      }
      //square.classList.add("square");
    });
  }

  function setSquareClasses(square, gameboard, isPlayer = false) {
    const squareName = square.dataset.name;
    if (gameboard.markedSquares().includes(squareName)) {
      square.classList.add("marked");
    }
    if (isPlayer && gameboard.shipSquares().includes(squareName)) {
      square.classList.add("ship");
    }
    if (
      gameboard.shipSquares().includes(squareName) &&
      gameboard.markedSquares().includes(squareName)
    ) {
      square.classList.add("hit");
    }
  }

  function createBoards() {
    [playerBoard, opponentBoard].forEach((board) => {
      board.innerHTML = "";
      const owner = board.dataset.owner;
      const fragment = document.createDocumentFragment();
      for (let y = 0; y <= 9; y++) {
        for (let x = 0; x <= 9; x++) {
          fragment.appendChild(createSquare(x, y, owner));
        }
      }
      board.appendChild(fragment);
    });
  }

  function createSquare(x, y, owner) {
    const coordinates = [x, y];
    const newSquare = document.createElement("div");
    newSquare.classList.add("square");
    newSquare.dataset.owner = owner;
    newSquare.dataset.coordinates = JSON.stringify(coordinates);
    newSquare.dataset.name = coordinatesToSquareName(coordinates);
    return newSquare;
  }

  /* function clearBoards() {
    [playerBoard, opponentBoard].forEach((board) => {
      board.innerHTML = "";
    });
  } */

  return {
    createBoards,
    render,
    set movePromiseCallbacks(cb) {
      callbacks = cb;
    },
    set newGameCB(cb) {
      newGameCallback = cb;
    },
  };
})();
