class Shapes {
  constructor(context) {
    const type = this.getRandomShape(BLOCKS.length);
    this.context = context;
    this.shape = BLOCKS[type];
    this.color = COLORS[type];
    this.index = type;

    // Starting position.  
    this.x = 3;  
    this.y = 0;  
  }

  // Updates color / grid array with new block.
  // Calls drawGrid() to update board
  draw() {
    this.context.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  move(b) {
    this.x = b.x;
    this.y = b.y;
    this.shape = b.shape;
  }

  // Returns a random number to generate the tetraminos and its respective colors
  getRandomShape(typesOf) {
    return Math.floor(Math.random() * typesOf);
  } 
};