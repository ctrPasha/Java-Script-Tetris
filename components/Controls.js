// Arrow key values
const KEY = {
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};
Object.freeze(KEY);

// WASD values
const KEY2 = {
  SPACE: 32,
  LEFT: 65,
  UP: 87,
  RIGHT: 68,
  DOWN: 83,
};
Object.freeze(KEY2);


/* 
To recieve the new state from the changed coordinates we use a spread operator ex: (...)
The arrow function spreads the old coordinates to a new object and at the same time changes the x or y coordinate
to return the new positiion
*/
const keyMoves = {
  [KEY.LEFT]: (b) => ({ ...b, x: b.x - 1 }),
  [KEY.RIGHT]: (b) => ({ ...b, x: b.x + 1 }),
  [KEY.DOWN]: (b) => ({ ...b, y: b.y + 1 }),
  [KEY.UP]: (b) => board.rotate(b),
  [KEY.SPACE]: (b) => ({ ...b, y: b.y + 1 }),

  // WASD 
  [KEY2.LEFT]: (b) => ({ ...b, x: b.x - 1 }),
  [KEY2.RIGHT]: (b) => ({ ...b, x: b.x + 1 }),
  [KEY2.DOWN]: (b) => ({ ...b, y: b.y + 1 }),
  [KEY2.UP]: (b) => board.rotate(b),
  [KEY2.SPACE]: (b) => ({ ...b, y: b.y + 1 })
};

const handleKeyPress = (event) => {
  if (keyMoves[event.keyCode]) {
    let b = keyMoves[event.keyCode](board.piece);

    if (event.keyCode === KEY.SPACE) {
      // Hard drop
      while (board.valid(b)) {
        board.piece.move(b);
        b = keyMoves[KEY.SPACE](board.piece);
      }
    }

    if (board.valid(b)) {
      board.piece.move(b);
      board.piece.draw();
    }
  }
};

const addingEventListener = () => {
  document.removeEventListener("keydown", handleKeyPress);
  document.addEventListener("keydown", handleKeyPress);
};

addingEventListener();