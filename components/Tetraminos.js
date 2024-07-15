const BLOCKS = {
  I: [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  L: [
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0]
  ],
  O: [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ],
  S: [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0]
  ],
  Z: [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
};

const COLORS = {
  0: "cyan",
  1: "orange",
  2: "blue",
  3: "yellow",
  4: "green",
  5: "red",
  6: "purple",
};

class Shapes {
  constructor(context) {
    this.context = context;
    //this.color = 'blue';  
    
    this.tetraminos = BLOCKS;

    // Starting position.  
    this.x = 3;  
    this.y = 0;  
    this.randomShape = this.getRandomShape();
  }

  // UPDATED FUNCTION FOR RANDOM BLOCKS AND COLORS (DELETE COMMENT)
  draw() {
    this.context.fillStyle = this.color;
    this.randomShape.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillRect(this.x + x, this.y + y, 1, 1);
          board.setValue(this.x + x, this.y + y, value, this.randomShape.color);
        }
      });
    });
  }

  clear() {
    this.randomShape.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          board.setValue(this.x + x, this.y + y, 0, "black");
        }
      });
    });
  }
  
  move(b) {
    this.x = b.x;
    this.y = b.y;
  }
  // Returns general shape based off of key.
  // This is here for testing and not currently used.
  getShape(key) {
    return this.tetraminos[key];
  }

  // Returns random shape array
  // Object.keys(BLOCKS) returns the array of the KEYS in BLOCKS i.e., "I", "O", "S"
  getRandomShape() {
    let keys = Object.keys(BLOCKS);
    let randomKey = keys[Math.floor(Math.random() * keys.length)];
    let randomColor = COLORS[keys.indexOf(randomKey)];
    return {
     shape: BLOCKS[randomKey],
     color: randomColor
    };
  }
};