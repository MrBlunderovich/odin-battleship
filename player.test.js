const { Player, frontAndBack } = require("./player.js");
const { allSquares } = require("./square.js");
const { Gameboard } = require("./gameboard.js");
const Square = require("./square.js").default;

let spy;
beforeEach(() => {
  spy = jest.spyOn(console, "error").mockImplementation(() => null);
  spy = jest.spyOn(console, "warn").mockImplementation(() => null);
});
afterEach(() => {
  spy.mockRestore();
});

test("Player can populate his gameboard with ships", () => {
  const player = Player("machine", Gameboard());
  player.populateBoard();
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
