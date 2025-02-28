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
    this.isInvincible = false; // 无敌状态
    this.invincibleDuration = 0; // 无敌持续时间（以帧为单位） 
  }

  activateInvincibility() {
    this.isInvincible = true;
    this.invincibleDuration = 120; // 设置无敌持续120帧
  }

  chargeStamina() {
    this.stamina = this.maxStamina;
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
    let extraPadding = gridSize * 0.6; // 额外检测范围，让竖向障碍物更早触发碰撞，用于调试

    for (let i = obstacles.length - 1; i >= 0; i--) {
        let o = obstacles[i];

        if (o.isHorizontal) {
            if (
                head.x < o.x + o.length + extraPadding &&// 提前触发
                head.x + headSize > o.x &&
                head.y < o.y +  gridSize &&
                head.y + headSize > o.y
            ) {
                return true;
            }
        } else {
            if (
                head.x < o.x +  gridSize &&
                head.x + headSize > o.x &&
                head.y < o.y + o.length + extraPadding &&// 提前触发
                head.y + headSize > o.y
            ) {
                return true;
            }
        }
    }
    return false;
  }
  
  checkCollisionWithAISnake(aiSnake) {
    let head = this.body[0];
    
    // 检查与AI蛇身体的碰撞
    for (let i = 0; i < aiSnake.body.length; i++) {
      let seg = aiSnake.body[i];
      if (p5.Vector.dist(head, seg) < gridSize) {
        return true;
      }
    }
    
    return false;
  }

  move() {
    // 根据是否加速来调整速度
    if (this.isAccelerating && this.stamina > 0) {
      this.speed = this.boostSpeed;
      this.stamina -= this.staminaDrainRate;
    } else {
      this.speed = this.originalSpeed;
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
