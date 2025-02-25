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
}
