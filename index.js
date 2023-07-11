import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { View } from "./view.js";

const boards = [];
const players = [];
let winner = null;
let playersMove = null;
let AIautoplay = false;

function newGame(auto = false) {
  winner = "0";
  if (auto) {
    AIautoplay = true;
  } else {
    AIautoplay = false;
  }
  boards.length = 0;
  players.length = 0;
  boards.push(Gameboard(), Gameboard());
  players.push(Player("human", boards[0]), Player("machine", boards[1]));
  winner = null;
  players.forEach((player) => player.populateBoard("default"));
  View.createBoards();
  View.render(boards);
  View.newGameCB = newGame;
  loop();
}

async function loop() {
  playersMove = AIautoplay ? false : true;
  while (!winner) {
    if (playersMove) {
      const move = await new Promise((resolve, reject) => {
        View.movePromiseCallbacks = { resolve, reject };
      });
      console.log("move", move);
      if (move === "restart") {
        newGame();
        break;
      }
      const success = players[1].board.receiveAttack(move);
      if (success) {
        playersMove = false;
      } //playersMove will be toggled back
      if (players[1].board.areAllSunk()) {
        winner = "player";
      }
    } else {
      const markedSquares = players[0].board.markedSquares();
      const move = await players[1].makeMove(markedSquares);
      console.log("AI shoots: ", move);
      const success = players[0].board.receiveAttack(move);
      if (success) {
        playersMove = true;
      }
      if (players[0].board.areAllSunk()) {
        winner = "opponent";
      }
    }
    playersMove = AIautoplay ? playersMove : !playersMove;
    View.render(boards);
  }
  console.log(winner + " wins");
}

newGame();
