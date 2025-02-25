class Snake {
  constructor(x = 0, y = 0, initialSize = 5, bodyColor = [50, 200, 50]) {
    this.body = [];
    this.direction = createVector(1, 0);
    this.speed = snakeSpeed;
    this.bodyColor = bodyColor;
    
    // 初始化蛇身体
    for (let i = 0; i < initialSize; i++) {
      this.body.push(createVector(x - i * gridSize, y));
    }
  }

  draw() {
    push();
    stroke(255);
    strokeWeight(1);
    // 绘制蛇身 
    fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
    
    for (let i = 0; i < this.body.length; i++) {
      let seg = this.body[i];
      if (i === 0) {
        // 蛇头
        fill(this.bodyColor[0] - 20, this.bodyColor[1] - 20, this.bodyColor[2] - 20);
        ellipse(seg.x, seg.y, gridSize * 1.3);
      } else {
        // 蛇身
        fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
        ellipse(seg.x, seg.y, gridSize * 1.2);
      }
    }
    pop();
  }

  move() {
    let head = this.body[0].copy();
    head.add(p5.Vector.mult(this.direction, this.speed));
    this.body.unshift(head);
    this.body.pop();
  }

  grow(count = 1) {
    for (let i = 0; i < count; i++) {
      if (this.body.length > 0) {
        this.body.push(this.body[this.body.length - 1].copy());
      }
    }
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





