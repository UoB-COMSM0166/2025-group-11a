class ObstacleManager {
    constructor() {
      this.obstacles = [];
    }
  
    generateObstacle(count = 1) {
      for (let i = 0; i < count; i++) {
        this.obstacles.push(createVector(
            random(-width * 1, width * 1),
            random(-height * 1, height * 1)
        ));
      }
    }
  
    drawObstacles() {
      push();
      fill(255, 0, 0);
      for (let o of this.obstacles) {
        triangle(
          o.x - gridSize * 0.4, o.y + gridSize * 0.4,  // 左下角
          o.x + gridSize * 0.4, o.y + gridSize * 0.4,  // 右下角
          o.x, o.y - gridSize * 0.4                    // 顶点
        );
      }
      pop();
    }
  }
  
