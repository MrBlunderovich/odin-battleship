const { Ship } = require("./index.js");

test("Ship FF returns an object we expect", () => {
  const newShip = Ship(3);
  expect(newShip.shipLength).toBe(3);
  expect(newShip.isSunk).toBe(false);
});

test("Ship sinks properly", () => {
  const newShip = Ship(3);
  expect(newShip.isSunk).toBe(false);
  newShip.hit();
  expect(newShip.isSunk).toBe(false);
  newShip.hit();
  expect(newShip.isSunk).toBe(false);
  newShip.hit();
  expect(newShip.isSunk).toBe(true);
});
