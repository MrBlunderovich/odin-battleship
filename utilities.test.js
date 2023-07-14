const {
  squareNameToCoordinates,
  coordinatesToSquareName,
  checkCompliance,
  defaultShips,
} = require("./utilities.js");

test("Square name and coordinates conversion", () => {
  expect(squareNameToCoordinates("j10")[0]).toBe(9);
  expect(squareNameToCoordinates("j10")[1]).toBe(9);
  expect(squareNameToCoordinates(coordinatesToSquareName([1, 9]))[0]).toBe(1);
  expect(squareNameToCoordinates(coordinatesToSquareName([1, 9]))[1]).toBe(9);
  expect(coordinatesToSquareName(squareNameToCoordinates("d3"))[0]).toBe("d");
});
