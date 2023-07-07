const { Ship } = require("./ship.js");

test("Ship refuses incorrect coordinates", () => {
  expect(() => Ship(["a1", "a10"])).toThrow();
  expect(() => Ship(["a1", "f1"])).toThrow();
  expect(() => Ship(["a1", "b3"])).toThrow();
  expect(() => Ship(["a0", "a1"])).toThrow();
});

test("Ship exposes occupied squares", () => {
  const newShip = Ship(["a1", "a3"]);
  expect(newShip.squares[0]).toBe("a1");
  expect(newShip.squares[1]).toBe("a2");
  expect(newShip.squares[2]).toBe("a3");
  expect(newShip.squares[3]).toBe(undefined);
});

test("Ship gets hits and sinks properly", () => {
  const newShip = Ship(["a1", "a3"]);
  expect(newShip.isSunk).toBe(false);
  newShip.hit();
  expect(newShip.isSunk).toBe(false);
  newShip.hit();
  expect(newShip.isSunk).toBe(false);
  newShip.hit();
  expect(newShip.isSunk).toBe(true);
});
