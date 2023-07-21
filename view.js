import Square from "./square.js";

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
      if (event.target.matches(".marked") || _context.status !== "Ready") {
        return;
      }
      const move = event.target.dataset.name;
      console.log("click: ", move);
      if (moveCallback) {
        moveCallback(move);
        moveCallback = null;
      }
    }

    if (event.target.matches(".new-game")) {
      if (event.ctrlKey) {
        const AUTO = true;
        _context.newGameCallback(undefined, AUTO);
      } else {
        _context.newGameCallback();
      }
    }
  }

  function handleShipInput(event) {
    if (_context.status !== "Positioning") {
      _context.stopGameCallback();
      //stop current game
    }
    document.querySelector(".player").classList.add("positioning");
    const square = event.target;
    square.classList.toggle("ship");
    const shipSquares = square.parentElement.querySelectorAll(".ship");
    const shipSquareNames = Array.from(shipSquares).map(
      (square) => square.dataset.name
    );
    const newShipCoordinates = _context.boards[0].composeShips(shipSquareNames);
    if (newShipCoordinates && _context.boards[0].setShips(newShipCoordinates)) {
      _context.newGameCallback(newShipCoordinates);
      document.querySelector(".player").classList.remove("positioning");
    }
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
    display.textContent = _context.display;
  }

  function setSquareClasses(square, gameboard, isPlayer = false) {
    const squareName = square.dataset.name;
    if (gameboard.markedSquareNames.includes(squareName)) {
      square.classList.add("marked");
    }
    /* if (gameboard.shipSquareNames.includes(squareName)) {
      square.classList.add("ship");
    } */
    if (isPlayer && gameboard.shipSquareNames.includes(squareName)) {
      square.classList.add("ship");
    }
    if (
      gameboard.shipSquareNames.includes(squareName) &&
      gameboard.markedSquareNames.includes(squareName)
    ) {
      square.classList.add("hit");
    }
  }

  function wipeBoardMarks() {
    console.log("wiping board marks");
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.classList.remove("hit", "marked");
    });
    document.querySelector(".status").textContent = _context.display;
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
    newSquare.dataset.name = Square(coordinates).name;
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
    wipeBoardMarks,
    render,
    set movePromiseCallback(cb) {
      moveCallback = cb;
    },
    set context(newContext) {
      _context = newContext;
    },
  };
})();
