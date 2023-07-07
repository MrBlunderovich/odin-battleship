const { Gameboard } = require("./gameboard.js");

const defaultShips = [
  ["a1", "a1"],
  ["a3", "a3"],
  ["a5", "a5"],
  ["a7", "a7"],
  ["a9", "a10"],
  ["c9", "c10"],
  ["d9", "d10"],
  ["c1", "c3"],
  ["e1", "e3"],
  ["j1", "j4"],
];

/* test("Gameboard ship placement", () => {
  const newBoard = Gameboard();
  expect(newBoard.ships.length).toBe(0);
  newBoard.addShips(defaultShips);
  expect(newBoard.ships.length).toBe(10);
}); */

test("Gameboard receive attacks", () => {
  const newBoard = Gameboard();
  expect(newBoard.hits[0]).toBe(undefined);
  newBoard.receiveAttack("a1");
  expect(newBoard.hits[0]).toBe("a1");
  expect(newBoard.hits[1]).toBe(undefined);
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
