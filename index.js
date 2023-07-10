import { Gameboard } from "./gameboard";
import { Ship } from "./ship";
import { Player } from "./player";

const boards = [];
const players = [];
let winner = undefined;

function newGame() {
  boards.push(Gameboard(), Gameboard());
  players.push(Player("human", boards[0]), Player("machine", boards[1]));
  winner = null;
  players.forEach((player) => player.populateBoard(true));
  render();
}
