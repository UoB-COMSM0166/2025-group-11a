let playerSnake;
let foodManager;
let obstacleManager;
let itemManager;
let gameMap;
let bannerManager;
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
let currentMap = 'default';
let isPaused = false; // 记录游戏是否暂停

let gameState = false; // 记录是否开始游戏
let pauseBtn = null;  // 将暂停按钮提前
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('main');
  frameRate(30);
  createUI();
  initGame();
}
/*
function initGame() {

  // // 清理残留对象
  // if (foodManager) foodManager.foods = [];
  // if (obstacleManager) obstacleManager.obstacles = [];
  // if (itemManager) itemManager.items = [];
  // if (gameMap) {
  //   gameMap.swampManager.swamps = [];
  //   gameMap.fogManager.fogs = [];
  //   gameMap.teleportManager.teleports = [];
  // }

  playerSnake = new PlayerSnake();
  smallSnakes = [];
  playerSnake.isInvincible = true; // 游戏刚开始时玩家蛇处于无敌状态
  playerSnake.invincibleDuration = 60;


  // 根据难度模式调整参数
  let aiSnakeCount = difficultyMode === 'hard' ? 10 : 5;
  let foodCount = difficultyMode === 'hard' ? 50 : 200;
  let obstacleCount = difficultyMode === 'hard' ? 30 : 10;

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


  for (let i = 0; i < aiSnakeCount; i++) {
    smallSnakes.push(new AISnake());
  }

  if (gameStarted) {
    // 根据地图选择初始化
    if(currentMap === 'swamp') {
      gameMap.generateSwamps(); // 生成沼泽地形
      gameMap.drawSwamps(); // 绘制沼泽地形
    }else if (currentMap === 'fog') {
      gameMap.generateFogs(); // 生成迷雾
      gameMap.drawFogs();
    }else if (currentMap === 'teleport') {
      gameMap.generateTeleports(); // 生成传送点
      gameMap.drawTeleports(); // 绘制传送点
    }
  }
}*/
// 在initGame函数中初始化bannerManager和玩家蛇长度标志
function initGame() {
  playerSnake = new PlayerSnake();
  smallSnakes = [];
  playerSnake.isInvincible = true; // 游戏刚开始时玩家蛇处于无敌状态
  playerSnake.invincibleDuration = 60;

  // 添加玩家长度通知标记
  playerSnake.lengthNotified5 = false;
  playerSnake.lengthNotified10 = false;
  playerSnake.lengthNotified20 = false;
  playerSnake.lengthNotified50 = false;

  // 根据难度模式调整参数
  let aiSnakeCount = difficultyMode === 'hard' ? 10 : 5;
  let foodCount = difficultyMode === 'hard' ? 50 : 200;
  let obstacleCount = difficultyMode === 'hard' ? 30 : 10;

  foodManager = new FoodManager();
  obstacleManager = new ObstacleManager();
  itemManager = new ItemManager();
  gameMap = new GameMap(gridSize, mapSize, borderSize);
  bannerManager = new BannerManager(); // 初始化横幅管理器

  foodManager.generateFood(foodCount);
  obstacleManager.generateObstacle(obstacleCount);
  itemManager.generateItem(10);
  score = 0;
  gameOver = false;
  document.getElementById('scoreDisplay').innerHTML = `Score: ${score}`;

  // 显示游戏开始横幅
  if (gameStarted) {
    // 游戏开始时的横幅提示
    bannerManager.addBanner(`游戏开始：${difficultyMode.toUpperCase()} 模式`, 'normal');

    // 根据地图类型显示相应的横幅
    if(currentMap === 'default') {
      bannerManager.addBanner("标准地图 - 祝你好运!", 'normal');
    } else if(currentMap === 'swamp') {
      bannerManager.addBanner("沼泽地图 - 小心被减速!", 'warning');
      gameMap.generateSwamps();
      gameMap.drawSwamps();
    } else if(currentMap === 'fog') {
      bannerManager.addBanner("迷雾地图 - 能见度受限!", 'warning');
      gameMap.generateFogs();
      gameMap.drawFogs();
    } else if(currentMap === 'teleport') {
      bannerManager.addBanner("传送地图 - 寻找传送点!", 'buff');
      gameMap.generateTeleports();
      gameMap.drawTeleports();
    }
  }

  for (let i = 0; i < aiSnakeCount; i++) {
    smallSnakes.push(new AISnake());
  }
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
    document.getElementById('mapSelectScreen').style.display = 'flex';
    // showDifficultySelection();
    // document.getElementById('difficultyScreen').style.display = 'block';
  });
  let helpButton = createButton('View Help')
  helpButton.parent(startScreen);
  helpButton.class('help_btn')
  helpButton.mousePressed(() => {
    document.getElementById('HelpPage').style.visibility = 'visible'
  })

  // 创建游戏继续页面 start
  let escBtnPage = createDiv('')
  escBtnPage.id('escBtnPage')
  escBtnPage.parent('main');
  let escButtom1 = createButton('RESUME GAME')
  let escButtom2 = createButton('GO HOME')

  escButtom1.parent(escBtnPage)
  escButtom2.parent(escBtnPage)
  escButtom1.mousePressed(() => {
    isPaused = false
    pauseBtn.html(isPaused ? 'RESUME' : 'PAUSE'); // 更新按钮文本
    document.getElementById('scoreDisplay').style.visibility = 'visible';
    document.querySelector('.button-container').style.visibility = 'visible';
    document.getElementById('escBtnPage').style.visibility = 'hidden'
  })
  escButtom2.mousePressed(() => {
    clear()
    isPaused = false
    pauseBtn.html(isPaused ? 'RESUME' : 'PAUSE'); // 更新按钮文本
    restartGame()
  })
  // 创建游戏继续页面 end

  // 创建游戏帮助页面 start
  let HelpPage = createDiv('')
  HelpPage.id('HelpPage')
  HelpPage.parent('main');
  createElement('h1', 'SNAKE GAME').parent(HelpPage);
  createElement('p', 'This report aims to provide a comprehensive overview of the progress made in ' +
    'the development of our company\'s new mobile app as of [report date]. The project, which commenced' +
    ' on [start date], has been progressing through various stages, with the primary goal of delivering' +
    ' a high - quality, user - friendly mobile application within the scheduled timeline.').parent(HelpPage);
  let closeHelpButton = createButton('CLOSE');
  closeHelpButton.parent(HelpPage);
  closeHelpButton.mousePressed(() => {
    document.getElementById('HelpPage').style.visibility = 'hidden'
  })
  // 创建游戏帮助页面 end

  // 创建地图选择界面
  let mapSelectScreen = createDiv('');
  mapSelectScreen.id('mapSelectScreen');
  mapSelectScreen.style('display', 'none');
  mapSelectScreen.parent('main');

  let mapTitle = createElement('h2', 'MAP');
  mapTitle.parent(mapSelectScreen);

  // 默认地图按钮
  let defaultMapBtn = createButton('DEFAULT');
  defaultMapBtn.parent(mapSelectScreen);
  defaultMapBtn.mousePressed(() => {
    currentMap = 'default';
    showDifficultySelection();
  });

  // 沼泽地图按钮
  let swampMapBtn = createButton('SWAMP');
  swampMapBtn.parent(mapSelectScreen);
  swampMapBtn.mousePressed(() => {
    currentMap = 'swamp';
    showDifficultySelection();
  });

  // 迷雾地图按钮
  let fogMapBtn = createButton('FOG');
  fogMapBtn.parent(mapSelectScreen);
  fogMapBtn.mousePressed(() => {
    currentMap = 'fog';
    showDifficultySelection();
  });

  let teleportMapBtn = createButton('TELEPORT');
  teleportMapBtn.parent(mapSelectScreen);
  teleportMapBtn.mousePressed(() => {
    currentMap = 'teleport';
    showDifficultySelection();
  });

  let mapButtonContainer = createDiv('');
  mapButtonContainer.class('button-row');
  mapButtonContainer.parent(mapSelectScreen);
  defaultMapBtn.parent(mapButtonContainer);
  swampMapBtn.parent(mapButtonContainer);

  // 难度选择
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

  //添加暂停按钮
  pauseBtn = createButton('PAUSE');
  pauseBtn.parent(buttonContainer);
  pauseBtn.mousePressed(() => {
    isPaused = !isPaused; // 切换状态
    pauseBtn.html(isPaused ? 'RESUME' : 'PAUSE'); // 更新按钮文本
  });

  // 创建分数显示
  let scoreDiv = createDiv('score: 0');
  scoreDiv.class('score');
  scoreDiv.id('scoreDisplay');
  scoreDiv.parent('main');

  // 初始隐藏分数和重新开始按钮，直到游戏真正开始
  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
}
/*
function draw() {
  if (!gameStarted) {
    return;
  }

  if (isPaused) {
    return; // 如果暂停，跳过游戏逻辑
  }

  background(20);
  translateCenter();


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


  if (currentMap === 'swamp') {
    gameMap.drawSwamps(); // 新增沼泽绘制
  }
  // 绘制传送点
  if (currentMap === 'teleport') {
    gameMap.drawTeleports();

    // 检查玩家是否触发传送
    gameMap.teleportManager.checkTeleport(playerSnake);
    // 检查AI蛇是否触发传送
    for (let snake of smallSnakes) {
      gameMap.teleportManager.checkTeleport(snake);
    }
  }
  if (this.isFlashing) {
    this.flashDuration--;
    if (this.flashDuration <= 0) {
      this.isFlashing = false;
    }

    // 闪烁效果只在某些帧绘制
    if (this.flashDuration % 4 >= 2) {
      // 不绘制蛇（实现闪烁）
      return;
    }
  }
  // 更新和绘制AI小蛇
  for (let i = smallSnakes.length - 1; i >= 0; i--) {
    smallSnakes[i].draw();
    smallSnakes[i].update();
    
    if (smallSnakes[i].length < 10) {
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
  //逐帧减少玩家道具时间
  if (playerSnake.isInvincible) {
    playerSnake.invincibleDuration--;
    if (playerSnake.invincibleDuration <= 0) {
      playerSnake.isInvincible = false; // 无敌时间结束
    }
  }
  if (playerSnake.isEnlarged) {
    playerSnake.enlargeDuration--;
    if (playerSnake.enlargeDuration <= 0) {
      playerSnake.isEnlarged = false;
    }
  }


  // 检查玩家身上是否有道具
  let result = playerSnake.checkItemCollision(itemManager.items);
  if (result.collided) {
    if (result.type === "stamina") {
      itemManager.activateStamina();
    }
    if (result.type === "invincible") {
      itemManager.activateInvincible();
    }
    if (result.type === "enlarge") {
      itemManager.activateEnlarge();
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

  // 实现无敌闪烁
  if (playerSnake.isInvincible) {
    if (playerSnake.invincibleDuration % 10 >= 3) {
      playerSnake.draw();
    }
  } else {
    playerSnake.draw();
  }

  // 实现觅食范围变大的特效
  if (playerSnake.isEnlarged) {
    let head = playerSnake.body[0];
    push();
    let baseRadius = gridSize * 2.2;
    let pulseAmount = map(sin(frameCount * 0.1), -1, 1, 0, 0.2);
    let currentRadius = baseRadius * (1 + pulseAmount);
    
    for (let r = currentRadius; r > currentRadius * 0.7; r -= 2) {
      let alpha = map(r, currentRadius, currentRadius * 0.7, 50, 150);
      stroke(50, 200, 50, alpha);
      strokeWeight(1.5);
      noFill();
      ellipse(head.x, head.y, r * 2);
    }
    
    let particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      let angle = map(i, 0, particleCount, 0, TWO_PI) + frameCount * 0.02;
      let orbitRadius = currentRadius * 0.85;
      let x = head.x + cos(angle) * orbitRadius;
      let y = head.y + sin(angle) * orbitRadius;
      noStroke();
      fill(100, 255, 100, 200);
      let particleSize = 4 + sin(frameCount * 0.2 + i) * 2;
      ellipse(x, y, particleSize);
    }
    
    noStroke();
    let glowRadius = gridSize * 1.5;
    for (let r = glowRadius; r > 0; r -= 4) {
      let alpha = map(r, glowRadius, 0, 0, 70);
      fill(80, 220, 80, alpha);
      ellipse(head.x, head.y, r * 2);
    }
    pop();
  }

  if (!gameOver && !gameWon && gameStarted) {
      itemManager.updateTooltips();
  }

  if (currentMap === 'fog') {
    gameMap.drawFogs();
  }

  resetMatrix();
  if (!gameOver && !gameWon && gameStarted) {
    itemManager.updateStatusDisplay(playerSnake);
    itemManager.drawStatusDisplay();
  }
}*/
// 在draw函数中适当位置添加更新和绘制横幅的代码
function draw() {
  if (!gameStarted) {
    return;
  }

  if (isPaused) {
    return; // 如果暂停，跳过游戏逻辑
  }

  background(20);
  translateCenter();

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

  // 更新横幅状态
  bannerManager.update();

  // 在平移前绘制固定网格
  push();
  gameMap.drawFixedGrid();
  pop();

  if (currentMap === 'swamp') {
    gameMap.drawSwamps();
  }

  if (currentMap === 'teleport') {
    gameMap.drawTeleports();

    // 检查是否触发传送并显示横幅
    if (gameMap.teleportManager.checkTeleport(playerSnake)) {
      bannerManager.addBanner("传送成功！", 'buff');
    }

    // 检查AI蛇是否触发传送
    for (let snake of smallSnakes) {
      gameMap.teleportManager.checkTeleport(snake);
    }
  }

  if (this.isFlashing) {
    this.flashDuration--;
    if (this.flashDuration <= 0) {
      this.isFlashing = false;
    }

    // 闪烁效果只在某些帧绘制
    if (this.flashDuration % 4 >= 2) {
      // 不绘制蛇（实现闪烁）
      return;
    }
  }

  // 更新和绘制AI小蛇
  for (let i = smallSnakes.length - 1; i >= 0; i--) {
    smallSnakes[i].draw();
    smallSnakes[i].update();

    if (smallSnakes[i].body.length < 3) {
      smallSnakes[i] = new AISnake();
      bannerManager.addBanner("新的AI蛇出现了!", 'normal');
    }

    // 检查玩家与AI小蛇的碰撞
    if (playerSnake.checkCollisionWithAISnake(smallSnakes[i]) && !playerSnake.isInvincible) {
      bannerManager.addBanner("你撞到了AI蛇！游戏结束", 'warning');
      gameOver = true;
    }

    // AI蛇头碰到玩家蛇身体后，ai蛇死亡-移除自己并生成随机数量的食物
    if (smallSnakes[i].checkCollisionWithPlayer(playerSnake)) {
      bannerManager.addBanner("击杀AI蛇！+10分", 'achievement');
      smallSnakes[i].die(); // 让 AI蛇死亡生成食物
      smallSnakes.splice(i, 1); // 删除 AI蛇

      // 增加分数奖励
      score += 10;
      document.getElementById('scoreDisplay').innerHTML = `Score: ${score}`;
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

  // 检查玩家蛇的长度，达到特定长度时显示提示
  let playerLength = playerSnake.body.length;
  if (playerLength >= 5 && !playerSnake.lengthNotified5) {
    bannerManager.addBanner("蛇的长度已达到5!", 'achievement');
    playerSnake.lengthNotified5 = true; // 标记已经通知过
  } else if (playerLength >= 10 && !playerSnake.lengthNotified10) {
    bannerManager.addBanner("蛇的长度已达到10!", 'achievement');
    playerSnake.lengthNotified10 = true;
  } else if (playerLength >= 20 && !playerSnake.lengthNotified20) {
    bannerManager.addBanner("蛇的长度已达到20!", 'achievement');
    playerSnake.lengthNotified20 = true;
  } else if (playerLength >= 50 && !playerSnake.lengthNotified50) {
    bannerManager.addBanner("蛇的长度已达到50!", 'achievement');
    playerSnake.lengthNotified50 = true;
  }

  if (playerSnake.checkBoundaryCollision()) {
    bannerManager.addBanner("你撞到了边界！游戏结束", 'warning');
    gameOver = true;
  }

  if (playerSnake.checkObstacleCollision(obstacleManager.obstacles) && !playerSnake.isInvincible) {
    bannerManager.addBanner("你撞到了障碍物！游戏结束", 'warning');
    gameOver = true;
  }

  //逐帧减少玩家道具时间
  if (playerSnake.isInvincible) {
    playerSnake.invincibleDuration--;
    if (playerSnake.invincibleDuration <= 0) {
      playerSnake.isInvincible = false; // 无敌时间结束
      bannerManager.addBanner("无敌效果已结束", 'normal');
    }
  }
  if (playerSnake.isEnlarged) {
    playerSnake.enlargeDuration--;
    if (playerSnake.enlargeDuration <= 0) {
      playerSnake.isEnlarged = false;
      bannerManager.addBanner("扩大范围效果已结束", 'normal');
    }
  }

  // 检查玩家身上是否有道具
  let result = playerSnake.checkItemCollision(itemManager.items);
  if (result.collided) {
    if (result.type === "stamina") {
      itemManager.activateStamina();
      // 横幅提示在itemManager.activateStamina()中已调用
    }
    if (result.type === "invincible") {
      itemManager.activateInvincible();
      // 横幅提示在itemManager.activateInvincible()中已调用
    }
    if (result.type === "enlarge") {
      itemManager.activateEnlarge();
      // 横幅提示在itemManager.activateEnlarge()中已调用
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

  // 实现无敌闪烁
  if (playerSnake.isInvincible) {
    if (playerSnake.invincibleDuration % 10 >= 3) {
      playerSnake.draw();
    }
  } else {
    playerSnake.draw();
  }

  // 实现觅食范围变大的特效
  if (playerSnake.isEnlarged) {
    let head = playerSnake.body[0];
    push();
    let baseRadius = gridSize * 2.2;
    let pulseAmount = map(sin(frameCount * 0.1), -1, 1, 0, 0.2);
    let currentRadius = baseRadius * (1 + pulseAmount);

    for (let r = currentRadius; r > currentRadius * 0.7; r -= 2) {
      let alpha = map(r, currentRadius, currentRadius * 0.7, 50, 150);
      stroke(50, 200, 50, alpha);
      strokeWeight(1.5);
      noFill();
      ellipse(head.x, head.y, r * 2);
    }

    let particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      let angle = map(i, 0, particleCount, 0, TWO_PI) + frameCount * 0.02;
      let orbitRadius = currentRadius * 0.85;
      let x = head.x + cos(angle) * orbitRadius;
      let y = head.y + sin(angle) * orbitRadius;
      noStroke();
      fill(100, 255, 100, 200);
      let particleSize = 4 + sin(frameCount * 0.2 + i) * 2;
      ellipse(x, y, particleSize);
    }

    noStroke();
    let glowRadius = gridSize * 1.5;
    for (let r = glowRadius; r > 0; r -= 4) {
      let alpha = map(r, glowRadius, 0, 0, 70);
      fill(80, 220, 80, alpha);
      ellipse(head.x, head.y, r * 2);
    }
    pop();
  }

  if (!gameOver && !gameWon && gameStarted) {
    itemManager.updateTooltips();
  }

  if (currentMap === 'fog') {
    gameMap.drawFogs();
  }

  // 绘制横幅
  resetMatrix();
  if (!gameOver && !gameWon && gameStarted) {
    itemManager.updateStatusDisplay(playerSnake);
    itemManager.drawStatusDisplay();
    bannerManager.draw(); // 绘制横幅
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
    xMin: -width * mapSize / 2,
    xMax: width * mapSize / 2,
    yMin: -height * mapSize / 2,
    yMax: height * mapSize / 2
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
  rect(-width * mapSize / 2, -height * mapSize / 2,
    width * mapSize, height * mapSize);
  pop();
}
/*
function restartGame() {

  
  // 隐藏游戏相关界面
  document.getElementById('gameOverScreen').style.visibility = 'hidden';
  document.getElementById('gameWonScreen').style.visibility = 'hidden';
  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
  document.getElementById('startScreen').style.display = 'flex';
  document.getElementById('difficultyScreen').style.display = 'none';

  document.getElementById('escBtnPage').style.visibility = 'hidden'

  // 完全重置游戏状态
  gameStarted = false;
  gameOver = false;
  gameWon = false;
  gameState = false;
  isPaused = false;
  score = 0;

  // 清理现有游戏对象
  if (playerSnake) playerSnake = null;
  smallSnakes = [];
  if (foodManager) foodManager.foods = [];
  if (obstacleManager) obstacleManager.obstacles = [];
  if (itemManager) itemManager.items = [];
  if (gameMap) {
    if (gameMap.swampManager) gameMap.swampManager.swamps = [];
    if (gameMap.fogManager) gameMap.fogManager.fogs = [];
    if (gameMap.teleportManager) gameMap.teleportManager.teleports = [];
    gameMap = null;
  }

  document.getElementById('gameOverScreen').style.visibility = 'hidden';
  document.getElementById('gameWonScreen').style.visibility = 'hidden';
  document.getElementById('escBtnPage').style.visibility = 'hidden';
  gameWon = false;

  // foodManager = new FoodManager();
  // obstacleManager = new ObstacleManager();
  // itemManager = new ItemManager();
  // gameMap = new GameMap(gridSize, mapSize, borderSize); // 强制创建新实例


  // 清除画布
  // clear();
  // background(20);
  // redraw(); // 立即刷新
  // 解除之前的draw循环
  // noLoop(); // 停止p5.js的draw循环
  // setTimeout(() => loop(), 100); // 稍后重新启动循环
  

  initGame();
}*/

// 修改restartGame函数，重置玩家蛇的长度通知标志
function restartGame() {
  // 隐藏游戏相关界面
  document.getElementById('gameOverScreen').style.visibility = 'hidden';
  document.getElementById('gameWonScreen').style.visibility = 'hidden';
  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
  document.getElementById('startScreen').style.display = 'flex';
  document.getElementById('difficultyScreen').style.display = 'none';

  document.getElementById('escBtnPage').style.visibility = 'hidden'

  // 完全重置游戏状态
  gameStarted = false;
  gameOver = false;
  gameWon = false;
  gameState = false;
  isPaused = false;
  score = 0;

  // 清理现有游戏对象
  if (playerSnake) {
    // 重置长度标志
    playerSnake.lengthNotified5 = false;
    playerSnake.lengthNotified10 = false;
    playerSnake.lengthNotified20 = false;
    playerSnake.lengthNotified50 = false;
    playerSnake = null;
  }

  smallSnakes = [];
  if (foodManager) foodManager.foods = [];
  if (obstacleManager) obstacleManager.obstacles = [];
  if (itemManager) itemManager.items = [];
  if (bannerManager) bannerManager.clearBanners(); // 清除所有横幅
  if (gameMap) {
    if (gameMap.swampManager) gameMap.swampManager.swamps = [];
    if (gameMap.fogManager) gameMap.fogManager.fogs = [];
    if (gameMap.teleportManager) gameMap.teleportManager.teleports = [];
    gameMap = null;
  }

  document.getElementById('gameOverScreen').style.visibility = 'hidden';
  document.getElementById('gameWonScreen').style.visibility = 'hidden';
  document.getElementById('escBtnPage').style.visibility = 'hidden';
  gameWon = false;

  initGame();
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
  let offsetY = -100;

  // 获取蛇头部的位置
  let head = playerSnake.body[0];
  let x = head.x - barWidth / 2;
  let y = head.y + offsetY;

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
  document.getElementById('mapSelectScreen').style.display = 'none';
  document.getElementById('difficultyScreen').style.display = 'block';
  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
}

function startGame() {
  gameState = true
  // 隐藏所有非游戏界面
  document.getElementById('difficultyScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('mapSelectScreen').style.display = 'none';

  // 显示分数和重新开始按钮
  document.getElementById('scoreDisplay').style.visibility = 'visible';
  document.querySelector('.button-container').style.visibility = 'visible';

  // 重置游戏状态
  gameStarted = true;
  gameOver = false;
  gameWon = false;

  initGame();
}

// 键盘事件创建
// isPaused
function keyPressed() {
  if (gameState) {
    if (keyCode == 27) {
      isPaused = true
      pauseBtn.html(isPaused ? 'RESUME' : 'PAUSE'); // 更新按钮文本
      document.getElementById('escBtnPage').style.visibility = 'visible';
      document.getElementById('scoreDisplay').style.visibility = 'hidden';
      document.querySelector('.button-container').style.visibility = 'hidden';
    }
  }
}
