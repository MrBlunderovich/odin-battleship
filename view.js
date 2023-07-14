import { coordinatesToSquareName } from "./utilities.js";
import { composeShipCoordinates } from "./ship_placement.js";

export const View = (function () {
  let newGameCallback = () => console.error("no callback yet");
  let positionShipsCB = () => console.error("no callback yet");
  let callback = null;
  let status = "Ready to start";
  const playerBoard = document.querySelector(".board.player");
  const opponentBoard = document.querySelector(".board.opponent");
  const display = document.querySelector(".status");
  document.addEventListener("click", handleClick);

  function handleClick(event) {
    if (event.target.matches(".player .square")) {
      const square = event.target;
      square.classList.toggle("ship");
      const shipSquares = square.parentElement.querySelectorAll(".ship");
      const shipSquareNames = Array.from(shipSquares).map(
        (square) => square.dataset.name
      );
      const newShipCoordinates = composeShipCoordinates(shipSquareNames);
      console.log(newShipCoordinates);
    }

    if (event.target.matches(".opponent .square")) {
      if (event.target.matches(".marked")) {
        return;
      }
      const move = event.target.dataset.name;
      console.log(move);
      if (callback) {
        callback(move);
        callback = null;
      }
    }

    if (event.target.matches(".new-game")) {
      if (event.ctrlKey) {
        const AUTO = true;
        newGameCallback(AUTO);
      } else {
        newGameCallback();
      }
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
    display.textContent = status;
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

  function setStatus(newStatus) {
    status = newStatus;
  }

  /* function clearBoards() {
    [playerBoard, opponentBoard].forEach((board) => {
      board.innerHTML = "";
    });
  } */

  return {
    createBoards,
    render,
    set movePromiseCallback(cb) {
      callback = cb;
    },
    set newGameCB(cb) {
      newGameCallback = cb;
    },
    set positionShipsCB(cb) {
      newGameCallback = cb;
    },
    setStatus,
  };
})();
