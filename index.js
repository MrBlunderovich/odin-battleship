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
    const currentPlayer = playersMove ? players[0] : players[1];
    const nextPlayer = playersMove ? players[1] : players[0];
    //const markedSquares = nextPlayer.board.markedSquares();
    const move = await currentPlayer.makeMove(nextPlayer.board, View);
    console.log("theMove: ", move);
    const shotIsSuccessful = nextPlayer.board.receiveAttack(move);
    if (nextPlayer.board.areAllSunk()) {
      winner = currentPlayer.playerDescription;
    }
    if (!shotIsSuccessful) {
      playersMove = AIautoplay ? playersMove : !playersMove;
    }
    View.render(boards);
  }
  console.log(winner + " wins");
}

newGame();
