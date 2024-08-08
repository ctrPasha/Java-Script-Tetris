const LINESPERLVL = 10;

// Points depending on how much lines cleared
const SCORE = {
  ONE: 100,
  TWO: 300,
  THREE: 500,
  TETRIS: 800,
  SOFTDROP: 1,
  HARD_DROP: 2,
};

// Levels or speed(ms) of the game depending on the score
const LEVEL = {
  0: 800,
  1: 720,
  2: 633,
  3: 550,
  4: 470,
  5: 390,
  6: 300,
  7: 220,
  8: 135,
  9: 120,
  10: 100,
  11: 100,
  12: 85,
  13: 85,
  14: 85,
  15: 70,
  16: 70,
  17: 70,
  18: 50,
  19: 50,
  20: 50,
  21: 50,
  22: 50,
  23: 50,
  24: 35,
  25: 35,
  26: 35,
  27: 35,
  28: 35,
  29: 35,
  30: 20,
};

let gameStats = {
  score: 0,
  level: 0,
  lines: 0,
};

const updateGameStats = (key, value) => {
  // Retrives HTML content with the id that will match the key. for example: score, lines, level
  let update = document.getElementById(key);

  // If the element exists, it updates the textContent of the key with the new value
  if (update) {
    update.textContent = value;
  }
};

/*
gameStats gets proxied
it then updates the key of the target with a new value
*/

let userStats = new Proxy(gameStats, {
  set: (target, key, value) => {
    target[key] = value;
    updateGameStats(key, value);
    // Returns true if it was successful
    return true;
  },
});
