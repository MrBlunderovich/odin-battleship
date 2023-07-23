const { Gameboard } = require("./gameboard.js");

let spy;
beforeEach(() => {
  spy = jest.spyOn(console, "error").mockImplementation(() => null);
  spy = jest.spyOn(console, "warn").mockImplementation(() => null);
});
afterEach(() => {
  spy.mockRestore();
});

const defaultShips = [
  ["a1", "a1"],
  ["a3", "a3"],
  ["a5", "a5"],
  ["a7", "a7"],
  ["a9", "a10"],
  ["c9", "c10"],
  ["e9", "e10"],
  ["c1", "c3"],
  ["e1", "e3"],
  ["j1", "j4"],
];

test("Gameboard receive attacks", () => {
  const newBoard = Gameboard();
  newBoard.addShips(defaultShips);
  expect(newBoard.hits[0]).toBe(undefined);
  expect(newBoard.receiveAttack("a1")).toBe(true);
  expect(newBoard.hits[0]).toBe("a1");
  expect(newBoard.hits[1]).toBe(undefined);
});

test("Gameboard marks hits and sunk ships' perimeter squares", () => {
  const newBoard = Gameboard();
  newBoard.addShips(defaultShips);
  expect(newBoard.markedSquares().length).toBe(0);
  newBoard.receiveAttack("a1");
  expect(newBoard.markedSquares().length).toBe(4);
});

test("Gameboard detect defeat", () => {
  const newBoard = Gameboard();
  expect(newBoard.areAllSunk()).toBe(undefined);
  newBoard.addShips(defaultShips);
  expect(newBoard.areAllSunk()).toBe(false);
  newBoard.ships.forEach((ship) => {
    ship.hit();
    ship.hit();
    ship.hit();
  });
  expect(newBoard.areAllSunk()).toBe(false);
  newBoard.ships.forEach((ship) => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
  });
  expect(newBoard.areAllSunk()).toBe(true);
});
