class PlayerSnake extends Snake {
  constructor(x = 0, y = 0) {
    super(x, y, 5, [50, 200, 50]); 
    this.isAccelerating = false; 
    this.stamina = 100; 
    this.maxStamina = 100; 
    this.staminaDrainRate = 1; 
    this.staminaRecoverRate = 0.5; 
    this.originalSpeed = snakeSpeed; 
    this.boostSpeed = snakeSpeed * 2;
    this.boostCooldown = 0;//加速冷却时间
    this.isInvincible = false; // 无敌状态
    this.invincibleDuration = 0; // 无敌持续时间（以帧为单位） 
  }

  activateInvincibility() {
    this.isInvincible = true;
    this.invincibleDuration = 180; // 无敌时间持续180帧
  }

  chargeStamina() {
    this.stamina = min(this.stamina + 50, this.maxStamina);//每次只增加 50 点体力，但不会超过 maxStamina。
  }

  updateDirection() {
    let center = createVector(width / 2, height / 2);
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, center);
    if (dir.mag() > 0) {
      dir.normalize();
      this.direction = dir;
    }
    this.isAccelerating = mouseIsPressed && mouseButton === LEFT;
  }

  checkFoodCollision(foods) {
    let head = this.body[0];
    let foodEaten = 0;
    
    for (let i = foods.length - 1; i >= 0; i--) {
      if (p5.Vector.dist(head, foods[i]) < gridSize * 1.1) {
        this.grow();
        foods.splice(i, 1);
        foodEaten++;
      }
    }
    
    return foodEaten;
  }

  checkItemCollision(items) {
    let head = this.body[0]; // 获取蛇头位置

    for (let i = items.length - 1; i >= 0; i--) {
      // 使用 items[i].position 来访问道具的坐标
      if (p5.Vector.dist(head, items[i].position) < gridSize * 1.1) {
        let itemType = items[i].type; // 获取碰撞道具的类型
        items.splice(i, 1); // 碰撞后删除道具
        return { collided: true, type: itemType }; // 返回包含碰撞结果和道具类型的对象
      }
    }
    return { collided: false, type: null }; // 如果没有碰撞，返回 false 和 null 类型
  }

  checkObstacleCollision(obstacles) {
    let head = this.body[0];
    let headSize = gridSize; // 这里假设蛇头大小是 gridSize
    let extraPadding = gridSize * 0.6; // 额外检测范围，让竖向障碍物更早触发碰撞
    let collisionDetected = false; // 碰撞标志

    for (let i = obstacles.length - 1; i >= 0; i--) {
      let o = obstacles[i];
      if (o.isHorizontal) {
        if (
            head.x < o.x + o.length + extraPadding && // 提前触发
            head.x + headSize > o.x &&
            head.y < o.y + gridSize &&
            head.y + headSize > o.y
        ) {
          collisionDetected = true;
          break;
        }
      } else {
        if (
            head.x < o.x + gridSize &&
            head.x + headSize > o.x &&
            head.y < o.y + o.length + extraPadding && // 提前触发
            head.y + headSize > o.y
        ) {
          collisionDetected = true;
          break;
        }
      }
    }
    if (collisionDetected) {
      if (!this.isRecovering) { // 防止重复触发
        this.isRecovering = true;
        this.speed = 0; // 停止移动
        // 撞到障碍物后，轻微后退，模拟撞击效果
        this.direction.rotate(PI / 2);
        this.body[0].sub(this.direction.copy().mult(gridSize * 0.5)); // 反弹半个格子
      }
      return true;
    }
    return false;
  }

  //玩家蛇头 碰到 ai蛇头与蛇身时， 均会死亡
  checkCollisionWithAISnake(aiSnake) {
    let head = this.body[0];
    let aiHead = aiSnake.body[0]; // 获取AI蛇的头部
    // 先检查玩家蛇头是否撞到AI蛇头
    if (p5.Vector.dist(head, aiHead) < gridSize) {
      return true; // 头碰头，玩家死亡
    }
    // 检查玩家蛇头是否撞到AI蛇的身体
    for (let i = 1; i < aiSnake.body.length; i++) { // 从1开始，避免重复检查AI头部
      let seg = aiSnake.body[i];
      if (p5.Vector.dist(head, seg) < gridSize) {
        return true; // 碰到AI身体，玩家死亡
      }
    }
    return false; // 没有碰撞
  }

  move() {
    // 检测沼泽减速
    let currentSlowdown = gameMap.swampManager.inSwamp(this.body[0]);

    // 根据是否加速来调整速度
    if (this.isAccelerating && this.stamina > 0) {
      this.speed = this.boostSpeed * currentSlowdown;
      this.stamina -= this.staminaDrainRate;
    } else {
      this.speed = this.originalSpeed * currentSlowdown;
      if (this.stamina < this.maxStamina) {
        this.stamina += this.staminaRecoverRate;
      }
    }

    // 确保体力值在合理范围内
    this.stamina = constrain(this.stamina, 0, this.maxStamina);

    if (this.stamina <= 0) {
      this.isAccelerating = false;
      this.speed = this.originalSpeed; // 确保速度重置
    }

    super.move();
  }
}
