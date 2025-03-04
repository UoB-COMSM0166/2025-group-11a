class AISnake extends Snake {
  constructor() {
    // 随机生成位置，但不要太靠近玩家
    let x = random(-width * 1.5, width * 1.5);
    let y = random(-height * 1.5, height * 1.5);
    
    // 随机长度和颜色
    let size = floor(random(3, 8));
    let bodyColor = [
      floor(random(100, 255)),  // 红
      floor(random(50, 150)),   // 绿
      floor(random(50, 150))    // 蓝
    ];
    
    super(x, y, size, bodyColor);
    this.direction = p5.Vector.random2D();
    this.turnCounter = 0;
    this.maxTurnDelay = floor(random(20, 60)); // 随机转向频率
    this.targetFood = null;
  }
  
  update() {
    this.turnCounter++;
    
    // 寻找最近的食物
    if (this.turnCounter % 30 === 0 || this.targetFood === null) {
      this.findNearestFood(foodManager.foods);
    }
    
    // 如果有目标食物，朝它移动
    if (this.targetFood) {
      let dirToFood = p5.Vector.sub(this.targetFood, this.body[0]);
      if (dirToFood.mag() > 0) {
        dirToFood.normalize();
        this.direction = dirToFood;
      }
    } 
    // 否则随机移动
    else if (this.turnCounter > this.maxTurnDelay) {
      this.direction.rotate(random(-PI/4, PI/4));
      this.turnCounter = 0;
      this.maxTurnDelay = floor(random(20, 60));
    }
    
    // 移动AI蛇
    let currentSlowdown = gameMap.swampManager.inSwamp(this.body[0]);
    this.speed = snakeSpeed * currentSlowdown;
    this.move();
    
    // 检查并吃食物
    this.checkFoodCollision(foodManager.foods);
  }
  
  findNearestFood(foods) {
    if (foods.length === 0) {
      this.targetFood = null;
      return;
    }
    
    let minDist = Infinity;
    let nearestFood = null;
    
    for (let food of foods) {
      let dist = p5.Vector.dist(this.body[0], food);
      if (dist < minDist) {
        minDist = dist;
        nearestFood = food;
      }
    }
    
    // 只有在合理距离内才追踪食物
    if (minDist < width/2) {
      this.targetFood = nearestFood;
    } else {
      this.targetFood = null;
    }
  }
  
  checkFoodCollision(foods) {
    let head = this.body[0];
    
    for (let i = foods.length - 1; i >= 0; i--) {
      if (p5.Vector.dist(head, foods[i]) < gridSize) {
        this.grow();
        foods.splice(i, 1);
        
        // 如果刚才吃的是目标食物，重置目标
        if (this.targetFood === foods[i]) {
          this.targetFood = null;
        }
      }
    }
  }

  //检测 AI蛇的 蛇头是否碰到玩家蛇的身体
  checkCollisionWithPlayer(playerSnake) {
    let aiHead = this.body[0]; // AI蛇的头部
    let playerBody = playerSnake.body; // 获取玩家蛇的身体

    // 遍历玩家蛇的每一节身体
    for (let i = 1; i < playerBody.length; i++) {
      if (p5.Vector.dist(aiHead, playerBody[i]) < gridSize) { // 碰撞检测
        return true; // 发生碰撞
      }
    }
    return false; // 没有碰撞
  }

  //AI蛇的死亡会生成随机数量的食物和道具
  die() {
    let bodyParts = this.body.length; // 获取 AI 蛇身体长度
    let foodCount = floor(random(ceil(bodyParts * 0.3), ceil(bodyParts * 0.6))); // 30% - 60% 的身体掉落食物
    let itemCount = floor(random(0, ceil(bodyParts * 0.15))); // 0% - 15% 的身体掉落道具

    // 限制最大掉落数量
    foodCount = min(foodCount, 5);  // 最多掉落 5 个食物
    itemCount = min(itemCount, 2);  // 最多掉落 2 个道具

    let shuffledBody = [...this.body]; // 复制并打乱身体数组
    shuffledBody = shuffledBody.sort(() => random() - 0.5);

    // 生成食物
    for (let i = 0; i < foodCount; i++) {
      let bodySegment = shuffledBody[i]; // 取随机的身体部位
      let offsetX = random(-gridSize * 0.3, gridSize * 0.3);
      let offsetY = random(-gridSize * 0.3, gridSize * 0.3);
      let newFood = createVector(bodySegment.x + offsetX, bodySegment.y + offsetY);
      foodManager.foods.push(newFood);
    }

    // 生成道具
    for (let i = 0; i < itemCount; i++) {
      let bodySegment = shuffledBody[foodCount + i]; // 取剩余部分
      if (!bodySegment) break; // 避免索引越界

      let offsetX = random(-gridSize * 0.5, gridSize * 0.5);
      let offsetY = random(-gridSize * 0.5, gridSize * 0.5);
      let itemPos = createVector(bodySegment.x + offsetX, bodySegment.y + offsetY);
      itemManager.generateItemAt(itemPos);
    }
  }

}
