import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { View } from "./view.js";

const boards = [];
const players = [];
let winner = null;
let playersMove = null;

function newGame() {
  boards.push(Gameboard(), Gameboard());
  players.push(Player("human", boards[0]), Player("machine", boards[1]));
  winner = null;
  players.forEach((player) => player.populateBoard("default"));
  View.createBoards();
  View.render(boards);
}

async function loop() {
  playersMove = true;
  while (!winner) {
    if (playersMove) {
      View.isPlayersMove = true;
      const move = await new Promise((resolve, reject) => {
        View.movePromiseCallbacks = { resolve, reject };
      });
      console.log("move", move);
      players[1].board.receiveAttack(move);
      if (players[1].board.areAllSunk()) {
        winner = "player";
      }
    } else {
      const move = await players[1].makeMove();
      players[0].board.receiveAttack(move);
      if (players[0].board.areAllSunk()) {
        winner = "opponent";
      }
    }
    playersMove = !playersMove;
    View.render(boards);
  }
  console.log(winner + "wins");
}

newGame();
loop();
