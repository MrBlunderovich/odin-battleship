const Square = require("./square.js").default;
const {
  checkIfOnBoard,
  squareNameToCoordinates,
  coordinatesToSquareName,
  allSquares,
} = require("./square.js");

let spy;
beforeEach(() => {
  spy = jest.spyOn(console, "error").mockImplementation(() => null);
  spy = jest.spyOn(console, "warn").mockImplementation(() => null);
});
afterEach(() => {
  spy.mockRestore();
});

test("Square from name", () => {
  expect(Square("j10").name).toBe("j10");
  expect(Square("j10").x).toBe(9);
  expect(Square("j10").y).toBe(9);
  expect(Square("a1").name).toBe("a1");
  expect(Square("a1").x).toBe(0);
  expect(Square("a1").y).toBe(0);
});

test("Square from coordinates", () => {
  expect(Square([9, 9]).name).toBe("j10");
  expect(Square([9, 9]).x).toBe(9);
  expect(Square([9, 9]).y).toBe(9);
  expect(Square([0, 0]).name).toBe("a1");
  expect(Square([0, 0]).x).toBe(0);
  expect(Square([0, 0]).y).toBe(0);
});

test("Bad input", () => {
  expect(Square([10, 9])).toBe(null);
  expect(Square([9, 9, 9])).toBe(null);
  expect(Square([1])).toBe(null);
  expect(Square("a11")).toBe(null);
  expect(Square("aa1")).toBe(null);
  expect(Square("a")).toBe(null);
  expect(Square("1")).toBe(null);
  expect(Square("[1, 1]")).toBe(null);
});

test("Adjacent", () => {
  const arrayOfAdjacentSquares = Square("a1").adjacent;
  const names = arrayOfAdjacentSquares.map((s) => s.name);
  expect(names.includes("a2")).toBe(true);
  expect(names.includes("b1")).toBe(true);
  expect(names.includes("b2")).toBe(false);
});

test("Perimeter", () => {
  const arrayOfPerimeterSquares = Square("a1").perimeter;
  const names = arrayOfPerimeterSquares.map((s) => s.name);
  expect(names.includes("a2")).toBe(true);
  expect(names.includes("b1")).toBe(true);
  expect(names.includes("b2")).toBe(true);
  expect(names.includes("b3")).toBe(false);
});

test("Square name and coordinates conversion", () => {
  expect(squareNameToCoordinates("j10")[0]).toBe(9);
  expect(squareNameToCoordinates("j10")[1]).toBe(9);
  expect(squareNameToCoordinates(coordinatesToSquareName([1, 9]))[0]).toBe(1);
  expect(squareNameToCoordinates(coordinatesToSquareName([1, 9]))[1]).toBe(9);
  expect(coordinatesToSquareName(squareNameToCoordinates("d3"))[0]).toBe("d");
  expect(squareNameToCoordinates("k3")).toBe(null);
  expect(coordinatesToSquareName([10, 1])).toBe(null);
});

test("Onboard check", () => {
  expect(checkIfOnBoard([1, 1])).toBe(true);
  expect(checkIfOnBoard([10, 1])).toBe(false);
  expect(checkIfOnBoard([1, 1, 1])).toBe(false);
});

test("Sum", () => {
  expect(Square([9, 9]).sum).toBe(18);
});

test("All squares", () => {
  expect(Array.isArray(allSquares())).toBe(true);
  expect(allSquares().length).toBe(100);
});
