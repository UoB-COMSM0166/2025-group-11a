class GameMap {
  constructor(gridSize, mapSize, borderSize) {
    this.gridSize = gridSize;   // 网格大小
    this.mapSize = mapSize;     // 地图大小（碰撞边界）
    this.borderSize = borderSize; // 可见边界大小
    this.visibleRange = 2;      // 可见网格范围倍数
    this.swampManager = new SwampManager();
  }

  // drawGrid() {
  //   push();
  //   stroke(255, 50); // 白色半透明网格线
  //   strokeWeight(1);

  //   let startX = -width * this.visibleRange - (width / 2 % this.gridSize);
  //   let startY = -height * this.visibleRange - (height / 2 % this.gridSize);

  //   // 绘制水平网格线
  //   for (let y = startY; y < height * this.visibleRange; y += this.gridSize) {
  //     line(-width * this.visibleRange, y, width * this.visibleRange, y);
  //   }

  //   // 绘制垂直网格线
  //   for (let x = startX; x < width * this.visibleRange; x += this.gridSize) {
  //     line(x, -height * this.visibleRange, x, height * this.visibleRange);
  //   }

  //   pop();
  // }

  drawBoundary() {
    push();
    // 计算实际游戏边界（碰撞边界）
    let gameBoundary = {
      x: -width * this.mapSize / 2,
      y: -height * this.mapSize / 2,
      w: width * this.mapSize,
      h: height * this.mapSize
    };

    // // 计算可见边界（比游戏边界稍大）
    // let visibleBoundary = {
    //   x: -width * this.borderSize / 2,
    //   y: -height * this.borderSize / 2,
    //   w: width * this.borderSize,
    //   h: height * this.borderSize
    // };

    // 绘制白色可见边界
    // GameMap.stroke(255);
    stroke(255);
    strokeWeight(2);
    noFill();
    // strokeWeight(4);
    rect(gameBoundary.x, gameBoundary.y, gameBoundary.w, gameBoundary.h);
    pop();
  }

  // // 绘制固定网格，不随蛇移动
  // drawFixedGrid() {
  //   push();
  //   stroke(255, 30); // 白色半透明网格线
  //   strokeWeight(1);
    
  //   // 计算屏幕上可见的网格
  //   let startX = floor(-width / 2 / gridSize) * gridSize;
  //   let startY = floor(-height / 2 / gridSize) * gridSize;
  //   let endX = ceil(width / 2 / gridSize) * gridSize;
  //   let endY = ceil(height / 2 / gridSize) * gridSize;
    
  //   // 将画布原点移到屏幕中心
  //   translate(width / 2, height / 2);
    
  //   // 绘制水平网格线
  //   for (let y = startY; y <= endY; y += gridSize) {
  //     line(startX, y, endX, y);
  //   }
    
  //   // 绘制垂直网格线
  //   for (let x = startX; x <= endX; x += gridSize) {
  //     line(x, startY, x, endY);
  //   }
  //   pop();
  // }

  drawFixedGrid() {
    push();
    stroke(255, 30); // 白色半透明网格线
    strokeWeight(1);
    
    // 计算整个地图范围的网格
    let startX = floor(-width * this.mapSize / 2 / this.gridSize) * this.gridSize;
    let startY = floor(-height * this.mapSize / 2 / this.gridSize) * this.gridSize;
    let endX = ceil(width * this.mapSize / 2 / this.gridSize) * this.gridSize;
    let endY = ceil(height * this.mapSize / 2 / this.gridSize) * this.gridSize;
    
    // 移动原点，使网格从左上角绘制
    translate(0, 0);
    
    // 绘制水平网格线
    for (let y = startY; y <= endY; y += this.gridSize) {
      line(startX, y, endX, y);
    }
    
    // 绘制垂直网格线
    for (let x = startX; x <= endX; x += this.gridSize) {
      line(x, startY, x, endY);
    }
    
    pop();
    }

  generateSwamps() {
    this.swampManager.generateSwamps(difficultyMode === 'hard' ? 8 : 5);
  }

  drawSwamps() {
    this.swampManager.drawSwamps();
  }
}

class SwampManager {
  constructor() {
    this.swamps = [];
    this.noiseSeed = 0;
  }

  generateSwamps(count = 5) {
    this.noiseSeed = random(1000);
    for (let i = 0; i < count; i++) {
      let center = createVector(
        random(-width * mapSize/2 + 200, width * mapSize/2 - 200),
        random(-height * mapSize/2 + 200, height * mapSize/2 - 200)
      );
      
      let swamp = {
        position: center,
        points: this.generateOrganicSwampShape(center),
        slowdown: 0.6 // 速度降到60%
      };
      
      this.swamps.push(swamp);
    }
  }
  generateOrganicSwampShape(center) {
    let points = [];
    const baseRadius = random(100, 180);
    const noiseLayers = [
      { scale: 0.15, weight: 0.5 }, // 低频形状
      { scale: 0.4, weight: 0.3 },  // 中频细节
      { scale: 1.2, weight: 0.2 }   // 高频细节
    ];
    const pointCount = 36; // 增加采样点

    // 生成基础形状
    for (let a = 0; a < TWO_PI; a += TWO_PI/pointCount) {
      let radius = baseRadius;
      
      // 多层噪声叠加
      noiseLayers.forEach(layer => {
        const xoff = cos(a) * layer.scale + this.noiseSeed;
        const yoff = sin(a) * layer.scale + this.noiseSeed;
        radius += noise(xoff, yoff) * layer.weight * baseRadius;
      });
    
      // 添加缓变扰动
      radius *= map(sin(a * 3 + this.noiseSeed), -1, 1, 0.95, 1.05);

      points.push(createVector(
        center.x + radius * cos(a),
        center.y + radius * sin(a)
      ));
    }

    // 形状后处理
    return this.processShape(points);
  }

  processShape(points) {
    // 三次平滑处理
    for (let i = 0; i < 3; i++) {
      points = points.map((p, idx) => {
        const prev = points[(idx + points.length - 1) % points.length];
        const next = points[(idx + 1) % points.length];
        return createVector(
          (prev.x + p.x * 4 + next.x) / 6,
          (prev.y + p.y * 4 + next.y) / 6
        );
      });
    }

    // 添加微观扰动
    return points.map(p => 
      createVector(
        p.x + random(-3, 3),
        p.y + random(-2, 2)
      )
    );
  }

/*
  generateSwampShape(center) {
    let points = [];
    let baseRadiusX = random(100, 180);
    let baseRadiusY = random(100, 180);
    let baseRadius = random(80, 150);
    let noiseScale = 0.3; // 控制形状复杂度
    let noiseOffset = random(100); // 随机噪声偏移量

    for (let a = 0; a < TWO_PI; a += TWO_PI/24) { // 增加采样点
      // 使用三维噪声参数增加随机性
      let xoff = cos(a) * noiseScale + noiseOffset;
      let yoff = sin(a) * noiseScale + noiseOffset;
      let zoff = frameCount * 0.01; // 可选：加入时间维度
      
      // 生成噪声值（范围0-1）
      let noiseVal = noise(xoff, yoff, zoff);
      
      // 将噪声值映射到更宽的范围（-0.5到0.5）
      let offset = map(noiseVal, 0, 1, -1, 1);
      
      // 动态半径计算
      let dynamicRadius = baseRadius * (1 + offset);
      
      points.push(createVector(
        center.x + baseRadiusX * cos(a),
        center.y + baseRadiusY * sin(a)
      ));
    }
    points = points.map(p => {
      return createVector(
        p.x + random(-8, 8),
        p.y + random(-8, 8)
      );
    });
  
    return points;
  }
*/
  drawSwamps() {
    push();
    noStroke();
    fill(89, 170, 193, 50); // 沼泽颜色
    for (let swamp of this.swamps) {
      beginShape();
      for (let p of swamp.points) {
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
    }
    pop();
  }

  // 检测位置是否在沼泽中
  inSwamp(position) {
    for (let swamp of this.swamps) {
      if (this.pointInPolygon(position, swamp.points)) {
        return swamp.slowdown;
      }
    }
    return 1.0;
  }

  // 多边形点检测算法
  pointInPolygon(point, polygon) {
    let collision = false;
    for (let i = 0; i < polygon.length; i++) {
      let vc = polygon[i];
      let vn = polygon[(i + 1) % polygon.length];
      if (((vc.y > point.y) !== (vn.y > point.y)) &&
          (point.x < (vn.x - vc.x) * (point.y - vc.y) / (vn.y - vc.y) + vc.x)) {
        collision = !collision;
      }
    }
    return collision;
  }
}