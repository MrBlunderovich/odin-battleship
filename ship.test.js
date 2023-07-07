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
  const newerShip = Ship(["b3", "e3"]);
  expect(newerShip.squares[0]).toBe("b3");
  expect(newerShip.squares[1]).toBe("c3");
  expect(newerShip.squares[2]).toBe("d3");
  expect(newerShip.squares[3]).toBe("e3");
  expect(newerShip.squares[4]).toBe(undefined);
  const newestShip = Ship(["j10", "j10"]);
  expect(newestShip.squares[0]).toBe("j10");
  expect(newestShip.squares[1]).toBe(undefined);
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
