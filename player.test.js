const { Player, frontAndBack } = require("./player.js");
const { allSquares } = require("./utilities.js");
const { Gameboard } = require("./gameboard.js");
const Square = require("./square.js").default;

xtest("AI makes move", async () => {
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

xtest("Player can populate his gameboard with ships", () => {
  const player = Player("human", Gameboard());
  player.populateBoard("default");
  expect(player.board.ships.length).toBe(10);
});

test("frontAndBack in corner", () => {
  expect(frontAndBack([Square("a1")]).map((s) => s.name)).toContain("a2");
  expect(frontAndBack([Square("a1")]).map((s) => s.name)).toContain("b1");
  expect(frontAndBack([Square("a1")]).map((s) => s.name)).not.toContain("b2");
});

test("frontAndBack at center", () => {
  expect(frontAndBack([Square("b2")]).map((s) => s.name)).toContain("a2");
  expect(frontAndBack([Square("b2")]).map((s) => s.name)).toContain("b1");
  expect(frontAndBack([Square("b2")]).map((s) => s.name)).toContain("c2");
  expect(frontAndBack([Square("b2")]).map((s) => s.name)).toContain("b3");
  expect(frontAndBack([Square("b2")]).map((s) => s.name)).not.toContain("a1");
});

test("frontAndBack two squares", () => {
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).toContain("a2");
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).toContain("d2");
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).not.toContain("b1");
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).not.toContain("b3");
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).not.toContain("c1");
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).not.toContain("c3");
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).not.toContain("a1");
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).not.toContain("a3");
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).not.toContain("d1");
  expect(
    frontAndBack([Square("b2"), Square("c2")]).map((s) => s.name)
  ).not.toContain("d3");
});
