const { Ship, names, isSquareSequenceConsecutive } = require("./ship.js");
const Square = require("./square.js").default;

xtest("Ship refuses incorrect coordinates", () => {
  expect(() => Ship(["a1", "a10"])).toThrow();
  expect(() => Ship(["a1", "f1"])).toThrow();
  expect(() => Ship(["a1", "b3"])).toThrow();
  expect(() => Ship(["a0", "a1"])).toThrow();
});

test("Ship gets hits and sinks properly", () => {
  const newShip = Ship(["a1", "a2", "a3"]);
  expect(newShip.isSunk()).toBe(false);
  newShip.hit();
  expect(newShip.isSunk()).toBe(false);
  newShip.hit();
  expect(newShip.isSunk()).toBe(false);
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});

test("Area around ship", () => {
  const newShip = Ship(["a1", "a2", "a3"]);
  expect(names(newShip.perimeter)).toContain("b1");
  expect(names(newShip.perimeter)).toContain("b2");
  expect(names(newShip.perimeter)).toContain("b3");
  expect(names(newShip.perimeter)).toContain("b4");
  expect(names(newShip.perimeter)).toContain("a4");
  expect(names(newShip.perimeter)).not.toContain("a5");
  expect(names(newShip.perimeter)).not.toContain("a2");
});

test("Consequtivity", () => {
  expect(
    isSquareSequenceConsecutive([
      Square("a1"),
      Square("a2"),
      Square("a3"),
      Square("a4"),
    ])
  ).toBe(true);
  expect(
    isSquareSequenceConsecutive([Square("a1"), Square("a2"), Square("a4")])
  ).toBe(false);
  expect(isSquareSequenceConsecutive([Square("a1")])).toBe(true);
});
