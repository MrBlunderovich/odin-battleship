import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { View } from "./view.js";

const boards = [];
const players = [];
let winner = undefined;

function newGame() {
  boards.push(Gameboard(), Gameboard());
  players.push(Player("human", boards[0]), Player("machine", boards[1]));
  winner = null;
  players.forEach((player) => player.populateBoard("default"));
  //View.clearBoards();
  View.createBoards();
  View.render(boards);
}

newGame();
