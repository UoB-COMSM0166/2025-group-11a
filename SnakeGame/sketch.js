let playerSnake;
let foodManager;
let obstacleManager;
let itemManager;
let gameMap;
let gameWon = false;
let gameOver = false;
let gameStarted = false;
let gridSize = 20;
let snakeSpeed = 5;
let smallSnakes = [];
let mapSize = 2; 
let borderSize = 1.8; 
let gridAlpha = 50; 
let visibleGridRange = 2; // 可见网格范围（单位：画布倍数）
let boundaryColor = [255, 0, 0]; 
let boundaryStroke = 2;        
let cornerSize = 20;            // 四角标识长度（像素）
let warningDistance = 500;      
let score = 0;
let difficultyMode = 'normal';

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('main');
  frameRate(30);
  createUI();
  initGame();
}

function initGame() {
  // 清理残留对象
  if(foodManager) foodManager.foods = [];
  if(obstacleManager) obstacleManager.obstacles = [];
  if(itemManager) itemManager.items = [];

  playerSnake = new PlayerSnake();
  smallSnakes = [];

  // 根据难度模式调整参数
  let aiSnakeCount = difficultyMode === 'hard' ? 10 : 5;
  let foodCount = difficultyMode === 'hard' ? 50 : 200;
  let obstacleCount = difficultyMode === 'hard' ? 30 : 10;

  for (let i = 0; i < aiSnakeCount; i++) {
    smallSnakes.push(new AISnake());
  }
  
  // foodManager.generateFood(foodCount);
  // obstacleManager.generateObstacle(obstacleCount);

  // for (let i = 0; i < 5; i++) {
  //   smallSnakes.push(new AISnake()); // 生成5条AI小蛇
  // }
  foodManager = new FoodManager();
  obstacleManager = new ObstacleManager();
  itemManager = new ItemManager();
  gameMap = new GameMap(gridSize, mapSize, borderSize);
  foodManager.generateFood(foodCount);
  obstacleManager.generateObstacle(obstacleCount);
  itemManager.generateItem(10);
  score = 0;
  gameOver = false;
  document.getElementById('scoreDisplay').innerHTML = `Score: ${score}`;
}

function createUI() {
  // 创建游戏开始屏幕
  let startScreen = createDiv('');
  startScreen.id('startScreen');
  startScreen.parent('main');
  
  let title = createElement('h1', 'SNAKE GAME');
  title.parent(startScreen);
  
  let instructions = createP('Use mouse to control the snake!');
  instructions.parent(startScreen);
  
  let startButton = createButton('START GAME');
  startButton.parent(startScreen);
  startButton.mousePressed(() => {
    document.getElementById('startScreen').style.display = 'none';
    showDifficultySelection();
    // document.getElementById('difficultyScreen').style.display = 'block';
  });

  let difficultyScreen = createDiv('');
  difficultyScreen.id('difficultyScreen');
  difficultyScreen.style('display', 'none');
  difficultyScreen.parent('main');

  let difficultyTitle = createElement('h2', 'DIFFICULTY：');
  difficultyTitle.parent(difficultyScreen);

  let normalButton = createButton('NORMAL');
  normalButton.parent(difficultyScreen);
  normalButton.mousePressed(() => {
    difficultyMode = 'normal';
    startGame();
  });
  let hardButton = createButton('HARD');
  hardButton.parent(difficultyScreen);
  hardButton.mousePressed(() => {
    difficultyMode = 'hard';
    startGame();
  });
  
  // 创建游戏结束屏幕
  let gameOverScreen = createDiv('');
  gameOverScreen.id('gameOverScreen');
  gameOverScreen.parent('main');
  
  let gameOverTitle = createElement('h1', 'GAME OVER');
  gameOverTitle.parent(gameOverScreen);
  
  let scoreDisplay = createP('');
  scoreDisplay.id('finalScore');
  scoreDisplay.parent(gameOverScreen);
  
  let restartButton = createButton('RESTART');
  restartButton.parent(gameOverScreen);
  restartButton.mousePressed(restartGame);

  // 创建游戏胜利屏幕
  let gameWonScreen = createDiv('');
  gameWonScreen.id('gameWonScreen');
  gameWonScreen.parent('main');
  
  let gameWonTitle = createElement('h1', 'YOU WIN!');
  gameWonTitle.parent(gameWonScreen);
  
  let winScoreDisplay = createP('');
  winScoreDisplay.id('finalScore');
  winScoreDisplay.parent(gameWonScreen);
  
  let winRestartButton = createButton('RESTART');
  winRestartButton.parent(gameWonScreen);
  winRestartButton.mousePressed(restartGame);
  
  // 创建右上角控制按钮
  let buttonContainer = createDiv('');
  buttonContainer.class('button-container');
  buttonContainer.parent('main');
  
  let restartBtn = createButton('RESTART');
  restartBtn.parent(buttonContainer);
  restartBtn.mousePressed(restartGame);
  
  // 创建分数显示
  let scoreDiv = createDiv('score: 0');
  scoreDiv.class('score');
  scoreDiv.id('scoreDisplay');
  scoreDiv.parent('main');

  // 初始隐藏分数和重新开始按钮，直到游戏真正开始
  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
}

function draw() {
  if (!gameStarted) {
    return;
  }
  
  background(20);

  if (score >= 20) {
    gameWon = true;
  }

  if (gameWon) {
    document.getElementById('scoreDisplay').style.visibility = 'hidden';
    document.querySelector('.button-container').style.visibility = 'hidden';
    document.getElementById('gameWonScreen').style.visibility = 'visible';
    document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;
    return;
  }
  
  if (gameOver) {
    document.getElementById('scoreDisplay').style.visibility = 'hidden';
    document.querySelector('.button-container').style.visibility = 'hidden';
    document.getElementById('gameOverScreen').style.visibility = 'visible';
    document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;
    return;
  }
  
  // 在平移前绘制固定网格
  push(); 
  gameMap.drawFixedGrid();
  pop(); 
  translateCenter();
  
  // 更新和绘制AI小蛇
  for (let i = smallSnakes.length - 1; i >= 0; i--) {
    smallSnakes[i].update();
    smallSnakes[i].draw();
    
    // 检查AI小蛇是否超出边界，如果是则重新生成
    if (smallSnakes[i].checkBoundaryCollision(true)) {
      smallSnakes[i] = new AISnake();
    }
    
    // 检查玩家与AI小蛇的碰撞
    if (playerSnake.checkCollisionWithAISnake(smallSnakes[i]) && !playerSnake.isInvincible) {
      gameOver = true;
    }
    // AI蛇头碰到玩家蛇身体后，ai蛇死亡-移除自己并生成随机数量的食物
    if (smallSnakes[i].checkCollisionWithPlayer(playerSnake)) {
      smallSnakes[i].die(); // 让 AI蛇死亡生成食物
      smallSnakes.splice(i, 1); // 删除 AI蛇
      continue; // 跳过后续逻辑，防止报错
    }
    drawStaminaBar();
  }
  
  // 检查食物数量，如果过少则生成更多
  if (difficultyMode === 'normal') {
    if (foodManager.foods.length < 100) {
      foodManager.generateFood(10);
    }
  }
  if (itemManager.items.length < 5) {
    itemManager.generateItem(5);
  }
  
  if (!gameOver) {
    drawBoundaryWarning();
  }
  
  playerSnake.updateDirection();
  playerSnake.move();
  
  if (playerSnake.checkBoundaryCollision()) {
    gameOver = true;
  }

  if (playerSnake.checkObstacleCollision(obstacleManager.obstacles) && !playerSnake.isInvincible) {
    gameOver = true;
  }

  if (playerSnake.isInvincible) {
    playerSnake.invincibleDuration--;
    if (playerSnake.invincibleDuration <= 0) {
      playerSnake.isInvincible = false; // 无敌时间结束
    }
  }

  let result = playerSnake.checkItemCollision(itemManager.items);

  if (result.collided) {
    if (result.type === "stamina") {
      playerSnake.chargeStamina();
    }
    if (result.type === "invincible") {
      playerSnake.activateInvincibility();
    }
  }
  
  // 检查并处理食物碰撞，返回吃到的食物数量
  let foodEaten = playerSnake.checkFoodCollision(foodManager.foods);
  if (foodEaten > 0) {
    score += foodEaten;
    document.getElementById('scoreDisplay').innerHTML = `Score: ${score}`;
  }
 
  foodManager.drawFoods();
  obstacleManager.drawObstacles();
  itemManager.drawItems();
  gameMap.drawBoundary();
  if (playerSnake.isInvincible) {
    if (playerSnake.invincibleDuration % 10 >= 3) {
      playerSnake.draw();
    }
  } else {
    playerSnake.draw();
  }  
}

function translateCenter() {
  if (!playerSnake.body || playerSnake.body.length === 0) {
    return;
  }
  let head = playerSnake.body[0];
  translate(width / 2 - head.x, height / 2 - head.y);
}

function drawBoundaryWarning() {
  push();
  let edgeDist = 100; // 警示区域宽度
  let boundary = {
    xMin: -width * mapSize/2,
    xMax: width * mapSize/2,
    yMin: -height * mapSize/2,
    yMax: height * mapSize/2
  };

  let head = playerSnake.body[0];
  let warnIntensity = 0;

  // 计算与边界的距离
  let dx = min(head.x - boundary.xMin, boundary.xMax - head.x);
  let dy = min(head.y - boundary.yMin, boundary.yMax - head.y);
  let minDist = min(dx, dy);

  if (minDist < edgeDist) {
    warnIntensity = map(minDist, 0, edgeDist, 255, 0);
    fill(255, 0, 0, warnIntensity);
    noStroke();
    rectMode(CORNERS);
    rect(boundary.xMin, boundary.yMin, boundary.xMax, boundary.yMax);
  }
  pop();
}

function drawPulsingWarning() {
  push();
  let alpha = map(sin(frameCount * 0.1), -1, 1, 100, 255);
  stroke(255, 0, 0, alpha);
  strokeWeight(boundaryStroke * 2);
  noFill();
  rect(-width * mapSize/2, -height * mapSize/2,
      width * mapSize, height * mapSize);
  pop();
}

function restartGame() {
  // 隐藏游戏相关界面
  document.getElementById('gameOverScreen').style.visibility = 'hidden';
  document.getElementById('gameWonScreen').style.visibility = 'hidden';

  // 隐藏分数和重新开始按钮
  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
  
  // 显示开始界面 - 不需要额外设置样式，CSS会自动应用
  document.getElementById('startScreen').style.display = 'flex';
    
  // 如果显示了难度选择界面，也需要隐藏它
  document.getElementById('difficultyScreen').style.display = 'none';
  
  // 完全重置游戏状态
  gameStarted = false;
  gameOver = false;
  gameWon = false;
  
  // 清理现有游戏对象
  if(playerSnake) playerSnake = null;
  smallSnakes = [];
  // document.getElementById('gameOverScreen').style.visibility = 'hidden';
  // document.getElementById('gameWonScreen').style.visibility = 'hidden'; 
  // gameWon = false;
  // initGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawStaminaBar() {
  // 如果体力已满且鼠标未按住，则不显示体力条
  if (playerSnake.stamina >= playerSnake.maxStamina && !(mouseIsPressed && mouseButton === LEFT)) {
    return;
  }
  
  let barWidth = 100;
  let barHeight = 10;
  let offsetY = -100; // 体力条距离蛇头部的垂直偏移

  // 获取蛇头部的位置
  let head = playerSnake.body[0];
  let x = head.x - barWidth / 2; // 水平居中在蛇头部
  let y = head.y + offsetY; // 在蛇头部上方

  // 绘制背景条
  noStroke();
  fill(100, 100);
  rect(x, y, barWidth, barHeight);

  // 绘制体力条
  let staminaWidth = map(playerSnake.stamina, 0, playerSnake.maxStamina, 0, barWidth);
  // 根据体力状态设置颜色
  if (mouseIsPressed && mouseButton === LEFT && playerSnake.stamina > 0) {
    fill(0, 200, 200, 100); 
  } else {
    fill(100, 255, 100, 100); 
  }
  rect(x, y, staminaWidth, barHeight);

  // 绘制边框
  noFill();
  stroke(255);
  strokeWeight(2);
  rect(x, y, barWidth, barHeight);
  
}

function showDifficultySelection() {
  document.getElementById('difficultyScreen').style.display = 'block';
  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
}

function startGame() {
  // 隐藏所有非游戏界面
  document.getElementById('difficultyScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'none';

  // 显示分数和重新开始按钮
  document.getElementById('scoreDisplay').style.visibility = 'visible';
  document.querySelector('.button-container').style.visibility = 'visible';
  
  // 重置游戏状态
  gameStarted = true;
  gameOver = false;
  gameWon = false;
  
  initGame();
}
