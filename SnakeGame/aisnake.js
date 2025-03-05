class AISnake extends Snake {
  constructor() {
    // 随机生成位置，但不要太靠近玩家
    let x = random(-width * 1.5, width * 1.5);
    let y = random(-height * 1.5, height * 1.5);
    
    // 随机长度和颜色
    let size = floor(random(3, 8));
    let bodyColor = [
      floor(random(100, 255)), 
      floor(random(50, 150)),  
      floor(random(50, 150)) 
    ];
    
    super(x, y, size, bodyColor);
    this.direction = p5.Vector.random2D();
    this.turnCounter = 0;
    this.maxTurnDelay = floor(random(200, 500)); // 随机转向频率
    this.targetFood = null;

    this.foodSelectionCounter = 0;
    this.foodSelectionInterval = floor(random(10, 30));
    this.foodPreference = 0.12; // 值越小越平滑
  }
  
  update() {
    this.turnCounter++;
    
    // 检查障碍物和边界碰撞
    let boundaryCollision = this.checkBoundaryCollision(true)
    if (boundaryCollision) {
      this.changeDirection(boundaryCollision);
    }
    let obstacleCollision = this.checkObstacleCollision(obstacleManager.obstacles)
    if (obstacleCollision) {
      this.changeDirection(obstacleCollision);
    }

    // 定期重新选择食物目标
    if (this.foodSelectionCounter >= this.foodSelectionInterval || this.targetFood === null) {
      // this.findRandomNearestFood(foodManager.foods);
      this.foodSelectionCounter = 0;
      this.foodSelectionInterval = floor(random(10, 100)); // 重置食物选择间隔
    }

    // 如果有目标食物，朝它移动
    if (this.targetFood && !obstacleCollision) {
      this.moveTowardsFood(false);
      let dirToFood = p5.Vector.sub(this.targetFood, this.body[0]);
      if (dirToFood.mag() > 0) {
        dirToFood.normalize();
        let futurePos = p5.Vector.add(this.body[0], p5.Vector.mult(dirToFood, gridSize));
        let wouldCollide = true;
        
        // 预测性检查是否会与障碍物碰撞
        for (let obstacle of obstacleManager.obstacles) {
          if (obstacle.isHorizontal) {
            if (futurePos.y >= obstacle.y && futurePos.y <= obstacle.y + gridSize * 0.5 &&
                futurePos.x >= obstacle.x && futurePos.x <= obstacle.x + obstacle.length) {
              wouldCollide = true;
              break;
            }
          } else {
            if (futurePos.x >= obstacle.x && futurePos.x <= obstacle.x + gridSize * 0.5 &&
                futurePos.y >= obstacle.y && futurePos.y <= obstacle.y + obstacle.length) {
              wouldCollide = true;
              break;
            }
          }
        }
        
        if (!wouldCollide) {
          this.direction = dirToFood;
          this.direction.lerp(targetDirection, 0.1);
          this.direction.normalize();
        }
      }
    } 
    // 否则随机移动
    else if (this.turnCounter > this.maxTurnDelay) {
      this.direction.rotate(random(-PI/4, PI/4));
      this.turnCounter = 0;
      this.maxTurnDelay = floor(random(200, 500));
      
    }

    let targetDirection = this.direction.copy();

    // 应用方向惯性
    this.direction.lerp(targetDirection, 0.1); 
    this.direction.normalize();

    // 绕圈检测
    if (this.turnCounter > this.maxTurnDelay * 2) { 
      this.direction.rotate(PI / 2);
      this.turnCounter = 0;
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

  // 找到最近的三个食物中的随机一个作为目标
  findRandomNearestFood(foods) {
    if (foods.length === 0) {
      this.targetFood = null;
      return;
    }
    
    // 计算所有食物与蛇头的距离
    let foodDistances = [];
    for (let food of foods) {
      let dist = p5.Vector.dist(this.body[0], food);
      foodDistances.push({food: food, distance: dist});
    }
    
    // 按距离排序
    foodDistances.sort((a, b) => a.distance - b.distance);
    
    // 取最近的三个食物（或者如果少于三个，则取所有食物）
    let nearestCount = min(3, foodDistances.length);
    let nearestFoods = foodDistances.slice(0, nearestCount);
    
    // 只有在合理距离内才追踪食物
    if (nearestFoods.length > 0 && nearestFoods[0].distance < width) {
      // 随机选择最近的三个食物中的一个
      let randomIndex = floor(random(nearestCount));
      this.targetFood = nearestFoods[randomIndex].food;
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
    let aiHead = this.body[0];
    let playerBody = playerSnake.body; 

    // 遍历玩家蛇的每一节身体
    for (let i = 1; i < playerBody.length; i++) {
      if (p5.Vector.dist(aiHead, playerBody[i]) < gridSize) { 
        return true; 
      }
    }
    return false;
  }

  //AI蛇的死亡会生成随机数量的食物和道具
  die() {
    let bodyParts = this.body.length; 
    let foodCount = floor(random(ceil(bodyParts * 0.3), ceil(bodyParts * 0.6))); // 30% - 60% 的身体掉落食物
    let itemCount = floor(random(0, ceil(bodyParts * 0.15))); // 0% - 15% 的身体掉落道具

    // 限制最大掉落数量
    foodCount = min(foodCount, 5);  
    itemCount = min(itemCount, 2);  

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

  checkObstacleCollision(obstacles) {
    let head = this.body[0];
    let buffer = gridSize * 1.5; 
    
    for (let obstacle of obstacles) {
      if (obstacle.isHorizontal) {
        // 横向障碍物碰撞检测
        if (head.y >= obstacle.y - buffer && head.y <= obstacle.y + gridSize * 0.5 + buffer &&
          head.x >= obstacle.x - buffer && head.x <= obstacle.x + obstacle.length + buffer) {
          // 细分碰撞位置
          if (Math.abs(head.y - obstacle.y) < buffer) {
            return 'horizontal-top'; // 从上方接触
          } else if (Math.abs(head.y - (obstacle.y + gridSize * 0.5)) < buffer) {
            return 'horizontal-bottom'; // 从下方接触
          } else if (Math.abs(head.x - obstacle.x) < buffer) {
            return 'horizontal-left'; // 从左侧接触
          } else if (Math.abs(head.x - (obstacle.x + obstacle.length)) < buffer) {
            return 'horizontal-right'; // 从右侧接触
          }
          return 'horizontal'; // 默认情况
        }
      } else {
        // 竖向障碍物碰撞检测
        if (head.x >= obstacle.x - buffer && head.x <= obstacle.x + gridSize * 0.5 + buffer &&
          head.y >= obstacle.y - buffer && head.y <= obstacle.y + obstacle.length + buffer) {
          // 细分碰撞位置
          if (Math.abs(head.x - obstacle.x) < buffer) {
            return 'vertical-left'; // 从左侧接触
          } else if (Math.abs(head.x - (obstacle.x + gridSize * 0.5)) < buffer) {
            return 'vertical-right'; // 从右侧接触
          } else if (Math.abs(head.y - obstacle.y) < buffer) {
            return 'vertical-top'; // 从上方接触
          } else if (Math.abs(head.y - (obstacle.y + obstacle.length)) < buffer) {
            return 'vertical-bottom'; // 从下方接触
          }
          return 'vertical'; // 默认情况
        }
      }
    }
    return false;
  }

  checkBoundaryCollision(isAI = true) {
    let head = this.body[0];
    let buffer = gridSize * 1.5;
    let boundary = {
      xMin: -width * mapSize / 2 + buffer,
      xMax: width * mapSize / 2 - buffer, 
      yMin: -height * mapSize / 2 + buffer,
      yMax: height * mapSize / 2 - buffer
    };

    // 记录碰撞的边界类型
    if (head.x <= boundary.xMin) return 'left';
    if (head.x >= boundary.xMax) return 'right';
    if (head.y <= boundary.yMin) return 'top';
    if (head.y >= boundary.yMax) return 'bottom';
    return false;
  }
  

  changeDirection(collisionType) {
    switch(collisionType) {
      // 边界碰撞
      case 'left':
        this.direction.x = Math.abs(this.direction.x);
        break;
      case 'right':
        this.direction.x = -Math.abs(this.direction.x);
        break;
      case 'top':
        this.direction.y = Math.abs(this.direction.y);
        break;
      case 'bottom':
        this.direction.y = -Math.abs(this.direction.y); 
        break;
      // 横向障碍物碰撞
      case 'horizontal-top':
        this.direction.y = -Math.abs(this.direction.y);
        break;
      case 'horizontal-bottom':
        this.direction.y = Math.abs(this.direction.y); 
        break;
      case 'horizontal-left':
        this.direction.x = -Math.abs(this.direction.x);
        break;
      case 'horizontal-right':
        this.direction.x = Math.abs(this.direction.x);
        break;
      case 'horizontal':
        this.direction.y *= -1; // 默认垂直反射
        break;
      // 竖向障碍物碰撞
      case 'vertical-left':
        this.direction.x = -Math.abs(this.direction.x); 
        break;
      case 'vertical-right':
        this.direction.x = Math.abs(this.direction.x); 
        break;
      case 'vertical-top':
        this.direction.y = -Math.abs(this.direction.y); 
        break;
      case 'vertical-bottom':
        this.direction.y = Math.abs(this.direction.y);
        break;
      case 'vertical':
        this.direction.x *= -1; // 默认水平反射
        break;
      default:
        // 默认随机改变方向
        this.direction.rotate(random(-PI/4, PI/4));
    }
      // 归一化方向向量
    this.direction.normalize();
    
    // 添加小随机性
    this.direction.rotate(random(-PI/4, PI/4));
    
    // 强制移动一点距离，避免粘在障碍物上
    this.body[0].x += this.direction.x * gridSize * 0.2;
    this.body[0].y += this.direction.y * gridSize * 0.2;

    // this.findRandomNearestFood(foodManager.foods);
    this.moveTowardsFood(false);

  }

  moveTowardsFood(obstacleCollision) {
    // 如果刚刚发生了碰撞或没有目标食物，则重新寻找食物
    if (!obstacleCollision || this.targetFood === null) {
      this.findRandomNearestFood(foodManager.foods);
    }
    
    if (this.targetFood) {
      let dirToFood = p5.Vector.sub(this.targetFood, this.body[0]);
      if (dirToFood.mag() > 0) {
        dirToFood.normalize();
        let futurePos = p5.Vector.add(this.body[0], p5.Vector.mult(dirToFood, gridSize));
        
        // 预测性检查是否会与障碍物碰撞
        let wouldCollide = this.predictCollision(futurePos);
        
        if (!wouldCollide) {
          // 使用权重混合当前方向和食物方向
          let newDir = p5.Vector.lerp(this.direction, dirToFood, this.foodPreference);
          newDir.normalize();
          this.direction = newDir;
          return true; // 成功朝向食物
        }
      }
    }
    
    // 如果没能朝向食物，则考虑随机移动
    if (this.turnCounter > this.maxTurnDelay) {
      this.direction.rotate(random(-PI/4, PI/4));
      this.turnCounter = 0;
      this.maxTurnDelay = floor(random(20, 60));
      this.direction.lerp(targetDirection, 0.1);
      this.direction.normalize();
      // this.findRandomNearestFood(foodManager.foods);
    }
    
    return false;
  }

  // 新方法：预测位置是否会碰撞
  predictCollision(position) {
    // 检查边界碰撞
    let boundary = {
      xMin: -width * mapSize / 2,
      xMax: width * mapSize / 2, 
      yMin: -height * mapSize / 2,
      yMax: height * mapSize / 2
    };
    
    if (position.x <= boundary.xMin || position.x >= boundary.xMax || 
        position.y <= boundary.yMin || position.y >= boundary.yMax) {
      return true;
    }
    
    // 检查障碍物碰撞
    for (let obstacle of obstacleManager.obstacles) {
      if (obstacle.isHorizontal) {
        if (position.y >= obstacle.y && position.y <= obstacle.y + gridSize * 0.5 &&
            position.x >= obstacle.x && position.x <= obstacle.x + obstacle.length) {
          return true;
        }
      } else {
        if (position.x >= obstacle.x && position.x <= obstacle.x + gridSize * 0.5 &&
            position.y >= obstacle.y && position.y <= obstacle.y + obstacle.length) {
          return true;
        }
      }
    }
    
    return false;
  }

}
