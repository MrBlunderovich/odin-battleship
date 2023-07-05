export function Ship(length) {
  const shipLength = length;
  let timesHit = 0;

  function hit() {
    timesHit += 1;
  }

  return {
    shipLength,
    get isSunk() {
      return timesHit >= shipLength;
    },
    hit,
  };
}
