class Snake {
  constructor(x = 0, y = 0, initialSize = 5, bodyColor = [50, 200, 50]) {
    this.body = [];
    this.direction = createVector(1, 0); 
    this.speed = snakeSpeed;
    this.bodyColor = bodyColor;
    this.pendingSegments = 0; 
    this.alternateColor = [
      this.bodyColor[0] - 30,
      this.bodyColor[1] - 30,
      this.bodyColor[2] - 30
    ]; 

    for (let i = 0; i < initialSize; i++) {
      this.body.push(createVector(x - i * gridSize, y));
    }
  }

  draw() {
    push();
    noStroke();

  for (let i = this.body.length - 1; i >= 0; i--) {
    let seg = this.body[i];
    if (i === 0) {
      // head
      fill(this.bodyColor[0] - 20, this.bodyColor[1] - 20, this.bodyColor[2] - 20);
      ellipse(seg.x, seg.y, gridSize * 1.3);

      // eye
      let eyeOffsetX = (gridSize * 0.3) * this.direction.y;
      let eyeOffsetY = (gridSize * 0.3) * -this.direction.x;

      let eyeX1 = seg.x + eyeOffsetX;
      let eyeY1 = seg.y + eyeOffsetY;
      let eyeX2 = seg.x - eyeOffsetX;
      let eyeY2 = seg.y - eyeOffsetY;

      let eyeSize = gridSize * 0.4;  
      let pupilSize = gridSize * 0.3; 

      fill(255);
      ellipse(eyeX1, eyeY1, eyeSize);
      ellipse(eyeX2, eyeY2, eyeSize);

      fill(0);
      ellipse(eyeX1, eyeY1, pupilSize);
      ellipse(eyeX2, eyeY2, pupilSize);
    } else {
      // body
      if (i % 2 === 0) {
        fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
      } else {
        fill(this.alternateColor[0], this.alternateColor[1], this.alternateColor[2]);
      }
      ellipse(seg.x, seg.y, gridSize * 1.2);
    }
  }
  pop();
}

  move() {
    let head = this.body[0].copy();
    head.add(p5.Vector.mult(this.direction, this.speed));

    this.body.unshift(head);

    if (this.pendingSegments > 0) {
      this.pendingSegments--;
    } else {
      this.body.pop();
    }
  }

  grow(count = 1) {
    this.pendingSegments += count;
  }

  checkBoundaryCollision(isAI = false) {
    let head = this.body[0];
    let boundary = {
      xMin: -width * mapSize / 2,
      xMax: width * mapSize / 2,
      yMin: -height * mapSize / 2,
      yMax: height * mapSize / 2
    };

    if (head.x < boundary.xMin || head.x > boundary.xMax ||
        head.y < boundary.yMin || head.y > boundary.yMax) {
      if (!isAI) {
        drawPulsingWarning();
      }
      return true;
    }
    return false;
  }
}
 