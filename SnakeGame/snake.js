//初始
// class Snake {
//   constructor(x = 0, y = 0, initialSize = 5, bodyColor = [50, 200, 50]) {
//     this.body = [];
//     this.direction = createVector(1, 0);
//     this.speed = snakeSpeed;
//     this.bodyColor = bodyColor;
    
//     // 初始化蛇身体
//     for (let i = 0; i < initialSize; i++) {
//       this.body.push(createVector(x - i * gridSize, y));
//     }
//   }


//   draw() {
//     push();
//     stroke(255);
//     strokeWeight(1);
//     // 绘制蛇身 
//     fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
    
//     for (let i = 0; i < this.body.length; i++) {
//       let seg = this.body[i];
//       if (i === 0) {
//         // 蛇头
//         fill(this.bodyColor[0] - 20, this.bodyColor[1] - 20, this.bodyColor[2] - 20);
//         ellipse(seg.x, seg.y, gridSize * 1.3);
//       } else {
//         // 蛇身
//         fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
//         ellipse(seg.x, seg.y, gridSize * 1.2);
//       }
//     }
//     pop();
//   }

//   move() {
//     let head = this.body[0].copy();
//     head.add(p5.Vector.mult(this.direction, this.speed));
//     this.body.unshift(head);
//     this.body.pop();
//   }

//   grow(count = 1) {
//     for (let i = 0; i < count; i++) {
//       if (this.body.length > 0) {
//         this.body.push(this.body[this.body.length - 1].copy());
//       }
//     }
//   }

class Snake {
  constructor(x = 0, y = 0, initialSize = 5, bodyColor = [50, 200, 50]) {
    this.body = [];
    this.direction = createVector(1, 0); // 初始方向向右
    this.speed = snakeSpeed;
    this.bodyColor = bodyColor;
    this.pendingSegments = 0; // 待添加的节数
    this.alternateColor = [
      this.bodyColor[0] - 30, 
      this.bodyColor[1] - 30, 
      this.bodyColor[2] - 30
    ]; // 创建一个相似但略深的颜色用于交替

    // 初始化蛇身体
    for (let i = 0; i < initialSize; i++) {
      this.body.push(createVector(x - i * gridSize, y));
    }
  }

  draw() {
    push();
    // stroke(255);
    // strokeWeight(1);
    noStroke();

  for (let i = this.body.length - 1; i >= 0; i--) {
    let seg = this.body[i];
    if (i === 0) {
      // 蛇头
      fill(this.bodyColor[0] - 20, this.bodyColor[1] - 20, this.bodyColor[2] - 20);
      ellipse(seg.x, seg.y, gridSize * 1.3);

      // 计算眼睛的位置
      let eyeOffsetX = (gridSize * 0.3) * this.direction.y; 
      let eyeOffsetY = (gridSize * 0.3) * -this.direction.x; 

      let eyeX1 = seg.x + eyeOffsetX;
      let eyeY1 = seg.y + eyeOffsetY;
      let eyeX2 = seg.x - eyeOffsetX;
      let eyeY2 = seg.y - eyeOffsetY;

      let eyeSize = gridSize * 0.4;  // 眼睛大小
      let pupilSize = gridSize * 0.3; // 瞳孔大小

      fill(255); 
      ellipse(eyeX1, eyeY1, eyeSize);
      ellipse(eyeX2, eyeY2, eyeSize);

      fill(0); 
      ellipse(eyeX1, eyeY1, pupilSize);
      ellipse(eyeX2, eyeY2, pupilSize);
    } else {
      // 蛇身
      // fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2]);
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
    // 计算新的头部位置
    let head = this.body[0].copy();
    head.add(p5.Vector.mult(this.direction, this.speed));

    // 将新头部添加到身体前面
    this.body.unshift(head);

    // 如果有待添加的节，则不移除尾部
    if (this.pendingSegments > 0) {
      this.pendingSegments--; // 减少待添加的节数
    } else {
      // 否则移除尾部
      this.body.pop();
    }
  }

  grow(count = 1) {
    // 将新增的节数添加到待添加队列
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





