class ObstacleManager {
  constructor() {
    this.obstacles = [];
  }

  generateObstacle(count = 1) {
    const safeMargin = 4 * gridSize; // 安全边距
    const minLength = 4 * gridSize;  // 最小长度
    const maxLength = 10 * gridSize; // 最大长度
  
    for (let i = 0; i < count; i++) {
      const isHorizontal = random() > 0.4;
      
      // 可用空间计算（考虑障碍物长度）
      const boundary = {
        left: -width * mapSize/2 + safeMargin,
        right: width * mapSize/2 - safeMargin,
        top: -height * mapSize/2 + safeMargin,
        bottom: height * mapSize/2 - safeMargin
      };
  
      // 生成位置和长度（确保完全在边界内）
      let x, y, length;
      
      if (isHorizontal) {
        length = floor(random(4, 10)) * gridSize;
        x = random(
          boundary.left,
          boundary.right - length // 确保x+length不超出右边界
        );
        y = random(boundary.top, boundary.bottom);
      } else {
        length = floor(random(4, 10)) * gridSize;
        x = random(boundary.left, boundary.right);
        y = random(
          boundary.top,
          boundary.bottom - length // 确保y+length不超出下边界
        );
      }
  
      const newObstacle = { x, y, length, isHorizontal };
      
      if (!this.isOverlapping(newObstacle)) {
        this.obstacles.push(newObstacle);
      } else {
        i--; // 重叠则重新生成
      }
    }
  }

  isOverlapping(newObstacle) {
  // 定义障碍物实际占用区域（考虑宽度）
  const getBounds = (obs) => {
    if (obs.isHorizontal) {
      return {
        x1: obs.x,
        y1: obs.y - gridSize/4, // 考虑障碍物高度
        x2: obs.x + obs.length,
        y2: obs.y + gridSize/4
      };
    } else {
      return {
        x1: obs.x - gridSize/4, // 考虑障碍物宽度
        y1: obs.y,
        x2: obs.x + gridSize/4,
        y2: obs.y + obs.length
      };
    }
  };

  // 检查与所有现有障碍物的碰撞
  for (let o of this.obstacles) {
    const a = getBounds(newObstacle);
    const b = getBounds(o);

    // 轴对齐矩形碰撞检测
    if (a.x1 < b.x2 && a.x2 > b.x1 && 
        a.y1 < b.y2 && a.y2 > b.y1) {
      return true;
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
}
