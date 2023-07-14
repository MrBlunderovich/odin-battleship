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
  //View.newGameCB = positionShips;
  loop();
}

/* function positionShips() {
  console.log("position ships");
} */

async function loop() {
  playersMove = AIautoplay ? false : true;
  while (!winner) {
    const currentPlayer = playersMove ? players[0] : players[1];
    const nextPlayer = playersMove ? players[1] : players[0];
    let move = undefined;
    try {
      move = await currentPlayer.makeMove(nextPlayer.board, View);
    } catch (error) {
      console.error(error);
      break;
    }
    console.log("Move: ", move);
    const shotIsSuccessful = nextPlayer.board.receiveAttack(move);

    if (nextPlayer.board.areAllSunk()) {
      winner = currentPlayer;
    }
    if (!shotIsSuccessful) {
      playersMove = AIautoplay ? playersMove : !playersMove;
    }

    View.setStatus(
      nextPlayer.playerDescription === "human" ? "Your move" : "Computer's move"
    );
    View.render(boards);
  }
  console.log(winner.playerDescription + " wins");
  View.setStatus(winner.playerDescription + " wins");
  View.render(boards);
}

newGame();
