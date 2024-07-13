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
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
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


class Shapes {
  constructor(context) {
    this.context = context;
    this.color = 'blue';  
    this.block = [  
      [1, 0, 0],   
      [1, 1, 1],   
      [0, 0, 0]  
    ];
    this.tetraminos = BLOCKS;
    // Starting position.  
    this.x = 3;  
    this.y = 0;  
  }

  draw() {
    this.context.fillStyle = this.color;
    this.block.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillRect(this.x + x, this.y + y, 1, 1);
          board.setValue(this.x + x, this.y + y, value, this.color);
        }
      })
    });
  }

  getShape(key) {
    return this.tetraminos[key];
  }
};