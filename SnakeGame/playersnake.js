class PlayerSnake extends Snake {
  constructor(x = 0, y = 0) {
    super(x, y, 5, [50, 200, 50]); // 绿色玩家蛇
  }

  updateDirection() {
    let center = createVector(width / 2, height / 2);
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, center);
    if (dir.mag() > 0) {
      dir.normalize();
      this.direction = dir;
    }
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
}
