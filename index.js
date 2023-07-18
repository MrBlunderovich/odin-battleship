import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { View } from "./view.js";

const context = {
  boards: [],
  players: [],
  winner: null,
  humansMove: null,
  AIautoplay: false,
  newGameCallback: newGame,
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
  const AIDelay = context.AIautoplay ? 50 : 500;
  let isHumansMove = context.AIautoplay ? false : true;
  while (context.winner === null) {
    const currentPlayer = isHumansMove ? players[0] : players[1];
    const nextPlayer = isHumansMove ? players[1] : players[0];
    let move = undefined;
    try {
      move = await currentPlayer.makeMove(nextPlayer.board, View, AIDelay);
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
      isHumansMove = context.AIautoplay ? isHumansMove : !isHumansMove;
    }

    context.status = nextPlayer.isHuman ? "Your move" : "Computer's move";
    View.render(boards);
  }
  console.log(context.winner.playerDescription + " wins");
  context.status = context.winner.playerDescription + " wins";
  View.render(boards);
}

newGame();
