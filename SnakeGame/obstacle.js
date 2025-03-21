class ObstacleManager {
  constructor() {
    this.obstacles = [];
  }

  generateObstacle(count = 1) {
    for (let i = 0; i < count; i++) {
      let isHorizontal = random() > 0.4;
      let x = random((-width * 1) + 4*gridSize, (width * 1) - 4*gridSize);
      let y = random((-height * 1) + 4*gridSize, (height * 1) - 4*gridSize);
      let length = floor(random(4, 10)) * gridSize;
      
      // 检查新障碍物是否与已有障碍物重叠
      let newObstacle = { x, y, length, isHorizontal };
      if (!this.isOverlapping(newObstacle)) {
        this.obstacles.push(newObstacle);
      }
    }
  }

  // 检查是否有重叠
  isOverlapping(newObstacle) {
    for (let o of this.obstacles) {
      if (newObstacle.isHorizontal === o.isHorizontal) {
        if (newObstacle.isHorizontal) {
          // 检查横向障碍物重叠
          if (newObstacle.y === o.y && 
            (newObstacle.x < o.x + o.length && newObstacle.x + newObstacle.length > o.x)) {
            return true;
          }
        } else {
          // 检查竖向障碍物重叠
          if (newObstacle.x === o.x && 
            (newObstacle.y < o.y + o.length && newObstacle.y + newObstacle.length > o.y)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  drawObstacles() {
    push();
    fill(255, 0, 0);
    for (let o of this.obstacles) {
      if (o.isHorizontal) {
      //   rect(o.x, o.y, o.length, 0.5*gridSize);
      this.drawHorizontalLadder(o.x, o.y, o.length, 0.5*gridSize);
      } else {
      //   rect(o.x, o.y, 0.5*gridSize, o.length);
      this.drawVerticalLadder(o.x, o.y, 0.5*gridSize, o.length);
      }
    }
    pop();
  }

  // 绘制水平梯子
  drawHorizontalLadder(x, y, width, height) {
  // 梯子两根主横杆
  stroke(210, 180, 140);
  strokeWeight(2);
  line(x, y, x + width, y);
  line(x, y + height, x + width, y + height);
  
  // 梯子横档 - 不要填满整个空间
  let numRungs = floor(width / (gridSize * 0.7)); // 减少横档数量
  let margin = width * 0.1; // 两端留出一些空间
  let rungSpacing = (width - 2 * margin) / (numRungs - 1);
  
  for (let i = 0; i < numRungs; i++) {
    let rungX = x + margin + (i * rungSpacing);
    line(rungX, y, rungX, y + height);
  }
}

// 绘制垂直梯子
drawVerticalLadder(x, y, width, height) {
  // 梯子两根主竖杆
  stroke(210, 180, 140);
  strokeWeight(2);
  line(x, y, x, y + height);
  line(x + width, y, x + width, y + height);
  
  // 梯子横档 - 不要填满整个空间
  let numRungs = floor(height / (gridSize * 0.7)); // 减少横档数量
  let margin = height * 0.1; // 两端留出一些空间
  let rungSpacing = (height - 2 * margin) / (numRungs - 1);
  
  for (let i = 0; i < numRungs; i++) {
    let rungY = y + margin + (i * rungSpacing);
    line(x, rungY, x + width, rungY);
  }
  }

// drawObstacles() {
//   push();
//   stroke(210, 180, 140); // 浅棕色
//   strokeWeight(2);
//   noFill();
//   for (let o of this.obstacles) {
//     if (o.isHorizontal) {
//       this.drawHorizontalSpikes(o.x, o.y, o.length, 0.5 * gridSize);
//     } else {
//       this.drawVerticalSpikes(o.x, o.y, 0.5 * gridSize, o.length);
//     }
//   }
//   pop();
// }

// drawHorizontalSpikes(x, y, width, height) {
//   let spikeCount = Math.floor(width / (gridSize * 0.7));
//   let spikeWidth = width / spikeCount;
//   beginShape();
//   for (let i = 0; i <= spikeCount; i++) {
//     let spikeX = x + i * spikeWidth;
//     let spikeY1 = i % 2 === 0 ? y : y - height;
//     let spikeY2 = i % 2 === 0 ? y + height : y + height * 2;
//     vertex(spikeX, spikeY1);
//     vertex(spikeX, spikeY2);
//   }
//   endShape(CLOSE);
// }

// drawVerticalSpikes(x, y, width, height) {
//   let spikeCount = Math.floor(height / (gridSize * 0.7));
//   let spikeHeight = height / spikeCount;
//   beginShape();
//   for (let i = 0; i <= spikeCount; i++) {
//     let spikeY = y + i * spikeHeight;
//     let spikeX1 = i % 2 === 0 ? x : x - width;
//     let spikeX2 = i % 2 === 0 ? x + width : x + width * 2;
//     vertex(spikeX1, spikeY);
//     vertex(spikeX2, spikeY);
//   }
//   endShape(CLOSE);
// }

// drawObstacles() {
//   push();
//   fill(210, 180, 140); // 浅棕色填充
//   stroke(210, 180, 140);
//   strokeWeight(2);
//   for (let o of this.obstacles) {
//     if (o.isHorizontal) {
//       this.drawHorizontalSpikes(o.x, o.y, o.length, 0.5 * gridSize);
//     } else {
//       this.drawVerticalSpikes(o.x, o.y, 0.5 * gridSize, o.length);
//     }
//   }
//   pop();
// }

// drawHorizontalSpikes(x, y, width, height) {
//   let spikeCount = Math.floor(width / (gridSize * 0.7));
//   let spikeWidth = width / spikeCount;
//   for (let i = 0; i < spikeCount; i++) {
//     let x1 = x + i * spikeWidth;
//     let x2 = x1 + spikeWidth / 2;
//     let x3 = x1 + spikeWidth;
//     let y1 = y;
//     let y2 = y - height;
//     let y3 = y + height * 2;
//     triangle(x1, y1, x2, y2, x3, y1);
//     triangle(x1, y1 + height, x2, y3, x3, y1 + height);
//   }
// }

// drawVerticalSpikes(x, y, width, height) {
//   let spikeCount = Math.floor(height / (gridSize * 0.7));
//   let spikeHeight = height / spikeCount;
//   for (let i = 0; i < spikeCount; i++) {
//     let y1 = y + i * spikeHeight;
//     let y2 = y1 + spikeHeight / 2;
//     let y3 = y1 + spikeHeight;
//     let x1 = x;
//     let x2 = x - width;
//     let x3 = x + width * 2;
//     triangle(x1, y1, x2, y2, x1, y3);
//     triangle(x1 + width, y1, x3, y2, x1 + width, y3);
//   }
// }


}




