const { Player } = require("./player.js");
const { allSquares } = require("./utilities.js");
const { Gameboard } = require("./gameboard.js");

test("AI makes move", async () => {
  const allSquaresButD6 = allSquares().filter((item) => item !== "d6");
  const player = Player("machine");
  //expect(player.makeMove()).toBeTruthy();
  function markedSquares() {
    return allSquaresButD6;
  }
  const opponentsBoard = {
    markedSquares,
    goodShots: [],
  };
  expect(await player.makeMove(opponentsBoard)).toBe("d6");
});

test("Player can populate his gameboard with ships", () => {
  const player = Player("human", Gameboard());
  player.populateBoard("default");
  expect(player.board.ships.length).toBe(10);
});
