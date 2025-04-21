class GameMap {
  constructor(gridSize, mapSize, borderSize) {
    this.gridSize = gridSize;   // 网格大小
    this.mapSize = mapSize;     // 地图大小（碰撞边界）
    this.borderSize = borderSize; // 可见边界大小
    this.visibleRange = 2;      // 可见网格范围倍数
    this.swampManager = new SwampManager();
    this.desertManager = new DesertManager();
    this.teleportManager = new TeleportManager();
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

    // // 计算可见边界（比游戏边界稍大）
    // let visibleBoundary = {
    //   x: -width * this.borderSize / 2,
    //   y: -height * this.borderSize / 2,
    //   w: width * this.borderSize,
    //   h: height * this.borderSize
    // };

    // 绘制白色可见边界
    // GameMap.stroke(255);
    // stroke(255);
    // strokeWeight(2);
    noFill();
    // strokeWeight(4);
    // rect(gameBoundary.x, gameBoundary.y, gameBoundary.w, gameBoundary.h);
    pop();
  }

  drawFixedGrid() {
    push();
    stroke(255, 0); // 白色半透明网格线
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
      for (let x = startX; x <= endX; x += this.gridSize) {
        // 为每个格子选择随机颜色
        let col = color(30);
        fill(col);
        noStroke();
        rect(x, y, this.gridSize, this.gridSize);  // 绘制填充的网格
      }
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

  generateDeserts() {
    this.desertManager.generateDeserts(difficultyMode === 'hard' ? 8 : 5);
  }

  drawDeserts() {
    this.desertManager.drawDeserts();
  }

  // 添加生成传送点的方法
  generateTeleports() {
    this.teleportManager.generateTeleports(difficultyMode === 'hard' ? 6 : 4);
  }

// 添加绘制传送点的方法
  drawTeleports() {
    this.teleportManager.drawTeleports();
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

class DesertManager {
  constructor() {
    this.deserts = [];
    this.noiseSeed = 0;
  }

  generateDeserts(count = 5) {
    this.noiseSeed = random(1000);
    for (let i = 0; i < count; i++) {
      let center = createVector(
          random(-width * mapSize/2 + 200, width * mapSize/2 - 200),
          random(-height * mapSize/2 + 200, height * mapSize/2 - 200)
      );

      let desert = {
        position: center,
        points: this.generateOrganicDesertShape(center),
        slowdown: 0.6 // 进入迷雾后速度降低 40%
      };

      this.deserts.push(desert);
    }
  }

  generateOrganicDesertShape(center) {
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
    return this.processDesertShape(points);
  }

  processDesertShape(points) {
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

  drawDeserts() {
    push();
    noStroke();
    for (let i = 0; i < this.deserts.length; i++) {
      let desert = this.deserts[i];

      // 计算动态透明度：基于正弦波变化，范围 80 - 255
      let alpha = map(sin(frameCount * 0.01 + i), -1, 1, 80, 255);

      let offsetX = map(noise(frameCount * 0.005, i), 0, 1, -2, 2);
      let offsetY = map(noise(frameCount * 0.005 + 1000, i), 0, 1, -2, 2);
      let movedPosition = createVector(desert.position.x + offsetX, desert.position.y + offsetY);
      fill(150, 150, 150, alpha); // 设置随时间变化的透明度

      beginShape();
      for (let p of desert.points) {
        vertex(p.x + offsetX, p.y + offsetY);
      }
      vertex(desert.points[0].x + offsetX, desert.points[0].y + offsetY);// 确保闭合
      endShape(CLOSE);
    }

    pop();
  }
}
// 在 map.js 中添加 TeleportManager 类

class TeleportManager {
  constructor() {
    this.teleports = [];
    this.teleportCooldown = 0; // 传送冷却时间，防止连续传送
    this.cooldownTime = 30; // 冷却时间帧数（约1秒）
    this.teleportEffect = []; // 存储传送特效的数组
  }

  generateTeleports(count = 4) {
    // 清空现有传送点
    this.teleports = [];

    // 生成指定数量的传送点
    for (let i = 0; i < count; i++) {
      let position = createVector(
          random(-width * mapSize/2 + 200, width * mapSize/2 - 200),
          random(-height * mapSize/2 + 200, height * mapSize/2 - 200)
      );

      // 确保传送点之间有足够距离
      let minDistance = 500;
      let isTooClose = false;

      for (let j = 0; j < this.teleports.length; j++) {
        if (p5.Vector.dist(position, this.teleports[j].position) < minDistance) {
          isTooClose = true;
          break;
        }
      }

      // 如果太近，则重新尝试
      if (isTooClose) {
        i--;
        continue;
      }

      // 随机生成传送点颜色
      let portalColor = [
        random(100, 200),  // R
        random(100, 200),  // G
        random(200, 255)   // B
      ];

      this.teleports.push({
        position: position,
        color: portalColor,
        radius: gridSize * 2,
        active: true
      });
    }

    // 为每个传送点分配一个目标传送点（不重复）
    let destinations = [...Array(this.teleports.length).keys()];
    for (let i = 0; i < this.teleports.length; i++) {
      // 从剩余目标中随机选择一个不是自己的传送点
      let validDestinations = destinations.filter(idx => idx !== i);
      let destIndex = random(validDestinations);

      // 记录目标传送点索引
      this.teleports[i].destination = floor(destIndex);

      // 为传送点分配一个唯一ID用于可视化
      this.teleports[i].id = i;
    }
  }

  drawTeleports() {
    push();
    for (let teleport of this.teleports) {
      if (!teleport.active) continue; // 跳过非活跃的传送点

      // 绘制外圈旋转光环
      let outerRadius = teleport.radius * 1.5;
      noFill();
      for (let i = 0; i < 2; i++) {
        let rotationOffset = (frameCount * 0.02 + i * PI);
        let transparency = map(sin(frameCount * 0.05 + i), -1, 1, 150, 255);

        stroke(teleport.color[0], teleport.color[1], teleport.color[2], transparency);
        strokeWeight(2);

        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.3) {
          let r = outerRadius + sin(a * 6 + rotationOffset) * (gridSize * 0.2);
          let x = teleport.position.x + cos(a) * r;
          let y = teleport.position.y + sin(a) * r;
          vertex(x, y);
        }
        endShape(CLOSE);
      }

      // 绘制内圈
      noStroke();
      for (let r = teleport.radius; r > 0; r -= 5) {
        let alpha = map(r, teleport.radius, 0, 100, 200);
        fill(teleport.color[0], teleport.color[1], teleport.color[2], alpha);
        ellipse(teleport.position.x, teleport.position.y, r * 2);
      }

      // 绘制传送点ID或标识
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(teleport.id + 1, teleport.position.x, teleport.position.y);

      // 绘制指向目标的微小指示器
      let destPos = this.teleports[teleport.destination].position;
      let direction = p5.Vector.sub(destPos, teleport.position).normalize().mult(teleport.radius * 0.6);
      stroke(255, 255, 0, 200);
      strokeWeight(2);
      line(
          teleport.position.x,
          teleport.position.y,
          teleport.position.x + direction.x,
          teleport.position.y + direction.y
      );

      // 在线的终点添加箭头
      push();
      translate(teleport.position.x + direction.x, teleport.position.y + direction.y);
      rotate(direction.heading());
      fill(255, 255, 0, 200);
      noStroke();
      triangle(0, 0, -10, 5, -10, -5);
      pop();
    }

    // 绘制传送特效
    for (let i = this.teleportEffect.length - 1; i >= 0; i--) {
      let effect = this.teleportEffect[i];
      effect.life--;

      // 扩散效果
      noFill();
      stroke(effect.color[0], effect.color[1], effect.color[2], map(effect.life, 0, effect.maxLife, 0, 255));
      strokeWeight(effect.life / 5);
      ellipse(effect.position.x, effect.position.y, (effect.maxLife - effect.life) * 6);

      // 粒子效果
      for (let j = 0; j < 5; j++) {
        let angle = random(TWO_PI);
        let distance = (effect.maxLife - effect.life) * 3;
        fill(effect.color[0], effect.color[1], effect.color[2], random(100, 255));
        noStroke();
        ellipse(
            effect.position.x + cos(angle) * distance,
            effect.position.y + sin(angle) * distance,
            random(3, 6)
        );
      }

      // 移除生命周期结束的特效
      if (effect.life <= 0) {
        this.teleportEffect.splice(i, 1);
      }
    }

    // 如果成功传送，则添加闪烁效果
    if (gameMap.teleportManager.checkTeleport(playerSnake)) {
      playerSnake.teleportFlash();
    }

    pop();
  }

  // 检查并处理传送
  checkTeleport(snake) {
    // 如果在冷却中，减少冷却时间并返回
    if (this.teleportCooldown > 0) {
      this.teleportCooldown--;
      return false;
    }

    let head = snake.body[0];
    for (let i = 0; i < this.teleports.length; i++) {
      let teleport = this.teleports[i];
      if (!teleport.active) continue;

      // 检测蛇头是否接近传送点
      if (p5.Vector.dist(head, teleport.position) < teleport.radius) {
        // 获取目标传送点
        let destination = this.teleports[teleport.destination];

        // 创建传送特效
        this.addTeleportEffect(teleport.position, teleport.color);
        this.addTeleportEffect(destination.position, destination.color);

        // 计算传送后的方向（保持当前方向）
        let newPosition = p5.Vector.add(
            destination.position,
            p5.Vector.mult(snake.direction, gridSize * 3) // 在传送点前方出现
        );

        // 传送蛇的整个身体
        let offset = p5.Vector.sub(newPosition, head);
        for (let j = 0; j < snake.body.length; j++) {
          snake.body[j].add(offset);
        }

        // 设置传送冷却
        this.teleportCooldown = this.cooldownTime;

        // 添加提示信息
        if (snake === playerSnake) {
          itemManager.addTooltip("Teleported!", newPosition, [255, 255, 100]);
          teleportSound.play();
        }

        return true;
      }
    }
    return false;
  }

  // 添加传送特效
  addTeleportEffect(position, color) {
    this.teleportEffect.push({
      position: position.copy(),
      color: color,
      maxLife: 20,
      life: 20
    });
  }
}


