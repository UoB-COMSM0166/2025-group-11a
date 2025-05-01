class PlayerSnake extends Snake {
  constructor(x = 0, y = 0) {
    super(x, y, 5, selectedColor || [120, 230, 120]);
    this.isAccelerating = false; 
    this.stamina = 100; 
    this.maxStamina = 100; 
    this.staminaDrainRate = 1; 
    this.staminaRecoverRate = 0.5; 
    this.originalSpeed = snakeSpeed; 
    this.boostSpeed = snakeSpeed * 2;
    this.boostCooldown = 0;
    this.isInvincible = false; 
    this.invincibleDuration = 0;
    this.isInitialInvincibility = false;
    this.isEnlarged = false;
    this.enlargeDuration = 0;
    this.isSpeedUpSoundPlayed = false;
  }

  actInvincibility() {
    this.isInvincible = true;
    this.invincibleDuration = 180;
  }

  actStamina() {
    this.stamina = min(this.stamina + 50, this.maxStamina);
  }

  actEnlarge() {
    this.isEnlarged = true;
    this.enlargeDuration = 180;
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
      // food collisions can be enlarged or not
      if (this.isEnlarged == false && p5.Vector.dist(head, foods[i]) < gridSize * 0.8
          || this.isEnlarged == true && p5.Vector.dist(head, foods[i]) < gridSize * 2.2) {
        this.grow();
        foodManager.removeFood(i);
        foodEaten++;
      }
    }
    
    return foodEaten;
  }


  checkItemCollision(items) {
    let head = this.body[0];

    for (let i = items.length - 1; i >= 0; i--) {
      // item collisions can be enlarged or not
      if (this.isEnlarged == false && p5.Vector.dist(head, items[i].position) < gridSize * 1.1
    ||this.isEnlarged == true && p5.Vector.dist(head, items[i].position) < gridSize * 2.2) {
        let itemType = items[i].type;
        items.splice(i, 1);
        return { collided: true, type: itemType };
      }
    }
    return { collided: false, type: null };
  }

  checkObstacleCollision(obstacles) {
    let head = this.body[0];
    let headSize = gridSize;
    let extraPadding = gridSize * 0.6;
    let collisionDetected = false;

    for (let i = obstacles.length - 1; i >= 0; i--) {
      let o = obstacles[i];
      if (o.isHorizontal) {
        if (
            head.x < o.x + o.length + extraPadding && 
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
            head.y < o.y + o.length + extraPadding && 
            head.y + headSize > o.y
        ) {
          collisionDetected = true;
          break;
        }
      }
    }
    if (collisionDetected) {
      if (!this.isRecovering) { 
        this.isRecovering = true;
        this.speed = 0; 
      }
      return true;
    }
    return false;
  }

  // when player snake head collides with AI snake head or body, player snake dies
  checkCollisionWithAISnake(aiSnake) {
    let head = this.body[0];
    let aiHead = aiSnake.body[0]; 
    // head collision
    if (p5.Vector.dist(head, aiHead) < gridSize) {
      return true; 
    }
    // body collision
    for (let i = 1; i < aiSnake.body.length; i++) { 
      let seg = aiSnake.body[i];
      if (p5.Vector.dist(head, seg) < gridSize) {
        return true; 
      }
    }
    return false;
  }

  move() {
    let currentSlowdown = gameMap.swampManager.inSwamp(this.body[0]);

    // acceleration and stamina management
    if (this.isAccelerating && this.stamina > 0) {
      this.speed = this.boostSpeed * currentSlowdown;
      this.stamina -= this.staminaDrainRate;
      if (!this.isSpeedUpSoundPlayed&&!speedUpSound.isPlaying()) {
        this.isSpeedUpSoundPlayed = true;
      }
    } else {
      this.speed = this.originalSpeed * currentSlowdown;
      if (this.stamina < this.maxStamina) {
        this.stamina += this.staminaRecoverRate;
      }
      this.isSpeedUpSoundPlayed = false;
    }

    // ensure stamina in reasonable range
    this.stamina = constrain(this.stamina, 0, this.maxStamina);

    if (this.stamina <= 0) {
      this.isAccelerating = false;
      this.speed = this.originalSpeed; 
    }

    super.move();
  }

  teleportFlash() {
    this.isFlashing = true;
    this.flashDuration = 15;
  }
}
 
