const { Gameboard } = require("./gameboard.js");
const { Ship } = require("./ship.js");

let spy;
beforeEach(() => {
  spy = jest.spyOn(console, "error").mockImplementation(() => null);
  spy = jest.spyOn(console, "warn").mockImplementation(() => null);
});
afterEach(() => {
  spy.mockRestore();
});

const defaultShips = [
  ["c1"],
  ["a1"],
  ["a3"],
  ["a5"],
  ["a7", "a8"],
  ["a10", "b10"],
  ["j3", "j2"],
  ["d10", "e10", "f10"],
  ["h10", "i10", "j10"],
  ["j8", "j7", "j6", "j5"],
];
/* 
const shipObjects = defaultShips.map((coords) => Ship(coords)); */

test("Gameboard receives attacks", () => {
  const newBoard = Gameboard();
  newBoard.setShips(defaultShips);
  expect(newBoard.hits[0]).toBe(undefined);
  expect(newBoard.receiveAttack("a1")).toBe(true);
  expect(newBoard.hits[0]).toBe("a1");
  expect(newBoard.hits[1]).toBe(undefined);
});

test("Gameboard marks hits and sunk ships' perimeter squares", () => {
  const newBoard = Gameboard();
  newBoard.setShips(defaultShips);
  expect(newBoard.markedSquareNames.length).toBe(0);
  newBoard.receiveAttack("a1");
  expect(newBoard.markedSquareNames.length).toBe(4);
});

test("Gameboard detect defeat", () => {
  const newBoard = Gameboard();
  expect(newBoard.areAllSunk()).toBe(null);
  newBoard.setShips(defaultShips);
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
