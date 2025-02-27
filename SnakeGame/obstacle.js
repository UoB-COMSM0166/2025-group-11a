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
              rect(o.x, o.y, o.length, 0.5*gridSize);
          } else {
              rect(o.x, o.y, 0.5*gridSize, o.length);
          }
      }
      pop();
  }
}
