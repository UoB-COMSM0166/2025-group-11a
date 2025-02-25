let playerSnake;
let foodManager;
let gameMap;
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

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('main');
  frameRate(30);
  initGame();
  createUI();
}

function initGame() {
  playerSnake = new PlayerSnake();
  smallSnakes = [];
  for (let i = 0; i < 5; i++) {
    smallSnakes.push(new AISnake()); // 生成5条AI小蛇
  }
  foodManager = new FoodManager();
  gameMap = new GameMap(gridSize, mapSize, borderSize);
  foodManager.generateFood(200);
  score = 0;
  gameOver = false;
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
    gameStarted = true;
    document.getElementById('startScreen').style.display = 'none';
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
}

function draw() {
  if (!gameStarted) {
    return;
  }
  
  background(20);
  
  if (gameOver) {
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
    if (playerSnake.checkCollisionWithAISnake(smallSnakes[i])) {
      gameOver = true;
    }
  }
  
  // 检查食物数量，如果过少则生成更多
  if (foodManager.foods.length < 100) {
    foodManager.generateFood(10);
  }
  
  if (!gameOver) {
    drawBoundaryWarning();
  }
  
  playerSnake.updateDirection();
  playerSnake.move();
  
  if (playerSnake.checkBoundaryCollision()) {
    gameOver = true;
  }
  
  // 检查并处理食物碰撞，返回吃到的食物数量
  let foodEaten = playerSnake.checkFoodCollision(foodManager.foods);
  if (foodEaten > 0) {
    score += foodEaten;
    document.getElementById('scoreDisplay').innerHTML = `Score: ${score}`;
  }
  
  playerSnake.draw();
  foodManager.drawFoods();
  gameMap.drawBoundary();
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
  document.getElementById('gameOverScreen').style.visibility = 'hidden';
  initGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}