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
let smallSnakes2 = [];
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
let swampBg;//背景图片
let desertBg;
let teleportBg;
let totalTime = 120;
let remainingTime;
let startTime;
let elapsed;
let pauseStartTime = 0;
let totalPausedTime = 0;
let gameOverReason = '';
let selectedColor = [120, 230, 120]; // 默认绿色
let selectedSnakeShape = 'circle'; // 默认形状
let shapes = ['circle', 'square', 'triangle'];
let autoSnakes = [];
let bannerManager;

function preload() {
  swampBg = loadImage('assets/pictures/swamp.jpg');
  desertBg = loadImage('assets/pictures/desert.jpg');
  teleportBg = loadImage('assets/pictures/teleport.jpg');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('main');
  frameRate(30);
  createUI();
  initGame();
}

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
  startTime = millis();
  totalPausedTime = 0;
  playerSnake = new PlayerSnake();
  smallSnakes = [];
  playerSnake.isInvincible = true; // 游戏刚开始时玩家蛇处于无敌状态
  playerSnake.invincibleDuration = 60;
  playerSnake.isInitialInvincibility = true;
  bannerManager = new BannerManager();

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
  if(smallSnakes2.length<16){
    for (let i = 0; i < 16; i++) {
      smallSnakes2.push(new AutoSnake());
    }
  }


  if (gameStarted) {
    // 根据地图选择初始化
    if(currentMap === 'swamp') {
      gameMap.generateSwamps(); // 生成沼泽地形
      gameMap.drawSwamps(); // 绘制沼泽地形
    }else if (currentMap === 'desert') {
      gameMap.generateDeserts(); // 生成迷雾
      gameMap.drawDeserts();
    }else if (currentMap === 'teleport') {
      gameMap.generateTeleports(); // 生成传送点
      gameMap.drawTeleports(); // 绘制传送点
    }
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
    isPaused = false; // 恢复游戏
    document.getElementById('scoreDisplay').style.visibility = 'visible';
    document.querySelector('.button-container').style.visibility = 'visible';
    document.getElementById('escBtnPage').style.visibility = 'hidden';
    totalPausedTime += millis() - pauseStartTime;
  });
  escButtom2.mousePressed(() => {
    clear()
    isPaused = false
    restartGame()
  })
  // 创建游戏继续页面 end

  // 创建游戏帮助页面 start
  let HelpPage = createDiv('')
  HelpPage.id('HelpPage')
  HelpPage.parent('main');
  createElement('h1', 'SNAKE GAME').parent(HelpPage);
  // createElement('p', 'This report aims to provide a comprehensive overview of the progress made in ' +
  //   'the development of our company\'s new mobile app as of [report date]. The project, which commenced' +
  //   ' on [start date], has been progressing through various stages, with the primary goal of delivering' +
  //   ' a high - quality, user - friendly mobile application within the scheduled timeline.').parent(HelpPage);
  createElement('p', '• Eating food can make the snake longer, and eating different props will get rewards').parent(HelpPage);
  createElement('p', '• Don\'t touch the borders and obstacles, and don\'t hit other snakes with your head').parent(HelpPage);
  createElement('p', '• The SWAMP level has a speed reduction zone').parent(HelpPage);
  createElement('p', '• The Desert level has a blind spot').parent(HelpPage);
  createElement('p', '• The TELEPORT level has a portal').parent(HelpPage);
  let closeHelpButton = createButton('CLOSE');
  closeHelpButton.parent(HelpPage);
  closeHelpButton.mousePressed(() => {
    document.getElementById('HelpPage').style.visibility = 'hidden'
  })
  // 创建游戏帮助页面 end

  // 创建蛇形象选择界面
  let snakeAppearanceScreen = createDiv('');
  snakeAppearanceScreen.id('snakeAppearanceScreen');
  snakeAppearanceScreen.style('display', 'none');
  snakeAppearanceScreen.parent('main');

  startButton.mousePressed(() => {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('snakeAppearanceScreen').style.display = 'flex';
  });

  let snakeAppearanceTitle = createElement('h2', 'CHOOSE YOUR SNAKE COLOR');
  snakeAppearanceTitle.parent(snakeAppearanceScreen);

  window.selectedColor = [...selectedColor];
  let previewGraphics = createImg('', 'Preview');
  previewGraphics.parent(snakeAppearanceScreen);
  previewGraphics.id('snakePreview');
  previewGraphics.style('margin', '10px');
  updatePreview();

  ['R', 'G', 'B'].forEach((channel, i) => {
    let row = createDiv('').parent(snakeAppearanceScreen);
    createSpan(channel + ': ').parent(row);
    let slider = createSlider(0, 255, selectedColor[i]);
    slider.class('color-slider');
    slider.parent(row);
    slider.input(() => {
      selectedColor[i] = slider.value();
      updatePreview();
    });
  });

  let confirmAppearanceBtn = createButton('CONFIRM');
  confirmAppearanceBtn.parent(snakeAppearanceScreen);

  confirmAppearanceBtn.mousePressed(() => {
    window.selectedColor = selectedColor;
    window.selectedSnakeShape = selectedSnakeShape;
    document.getElementById('snakeAppearanceScreen').style.display = 'none';
    document.getElementById('mapSelectScreen').style.display = 'flex';
  });

  // 创建地图选择界面
  let mapSelectScreen = createDiv('');
  mapSelectScreen.id('mapSelectScreen');
  mapSelectScreen.style('display', 'none');
  mapSelectScreen.parent('main');

  // 地图标题
  let mapTitle = createElement('h2', 'MAP');
  mapTitle.parent(mapSelectScreen);

  // 第一行按钮容器
  let firstRow = createDiv('');
  firstRow.class('button-row');
  firstRow.parent(mapSelectScreen);

  // 默认地图按钮
  let defaultMapBtn = createButton('DEFAULT');
  defaultMapBtn.parent(firstRow);
  defaultMapBtn.mousePressed(() => {
    currentMap = 'default';
    showDifficultySelection();
  });

  // 沼泽地图按钮
  let swampMapBtn = createButton('SWAMP');
  swampMapBtn.parent(firstRow);
  swampMapBtn.mousePressed(() => {
    currentMap = 'swamp';
    showDifficultySelection();
  });

  // 第二行按钮容器
  let secondRow = createDiv('');
  secondRow.class('button-row');
  secondRow.parent(mapSelectScreen);

  // 沙漠地图按钮
  let desertMapBtn = createButton('DESERT');
  desertMapBtn.parent(secondRow);
  desertMapBtn.mousePressed(() => {
    currentMap = 'desert';
    showDifficultySelection();
  });

  // 传送地图按钮
  let teleportMapBtn = createButton('TELEPORT');
  teleportMapBtn.parent(secondRow);
  teleportMapBtn.mousePressed(() => {
    currentMap = 'teleport';
    showDifficultySelection();
  });

  // 第三行按钮容器（返回按钮）
  let thirdRow = createDiv('');
  thirdRow.class('button-row');
  thirdRow.style('margin-top', '20px');
  thirdRow.parent(mapSelectScreen);

  // 添加返回按钮
  let backButtonMap = createButton('BACK');
  backButtonMap.parent(thirdRow);
  backButtonMap.class('back-button');
  backButtonMap.mousePressed(() => {
    document.getElementById('mapSelectScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
  });

  // 难度选择
  let difficultyScreen = createDiv('');
  difficultyScreen.id('difficultyScreen');
  difficultyScreen.style('display', 'none');
  difficultyScreen.parent('main');

  // 难度标题
  let difficultyTitle = createElement('h2', 'DIFFICULTY：');
  difficultyTitle.parent(difficultyScreen);

  // 第一行按钮容器
  let diffFirstRow = createDiv('');
  diffFirstRow.class('button-row');
  diffFirstRow.parent(difficultyScreen);

  // 普通难度按钮
  let normalButton = createButton('NORMAL');
  normalButton.parent(diffFirstRow);
  normalButton.mousePressed(() => {
    difficultyMode = 'normal';
    startGame();
  });

  // 困难难度按钮
  let hardButton = createButton('HARD');
  hardButton.parent(diffFirstRow);
  hardButton.mousePressed(() => {
    difficultyMode = 'hard';
    startGame();
  });

  // 第二行按钮容器（返回按钮）
  let diffSecondRow = createDiv('');
  diffSecondRow.class('button-row');
  diffSecondRow.style('margin-top', '20px');
  diffSecondRow.parent(difficultyScreen);

  // 添加返回按钮
  let backButtonDifficulty = createButton('BACK');
  backButtonDifficulty.parent(diffSecondRow);
  backButtonDifficulty.class('back-button');
  backButtonDifficulty.mousePressed(() => {
    document.getElementById('difficultyScreen').style.display = 'none';
    document.getElementById('mapSelectScreen').style.display = 'flex';
  });

  // 创建倒计时显示
  let timerDiv = createDiv(`Time: 120s`);
  timerDiv.class('timer');
  timerDiv.id('timerDisplay');
  timerDiv.parent('main');


  // 创建游戏结束屏幕
  let gameOverScreen = createDiv('');
  gameOverScreen.id('gameOverScreen');
  gameOverScreen.parent('main');

  // let gameOverTitle = createElement('h1', 'GAME OVER');
  let gameOverTitle = createElement('h1', '');
  gameOverTitle.id('gameOverTitle');
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

  // 创建分数显示
  let scoreDiv = createDiv('score: 0');
  scoreDiv.class('score');
  scoreDiv.id('scoreDisplay');
  scoreDiv.parent('main');

  // 初始隐藏分数和重新开始按钮，直到游戏真正开始
  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
  document.getElementById('timerDisplay').style.visibility = 'hidden';
}

function draw() {
  if (!gameStarted) {

    background('#63161A');

    translateCenter();

    if (score >= 100) {
      gameWon = true;
    }

    if (gameWon) {
      document.getElementById('scoreDisplay').style.visibility = 'hidden';
      document.querySelector('.button-container').style.visibility = 'hidden';
      document.getElementById('timerDisplay').style.visibility = 'hidden';
      document.getElementById('gameWonScreen').style.visibility = 'visible';
      document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;
      return;
    }

    if (gameOver) {
      console.log("Setting gameOverTitle:", gameOverReason);
      let gameOverText = "GAME OVER";
      switch (gameOverReason) {
        case 'timeout':
          gameOverText = "TIME'S UP!";
          break;
        case 'collision_with_snake':
          gameOverText = "You hit another snake!";
          break;
        case 'collision_with_obstacle':
          gameOverText = "You hit an obstacle!";
          break;
        case 'collision_with_boundary':
          gameOverText = "You hit the boundary!";
          break;
      }
      // document.getElementById('gameOverTitle').innerHTML =
      //   gameOverReason === 'timeout' ? "TIME'S UP!" : "GAME OVER";
      document.getElementById('gameOverTitle').innerHTML = gameOverText;
      document.getElementById('gameOverTitle').style.visibility = 'visible';
      document.getElementById('scoreDisplay').style.visibility = 'hidden';
      document.querySelector('.button-container').style.visibility = 'hidden';
      document.getElementById('timerDisplay').style.visibility = 'hidden';
      document.getElementById('gameOverScreen').style.visibility = 'visible';
      document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;
      return;
    }

    // 在平移前绘制固定网格
    push();
    gameMap.drawFixedGrid();
    pop();

    // 更新和绘制AI小蛇
    for (let i = smallSnakes2.length - 1; i >= 0; i--) {
      smallSnakes2[i].draw();
      smallSnakes2[i].update();


    }

    setTimeout(()=>{
      defaultCanvas0.style.visibility = 'visible'

    },800)
    return;
  }

  // 更新倒计时
  if (!gameOver && !gameWon) {
    if (startGame) {
      if (!isPaused) {
        let currentTime = millis();
        let elapsed = (currentTime - startTime - totalPausedTime) / 1000;
        remainingTime = totalTime - elapsed;

        // 时间耗尽判断
        if (remainingTime <= 0) {
          remainingTime = 0;
          if (score >= 100) {
            gameWon = true;
          } else {
            gameOver = true;
            gameOverReason = 'timeout';
          }
        }
        // 更新倒计时显示
        document.getElementById('timerDisplay').innerHTML =
          `Time: ${Math.ceil(remainingTime)}s`;
      }
    }
    if (isPaused) {
      return; // 如果暂停，跳过游戏逻辑
    }
  }

  if (isPaused) {
    return; // 如果暂停，跳过游戏逻辑
  }

  background('#63161A');

  translateCenter();

  if (score >= 100) {
    gameWon = true;
  }

  if (gameWon) {
    document.getElementById('scoreDisplay').style.visibility = 'hidden';
    document.querySelector('.button-container').style.visibility = 'hidden';
    document.getElementById('timerDisplay').style.visibility = 'hidden';
    document.getElementById('gameWonScreen').style.visibility = 'visible';
    document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;
    return;
  }

  if (gameOver) {
    console.log("Setting gameOverTitle:", gameOverReason);
    let gameOverText = "GAME OVER";
    switch (gameOverReason) {
      case 'timeout':
        gameOverText = "TIME'S UP!";
        break;
      case 'collision_with_snake':
        gameOverText = "You hit another snake!";
        break;
      case 'collision_with_obstacle':
        gameOverText = "You hit an obstacle!";
        break;
      case 'collision_with_boundary':
        gameOverText = "You hit the boundary!";
        break;
    }
    // document.getElementById('gameOverTitle').innerHTML =
    //   gameOverReason === 'timeout' ? "TIME'S UP!" : "GAME OVER";
    document.getElementById('gameOverTitle').innerHTML = gameOverText;
    document.getElementById('gameOverTitle').style.visibility = 'visible';
    document.getElementById('scoreDisplay').style.visibility = 'hidden';
    document.querySelector('.button-container').style.visibility = 'hidden';
    document.getElementById('timerDisplay').style.visibility = 'hidden';
    document.getElementById('gameOverScreen').style.visibility = 'visible';
    document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;
    return;
  }

  // 在平移前绘制固定网格
  push();
  gameMap.drawFixedGrid();
  pop();

  //背景贴图
  if (currentMap === 'swamp' && swampBg) {
    let gameBoundary = {
      x: -width * gameMap.mapSize / 2,
      y: -height * gameMap.mapSize / 2,
      w: width * gameMap.mapSize,
      h: height * gameMap.mapSize
    };
    image(swampBg, gameBoundary.x, gameBoundary.y, gameBoundary.w, gameBoundary.h);
  }

  if (currentMap === 'desert' && desertBg) {
    let gameBoundary = {
      x: -width * gameMap.mapSize / 2,
      y: -height * gameMap.mapSize / 2,
      w: width * gameMap.mapSize,
      h: height * gameMap.mapSize
    };
    image(desertBg, gameBoundary.x, gameBoundary.y, gameBoundary.w, gameBoundary.h);
  }

  if (currentMap === 'teleport' && teleportBg) {
    let gameBoundary = {
      x: -width * gameMap.mapSize / 2,
      y: -height * gameMap.mapSize / 2,
      w: width * gameMap.mapSize,
      h: height * gameMap.mapSize
    };
    image(teleportBg, gameBoundary.x, gameBoundary.y, gameBoundary.w, gameBoundary.h);
  }

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

  console.log('xxxxxxxx123')
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
      gameOverReason = 'collision_with_snake';
    }
    // AI蛇头碰到玩家蛇身体后，ai蛇死亡-移除自己并生成随机数量的食物
    if (smallSnakes[i].checkCollisionWithPlayer(playerSnake)) {
      smallSnakes[i].die(); // 让 AI蛇死亡生成食物
      bannerManager.addKillBanner();
      smallSnakes.splice(i, 1); // 删除 AI蛇
      smallSnakes.push(new AISnake());
      continue; // 跳过后续逻辑，防止报错
    }
    drawStaminaBar();
  }

  // 检查食物数量，如果过少则生成更多
  // if (difficultyMode === 'normal') {
  if (foodManager.foods.length < 100) {
    foodManager.generateFood(10);
  }
  // }
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
    gameOverReason = 'collision_with_boundary';
  }

  if (playerSnake.checkObstacleCollision(obstacleManager.obstacles) && !playerSnake.isInvincible) {
    gameOver = true;
    gameOverReason = 'collision_with_obstacle';
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
      bannerManager.addBanner("STAMINA RESTORED!", 'item'); // 添加体力恢复横幅
    }
    if (result.type === "invincible") {
      itemManager.activateInvincible();
      bannerManager.addItemBanner("invincible", 6000); // 添加无敌效果横幅，持续6秒
    }
    if (result.type === "enlarge") {
      itemManager.activateEnlarge();
      bannerManager.addItemBanner("enlarge", 6000); // 添加范围扩大横幅，持续6秒
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
    bannerManager.checkSnakeLength(playerSnake); // 检查蛇长度变化
    bannerManager.updateItemProgress(); // 更新道具进度
    bannerManager.checkItemStatus(playerSnake);
  }

  if (currentMap === 'desert') {
    gameMap.drawDeserts();
  }

  if (!gameOver && !gameWon && gameStarted) {
    bannerManager.update(); // 将横幅更新放在这里，确保在最后绘制
  }

  resetMatrix();
  if (!gameOver && !gameWon && gameStarted) {
    itemManager.updateStatusDisplay(playerSnake);
    //itemManager.drawStatusDisplay();
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
  if (!playerSnake || playerSnake.body.length === 0) return;

  // 可配置参数
  const warningWidth = 150;      // 预警区域宽度
  const maxAlpha = 255;          // 最大透明度
  const gradientLayers = 100;     // 渐变层级

  const head = playerSnake.body[0];
  const leftEdge = -width * mapSize / 2;
  const rightEdge = width * mapSize / 2;
  const topEdge = -height * mapSize / 2;
  const bottomEdge = height * mapSize / 2;

  push();
  noStroke();


  if(currentMap=='default'){
    // 修改预警颜色为暗红色
    // const warningColor = color(139, 0, 0); // 暗红色，低饱和度
    //
    // // 绘制外部区域为暗红色
    // fill('#141414');
    // rect(leftEdge, topEdge, rightEdge - leftEdge, bottomEdge - topEdge);

  }



  // 四边预警（带层级渐变）
  drawGradientWarning(
    head.x - leftEdge,
    leftEdge,
    topEdge,
    warningWidth,
    height*mapSize,
    gradientLayers,
    'right'
  );

  drawGradientWarning(
    rightEdge - head.x,
    rightEdge - warningWidth,
    topEdge,
    warningWidth,
    height*mapSize,
    gradientLayers,
    'left'
  );

  drawGradientWarning(
    head.y - topEdge,
    leftEdge,
    topEdge,
    width*mapSize,
    warningWidth,
    gradientLayers,
    'down'
  );

  drawGradientWarning(
    bottomEdge - head.y,
    leftEdge,
    bottomEdge - warningWidth,
    width*mapSize,
    warningWidth,
    gradientLayers,
    'up'
  );

  pop();
  function drawGradientWarning(distance, x, y, w, h, layers, direction) {
    if (distance >= warningWidth) return;

    const alphaStep = maxAlpha / layers;
    const sizeStep = warningWidth / layers;

    for (let i = 0; i < layers; i++) {
      const currentAlpha = maxAlpha - (alphaStep * i);
      const positionRatio = i / layers;

      fill(255, 50, 50, currentAlpha * (1 - distance/warningWidth));

      switch(direction) {
        case 'right':
          rect(
            x + (warningWidth * positionRatio),
            y,
            sizeStep,
            h
          );
          break;

        case 'left':
          rect(
            x + warningWidth - (warningWidth * positionRatio) - sizeStep,
            y,
            sizeStep,
            h
          );
          break;

        case 'down':
          rect(
            x,
            y + (warningWidth * positionRatio),
            w,
            sizeStep
          );
          break;

        case 'up':
          rect(
            x,
            y + warningWidth - (warningWidth * positionRatio) - sizeStep,
            w,
            sizeStep
          );
          break;
      }
    }
  }
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

function restartGame() {


  // 隐藏游戏相关界面
  document.getElementById('gameOverScreen').style.visibility = 'hidden';
  document.getElementById('gameOverTitle').style.visibility = 'hidden';
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
  startTime = null;
  totalPausedTime = 0;
  remainingTime = totalTime;
  gameOverReason = '';

  // 清理现有游戏对象
  if (playerSnake) playerSnake = null;
  smallSnakes = [];
  if (foodManager) foodManager.foods = [];
  if (obstacleManager) obstacleManager.obstacles = [];
  if (itemManager) itemManager.items = [];
  if (gameMap) {
    if (gameMap.swampManager) gameMap.swampManager.swamps = [];
    if (gameMap.desertManager) gameMap.desertManager.deserts = [];
    if (gameMap.teleportManager) gameMap.teleportManager.teleports = [];
    gameMap = null;
  }

  document.getElementById('gameOverScreen').style.visibility = 'hidden';
  document.getElementById('gameWonScreen').style.visibility = 'hidden';
  document.getElementById('escBtnPage').style.visibility = 'hidden';
  document.getElementById('timerDisplay').style.visibility = 'hidden';
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
  document.getElementById('timerDisplay').style.visibility = 'visible';

  // 重置游戏状态
  gameStarted = true;
  gameOver = false;
  gameWon = false;

  startTime = millis();

  initGame();
}

// 键盘事件
function keyPressed() {
  if (gameState) { // 检查游戏状态
    if (key === 'p') {
      isPaused = !isPaused; // 切换暂停状态
      if (isPaused) {
        pauseStartTime = millis(); // 记录暂停开始时间
        document.getElementById('escBtnPage').style.visibility = 'visible';
        document.getElementById('scoreDisplay').style.visibility = 'visible';
        document.querySelector('.button-container').style.visibility = 'visible';
      } else {
        totalPausedTime += millis() - pauseStartTime; // 计算暂停总时间
        document.getElementById('escBtnPage').style.visibility = 'hidden';
        document.getElementById('scoreDisplay').style.visibility = 'hidden';
        document.querySelector('.button-container').style.visibility = 'hidden';
      }
    }
    else if (keyCode == 27 || keyCode == 32) { // 按下 'Esc' 或 '空格' 键
      isPaused = !isPaused; // 切换暂停状态
      if (isPaused) {
        pauseStartTime = millis(); // 记录暂停开始时间
        document.getElementById('escBtnPage').style.visibility = 'visible';
        document.getElementById('scoreDisplay').style.visibility = 'visible';
        document.querySelector('.button-container').style.visibility = 'visible';
      } else {
        totalPausedTime += millis() - pauseStartTime; // 计算暂停总时间
        document.getElementById('escBtnPage').style.visibility = 'hidden';
        document.getElementById('scoreDisplay').style.visibility = 'hidden';
        document.querySelector('.button-container').style.visibility = 'hidden';
      }
    }
    elapsed = (millis() - startTime - totalPausedTime) / 1000; // 计算游戏已运行的时间（排除暂停时间）
  }
}
function updatePreview() {
  let previewCanvas = createGraphics(50, 50);
  previewCanvas.pixelDensity(2);
  previewCanvas.clear();
  previewCanvas.push();
  previewCanvas.translate(25, 25); // 中心
  previewCanvas.noStroke();
  previewCanvas.fill(...selectedColor);
  previewCanvas.ellipse(0, 0, 20);
  previewCanvas.pop();
  document.getElementById('snakePreview').src = previewCanvas.canvas.toDataURL();
}
