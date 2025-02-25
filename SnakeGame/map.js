class GameMap {
  constructor(gridSize, mapSize, borderSize) {
    this.gridSize = gridSize;   // 网格大小
    this.mapSize = mapSize;     // 地图大小（碰撞边界）
    this.borderSize = borderSize; // 可见边界大小
    this.visibleRange = 2;      // 可见网格范围倍数
  }

  drawGrid() {
    push();
    stroke(255, 50); // 白色半透明网格线
    strokeWeight(1);

    let startX = -width * this.visibleRange - (width / 2 % this.gridSize);
    let startY = -height * this.visibleRange - (height / 2 % this.gridSize);

    // 绘制水平网格线
    for (let y = startY; y < height * this.visibleRange; y += this.gridSize) {
      line(-width * this.visibleRange, y, width * this.visibleRange, y);
    }

    // 绘制垂直网格线
    for (let x = startX; x < width * this.visibleRange; x += this.gridSize) {
      line(x, -height * this.visibleRange, x, height * this.visibleRange);
    }

    pop();
  }

  drawBoundary() {
    push();
    // 计算实际游戏边界（碰撞边界）
    let gameBoundary = {
      x: -width * this.mapSize / 2,
      y: -height * this.mapSize / 2,
      w: width * this.mapSize,
      h: height * this.mapSize
    };

    // 计算可见边界（比游戏边界稍大）
    let visibleBoundary = {
      x: -width * this.borderSize / 2,
      y: -height * this.borderSize / 2,
      w: width * this.borderSize,
      h: height * this.borderSize
    };

    // 绘制白色可见边界
    // GameMap.stroke(255);
    stroke(255);
    strokeWeight(2);
    noFill();
    // strokeWeight(4);
    rect(gameBoundary.x, gameBoundary.y, gameBoundary.w, gameBoundary.h);
    pop();
  }

  // 绘制固定网格，不随蛇移动
  drawFixedGrid() {
    push();
    stroke(255, 30); // 白色半透明网格线
    strokeWeight(1);
    
    // 计算屏幕上可见的网格
    let startX = floor(-width / 2 / gridSize) * gridSize;
    let startY = floor(-height / 2 / gridSize) * gridSize;
    let endX = ceil(width / 2 / gridSize) * gridSize;
    let endY = ceil(height / 2 / gridSize) * gridSize;
    
    // 将画布原点移到屏幕中心
    translate(width / 2, height / 2);
    
    // 绘制水平网格线
    for (let y = startY; y <= endY; y += gridSize) {
      line(startX, y, endX, y);
    }
    
    // 绘制垂直网格线
    for (let x = startX; x <= endX; x += gridSize) {
      line(x, startY, x, endY);
    }
    pop();
  }
}

