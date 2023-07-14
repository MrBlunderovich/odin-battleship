const { defaultShips, sortShips } = require("./utilities.js");
const {
  checkCompliance,
  composeShipCoordinates,
} = require("./ship_placement.js");

test("Empty", () => {
  expect(composeShipCoordinates([])).toBe(null);
});

test("Valid", () => {
  const testInput = [
    "a1",
    "c1",
    "e1",
    "j1",
    "c2",
    "e2",
    "j2",
    "a3",
    "c3",
    "e3",
    "j3",
    "j4",
    "a5",
    "a7",
    "a9",
    "c9",
    "e9",
    "a10",
    "c10",
    "e10",
  ];
  const expectedOutput = [
    ["a1", "a1"],
    ["a3", "a3"],
    ["a5", "a5"],
    ["a7", "a7"],
    ["a9", "a10"],
    ["c1", "c3"],
    ["c9", "c10"],
    ["e1", "e3"],
    ["e9", "e10"],
    ["j1", "j4"],
  ];
  const output = sortShips(composeShipCoordinates(testInput));

  expect(JSON.stringify(output)).toBe(JSON.stringify(expectedOutput));
});
