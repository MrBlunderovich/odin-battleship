//import { coordinatesToSquareName } from "./utilities.js";
//import { composeShipCoordinates } from "./ship-placement.js";
//import { composeShips } from "./gameboard.js";

/* const context = {
  boards: [],
  players: [],
  winner: null,
  humansMove: null,
  AIautoplay: false,
  newGameCallBack: newGame,
  moveCallBack: null,
  status: "Ready to start",
}; */

export const View = (function () {
  let _context = {};
  //let newGameCallback = () => console.error("no callback yet");
  //let positionShipsCB = () => console.error("no callback yet");
  let moveCallback = null;
  const playerBoard = document.querySelector(".board.player");
  const opponentBoard = document.querySelector(".board.opponent");
  const display = document.querySelector(".status");

  //////////////////////////////////////////////////////EVENTS:

  document.addEventListener("click", handleClick);

  function handleClick(event) {
    if (event.target.matches(".player .square")) {
      //if(_context.status === 'Ready to start'){}
      handleShipInput(event);
    }

    if (event.target.matches(".opponent .square")) {
      if (event.target.matches(".marked")) {
        return;
      }
      const move = event.target.dataset.name;
      console.log(move);
      if (moveCallback) {
        moveCallback(move);
        moveCallback = null;
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

  function handleShipInput(event) {
    const square = event.target;
    square.classList.toggle("ship");
    const shipSquares = square.parentElement.querySelectorAll(".ship");
    const shipSquareNames = Array.from(shipSquares).map(
      (square) => square.dataset.name
    );
    const attempt = _context.boards[0].composeShips(shipSquareNames);
    /* if (attempt) {
      render(_context.boards);
    } */
  }

  //////////////////////////////////////////////////////RENDER:

  function render([playerGameboard, opponentGameboard]) {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      if (square.closest(".player")) {
        setSquareClasses(square, playerGameboard, true);
      } else if (square.closest(".opponent")) {
        setSquareClasses(square, opponentGameboard, false);
      } else {
        console.error("Square unidentified");
      }
    });
    display.textContent = _context.status;
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

  //////////////////////////////////////////

  /* function clearBoards() {
    [playerBoard, opponentBoard].forEach((board) => {
      board.innerHTML = "";
    });
  } */

  return {
    createBoards,
    render,
    /* set movePromiseCallback(cb) {
      moveCallback = cb;
    }, */
    set context(newContext) {
      _context = newContext;
    },
  };
})();
