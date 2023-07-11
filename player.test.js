const { Player } = require("./player.js");
const { allSquares } = require("./utilities.js");
const { Gameboard } = require("./gameboard.js");

const allSquaresButD6 = allSquares().filter((item) => item !== "d6");

test("AI makes move", async () => {
  const player = Player("machine");
  //expect(player.makeMove()).toBeTruthy();
  expect(await player.makeMove(allSquaresButD6)).toBe("d6");
});

test("Player can populate his gameboard with ships", () => {
  const player = Player("human", Gameboard());
  player.populateBoard("default");
  expect(player.board.ships.length).toBe(10);
});
