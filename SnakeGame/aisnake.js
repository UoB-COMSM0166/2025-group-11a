class AISnake extends Snake {
  constructor() {
    // limit the AI snake to a certain area
    let minX = -width * mapSize / 2 + gridSize;
    let maxX = width * mapSize / 2 - gridSize;
    let minY = -height * mapSize / 2 + gridSize;
    let maxY = height * mapSize / 2 - gridSize;
    let x = random(minX, maxX);
    let y = random(minY, maxY);
    let size = floor(random(3, 8));
    let bodyColor = [
      floor(random(100, 255)),
      floor(random(50, 150)),
      floor(random(50, 150))
    ];

    super(x, y, size, bodyColor);
    this.direction = p5.Vector.random2D();
    this.turnCounter = 0;
    this.maxTurnDelay = floor(random(200, 500)); 
    this.targetFood = null;

    this.foodSelectionCounter = 0;
    this.foodSelectionInterval = floor(random(10, 30));
    this.foodPreference = 0.12; 
  }

  update() {
    this.turnCounter++;

    // check if AI snake collides with player snake
    let boundaryCollision = this.checkBoundaryCollision(true)
    if (boundaryCollision) {
      this.changeDirection(boundaryCollision);
    }
    let obstacleCollision = this.checkObstacleCollision(obstacleManager.obstacles)
    if (obstacleCollision) {
      this.changeDirection(obstacleCollision);
    }

    // choose food every few frames
    if (this.foodSelectionCounter >= this.foodSelectionInterval || this.targetFood === null) {
      this.foodSelectionCounter = 0;
      this.foodSelectionInterval = floor(random(10, 100)); 
    }

    // if the AI snake is not colliding with anything, find the nearest food
    if (this.targetFood && !obstacleCollision) {
      this.moveTowardsFood(false);
      let dirToFood = p5.Vector.sub(this.targetFood, this.body[0]);
      if (dirToFood.mag() > 0) {
        dirToFood.normalize();
        let futurePos = p5.Vector.add(this.body[0], p5.Vector.mult(dirToFood, gridSize));
        let wouldCollide = true;
        // Predictive checking for collisions with obstacles
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
    // Turn the snake based on the distance to the food
    else if (this.turnCounter > this.maxTurnDelay) {
      this.direction.rotate(random(-PI/4, PI/4));
      this.turnCounter = 0;
      this.maxTurnDelay = floor(random(200, 500));
    }

    let targetDirection = this.direction.copy();
    this.direction.lerp(targetDirection, 0.1);
    this.direction.normalize();

    // prevent the snake from getting stuck
    if (this.turnCounter > this.maxTurnDelay * 2) {
      this.direction.rotate(PI / 2);
      this.turnCounter = 0;
    }

    // move AI snake
    let currentSlowdown = gameMap.swampManager.inSwamp(this.body[0]);
    this.speed = snakeSpeed * currentSlowdown;
    this.move();

    // eat food
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

    // find food only within a reasonable distance
    if (minDist < width/2) {
      this.targetFood = nearestFood;
    } else {
      this.targetFood = null;
    }
  }

  // randomly select one of the three nearest food items
  findRandomNearestFood(foods) {
    if (foods.length === 0) {
      this.targetFood = null;
      return;
    }

    // calculate distances to all food items and sort them
    let foodDistances = [];
    for (let food of foods) {
      let dist = p5.Vector.dist(this.body[0], food);
      foodDistances.push({food: food, distance: dist});
    }
    foodDistances.sort((a, b) => a.distance - b.distance);

    // select one of the three nearest food items 
    let nearestCount = min(3, foodDistances.length);
    let nearestFoods = foodDistances.slice(0, nearestCount);
    if (nearestFoods.length > 0 && nearestFoods[0].distance < width) {
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
        foodManager.removeFood(i);
        if (this.targetFood === foods[i]) {
          this.targetFood = null;
        }
      }
    }
  }

  // check if AI snake collides with player snake
  checkCollisionWithPlayer(playerSnake) {
    let aiHead = this.body[0];
    let playerBody = playerSnake.body;

    for (let i = 1; i < playerBody.length; i++) {
      if (p5.Vector.dist(aiHead, playerBody[i]) < gridSize) {
        return true;
      }
    }
    return false;
  }

  // AI Snake's death generates a random amount of food and props
  die() {
    let bodyParts = this.body.length;
    let foodCount = floor(random(ceil(bodyParts * 0.3), ceil(bodyParts * 0.6))); 
    let itemCount = floor(random(0, ceil(bodyParts * 0.15))); 

    // limit the number of food and items generated
    foodCount = min(foodCount, 5);
    itemCount = min(itemCount, 2);

    let shuffledBody = [...this.body]; 
    shuffledBody = shuffledBody.sort(() => random() - 0.5);

    // generate food
    for (let i = 0; i < foodCount; i++) {
      let bodySegment = shuffledBody[i]; 
      let offsetX = random(-gridSize * 0.3, gridSize * 0.3);
      let offsetY = random(-gridSize * 0.3, gridSize * 0.3);
      let newFood = createVector(bodySegment.x + offsetX, bodySegment.y + offsetY);
      foodManager.foods.push(newFood);
      foodManager.foodColors.push({
        h: random(360),
        s: random(20, 50),
        b: random(80, 100)
      });
    }

    // generate items
    for (let i = 0; i < itemCount; i++) {
      let bodySegment = shuffledBody[foodCount + i];
      if (!bodySegment) break;
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
        // horizontal obstacle collision detection
        if (head.y >= obstacle.y - buffer && head.y <= obstacle.y + gridSize * 0.5 + buffer &&
          head.x >= obstacle.x - buffer && head.x <= obstacle.x + obstacle.length + buffer) {
          // specific collision detection
          if (Math.abs(head.y - obstacle.y) < buffer) {
            return 'horizontal-top';
          } else if (Math.abs(head.y - (obstacle.y + gridSize * 0.5)) < buffer) {
            return 'horizontal-bottom';
          } else if (Math.abs(head.x - obstacle.x) < buffer) {
            return 'horizontal-left';
          } else if (Math.abs(head.x - (obstacle.x + obstacle.length)) < buffer) {
            return 'horizontal-right';
          }
          return 'horizontal';
        }
      } else {
        // vertical obstacle collision detection
        if (head.x >= obstacle.x - buffer && head.x <= obstacle.x + gridSize * 0.5 + buffer &&
          head.y >= obstacle.y - buffer && head.y <= obstacle.y + obstacle.length + buffer) {
          // specific collision detection
          if (Math.abs(head.x - obstacle.x) < buffer) {
            return 'vertical-left'; 
          } else if (Math.abs(head.x - (obstacle.x + gridSize * 0.5)) < buffer) {
            return 'vertical-right'; 
          } else if (Math.abs(head.y - obstacle.y) < buffer) {
            return 'vertical-top'; 
          } else if (Math.abs(head.y - (obstacle.y + obstacle.length)) < buffer) {
            return 'vertical-bottom'; 
          }
          return 'vertical'; 
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

    if (head.x <= boundary.xMin) return 'left';
    if (head.x >= boundary.xMax) return 'right';
    if (head.y <= boundary.yMin) return 'top';
    if (head.y >= boundary.yMax) return 'bottom';
    return false;
  }


  changeDirection(collisionType) {
    switch(collisionType) {
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
        this.direction.y *= -1; 
        break;
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
        this.direction.x *= -1; 
        break;
      default:
        this.direction.rotate(random(-PI/4, PI/4));
    }

    this.direction.normalize();
    this.direction.rotate(random(-PI/4, PI/4));

    // randomly adjust the direction slightly to avoid getting stuck
    this.body[0].x += this.direction.x * gridSize * 0.2;
    this.body[0].y += this.direction.y * gridSize * 0.2;

    this.moveTowardsFood(false);

  }

  moveTowardsFood(obstacleCollision) {
    let targetDirection = this.direction.copy();

    if (!obstacleCollision || this.targetFood === null) {
      this.findRandomNearestFood(foodManager.foods);
    }

    if (this.targetFood) {
      let dirToFood = p5.Vector.sub(this.targetFood, this.body[0]);
      if (dirToFood.mag() > 0) {
        dirToFood.normalize();
        let futurePos = p5.Vector.add(this.body[0], p5.Vector.mult(dirToFood, gridSize));

        // predict collision with obstacles
        let wouldCollide = this.predictCollision(futurePos);

        if (!wouldCollide) {
          // use weighting to adjust the direction towards food
          let newDir = p5.Vector.lerp(this.direction, dirToFood, this.foodPreference);
          newDir.normalize();
          this.direction = newDir;
          return true; // turned towards food successfully
        }
      }
    }

    // if not turning towards food, randomly change direction
    if (this.turnCounter > this.maxTurnDelay) {
      this.direction.rotate(random(-PI/4, PI/4));
      this.turnCounter = 0;
      this.maxTurnDelay = floor(random(20, 60));
      this.direction.lerp(targetDirection, 0.1);
      this.direction.normalize();
    }

    return false;
  }

  predictCollision(position) {
    // collision detection with boundaries
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

    // collision detection with obstacles
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
