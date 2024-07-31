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
    let lowestY = 0;
    lowestY = board.lowestY();
    const margin = 0.08;
    // This section draws the drop shadow. I'm sure there is a way to combine the two draw loops to reduce redundancy.
    // NOTE: Draw drop shadow before block in order to prevent the drop shadow from overlapping with the block when touching.
    // Draws ghost notes
    this.context.globalAlpha = 0.8;
    this.context.strokeStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.lineWidth = 0.05;
          this.context.strokeRect(
            this.x + x + margin,
            lowestY + y + margin,
            1 - 2 * margin,
            1 - 2 * margin
          );
        }
      });
    });

    //Draws the tetraminos

    // Resetting the global alpha of the tetraminos that are spawning in
    this.context.globalAlpha = 1;
    this.context.fillStyle = this.color;
    this.context.strokeStyle = "black";
    this.context.lineWidth = 0.025;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.context.fillRect(
            this.x + x + margin,
            this.y + y + margin,
            1 - 2 * margin,
            1 - 2 * margin
          );
          // Adds oputline to the tetraminos, giving it a better look 
          this.context.strokeRect(
            this.x + x + margin + 0.05,
            this.y + y + margin + 0.05,
            1 - 2 * margin - 0.1,
            1 - 2 * margin - 0.1
          );
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
}
