class GameMap {
  constructor(gridSize, mapSize, borderSize) {
    this.gridSize = gridSize;
    this.mapSize = mapSize;  
    this.borderSize = borderSize; 
    this.visibleRange = 2;    
    this.swampManager = new SwampManager();
    this.desertManager = new DesertManager();
    this.teleportManager = new TeleportManager();
  }

  drawBoundary() {
    // push();
    // // let gameBoundary = {
    // //   x: -width * this.mapSize / 2,
    // //   y: -height * this.mapSize / 2,
    // //   w: width * this.mapSize,
    // //   h: height * this.mapSize
    // // };

    // noFill();
    
    // pop();
    push();
    noStroke();
    fill(30);  // 地图区域灰色

    // 计算地图边界范围
    const mapX = -width * this.mapSize / 2;
    const mapY = -height * this.mapSize / 2;
    const mapW = width * this.mapSize;
    const mapH = height * this.mapSize;

    rect(mapX, mapY, mapW, mapH);
    pop();
  }

  drawFixedGrid() {
    background(30); // 整体背景为灰色
    

    // push();
    // stroke(255, 0); // 白色半透明网格线
    // strokeWeight(1);

    // // 计算整个地图范围的网格
    // let startX = floor(-width * this.mapSize / 2 / this.gridSize) * this.gridSize;
    // let startY = floor(-height * this.mapSize / 2 / this.gridSize) * this.gridSize;
    // let endX = ceil(width * this.mapSize / 2 / this.gridSize) * this.gridSize;
    // let endY = ceil(height * this.mapSize / 2 / this.gridSize) * this.gridSize;

    // // 移动原点，使网格从左上角绘制
    // translate(0, 0);

    // // 绘制水平网格线
    // for (let y = startY; y <= endY; y += this.gridSize) {
    //   for (let x = startX; x <= endX; x += this.gridSize) {
    //     // 为每个格子选择随机颜色
    //     let col = color(30);
    //     fill(col);
    //     noStroke();
    //     rect(x, y, this.gridSize, this.gridSize);  // 绘制填充的网格
    //   }
    // }

    // // 绘制垂直网格线
    // for (let x = startX; x <= endX; x += this.gridSize) {
    //   line(x, startY, x, endY);
    // }

    // pop();
  }


  generateSwamps() {
    this.swampManager.generateSwamps(difficultyMode === 'hard' ? 8 : 5);
  }

  drawSwamps() {
    this.swampManager.drawSwamps();
  }

  generateDeserts() {
    this.desertManager.generateDeserts(difficultyMode === 'hard' ? 8 : 5);
  }

  drawDeserts() {
    this.desertManager.drawDeserts();
  }

  generateTeleports() {
    this.teleportManager.generateTeleports(difficultyMode === 'hard' ? 6 : 4);
  }

  drawTeleports() {
    this.teleportManager.drawTeleports();
  }
}
