import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { View } from "./view.js";

const context = {
  boards: [],
  players: [],
  winner: null,
  humansMove: null,
  AIautoplay: false,
  newGameCallBack: newGame,
  moveCallBack: null,
  status: "Ready to start",
};

const boards = context.boards;
const players = context.players;
/* let winner = null;
let playersMove = null;
let AIautoplay = false; */

function newGame(auto = false) {
  context.winner = "0";
  if (auto) {
    context.AIautoplay = true;
  } else {
    context.AIautoplay = false;
  }
  boards.length = 0;
  players.length = 0;
  boards.push(Gameboard(), Gameboard());
  players.push(Player("human", boards[0]), Player("machine", boards[1]));
  context.winner = null;
  players.forEach((player) => player.populateBoard("default"));
  View.createBoards();
  View.render(boards);
  //View.newGameCB = newGame;
  View.context = context;
  //View.newGameCB = positionShips;
  loop();
}

/* function positionShips() {
  console.log("position ships");
} */

async function loop() {
  context.playersMove = AIautoplay ? false : true;
  while (!context.winner) {
    const currentPlayer = context.playersMove ? players[0] : players[1];
    const nextPlayer = context.playersMove ? players[1] : players[0];
    let move = undefined;
    try {
      move = await currentPlayer.makeMove(nextPlayer.board, View);
    } catch (error) {
      console.warn("move failure");
      console.error(error);
      break;
    }
    console.log("Move: ", move);
    const shotIsSuccessful = nextPlayer.board.receiveAttack(move);

    if (nextPlayer.board.areAllSunk()) {
      context.winner = currentPlayer;
    }
    if (!shotIsSuccessful) {
      playersMove = AIautoplay ? playersMove : !playersMove;
    }

    context.status = nextPlayer.isHuman ? "Your move" : "Computer's move";
    View.render(boards);
  }
  console.log(winner.playerDescription + " wins");
  context.status = winner.playerDescription + " wins";
  View.render(boards);
}

newGame();
