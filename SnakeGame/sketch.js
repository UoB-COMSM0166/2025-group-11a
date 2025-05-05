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
let visibleGridRange = 2; 
let boundaryColor = [255, 0, 0];
let boundaryStroke = 2;
let cornerSize = 20;          
let warningDistance = 500;
let score = 0;
let difficultyMode = 'normal';
let currentMap = 'default';
let isPaused = false; 
let gameState = false; 
let swampBg;
let desertBg;
let teleportBg;
let mainBGM,defaultBGM,swampBGM,desertBGM,teleportBGM;
let hoverSound,clickSound,winsound,failSound;
let eatSound,eatIteamSound,speedUpSound,teleportSound,killSound;
let totalTime = 120;
let remainingTime;
let startTime;
let elapsed;
let pauseStartTime = 0;
let totalPausedTime = 0;
let gameOverReason = '';
let selectedColor = [120, 230, 120]; 
let selectedSnakeShape = 'circle'; 
let backgroundAISnakes = [];
let bannerManager;
let failSoundPlayed;
let winSoundPlayed;

function preload() {
  swampBg = loadImage('assets/pictures/swamp.jpg');
  desertBg = loadImage('assets/pictures/desert.jpg');
  teleportBg = loadImage('assets/pictures/teleport.jpg');
  mainBGM = loadSound('assets/sounds/main.mp3');
  defaultBGM = loadSound('assets/sounds/default.mp3');
  swampBGM = loadSound('assets/sounds/swamp.mp3');
  desertBGM = loadSound('assets/sounds/desert.mp3');
  teleportBGM = loadSound('assets/sounds/teleport.mp3');
  hoverSound = loadSound('assets/sounds/hover.mp3');
  clickSound = loadSound('assets/sounds/select.mp3');
  winSound = loadSound('assets/sounds/win.mp3');
  failSound = loadSound('assets/sounds/fail.mp3');
  eatSound = loadSound('assets/sounds/eat.mp3');
  eatIteamSound = loadSound('assets/sounds/eat_item.mp3');
  speedUpSound = loadSound('assets/sounds/speed_up.mp3');
  teleportSound = loadSound('assets/sounds/ported.mp3');
  killSound = loadSound('assets/sounds/kill.mp3');
}


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('main');
  frameRate(30);
  initBackgroundAISnakes();
  createUI();
  initGame();
  mainBGM.loop();
}

function initGame() {
  failSoundPlayed = false;
  winSoundPlayed = false;
  startTime = millis();
  totalPausedTime = 0;
  playerSnake = new PlayerSnake();
  smallSnakes = [];
  playerSnake.isInvincible = true; 
  playerSnake.invincibleDuration = 60;
  playerSnake.isInitialInvincibility = true;
  bannerManager = new BannerManager();

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
    if(currentMap === 'swamp') {
      gameMap.generateSwamps(); 
      gameMap.drawSwamps();
    }else if (currentMap === 'desert') {
      gameMap.generateDeserts(); 
      gameMap.drawDeserts();
    }else if (currentMap === 'teleport') {
      gameMap.generateTeleports(); 
      gameMap.drawTeleports();
      gameMap.teleportManager.checkTeleport(playerSnake);
      
      for (let snake of smallSnakes) {
        gameMap.teleportManager.checkTeleport(snake);
      }
    }
  }
}

function createUI() {
  // startScreen
  let startScreen = createDiv('');
  startScreen.id('startScreen');
  startScreen.parent('main');

  let title = createElement('h1', 'SNAKE RIVAL');
  title.parent(startScreen);

  let instructions = createP('Use mouse to control the snake!');
  instructions.parent(startScreen);

  let startButton = createButton('START GAME');
  startButton.parent(startScreen);
  startButton.mousePressed(() => {
    clickSound.play();
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('mapSelectScreen').style.display = 'flex';
  });
  let helpButton = createButton('View Help')
  helpButton.parent(startScreen);
  helpButton.class('help_btn')
  helpButton.mousePressed(() => {
    clickSound.play();
    document.getElementById('HelpPage').style.visibility = 'visible'
  })

  // escBtnPage
  let escBtnPage = createDiv('')
  escBtnPage.id('escBtnPage')
  escBtnPage.parent('main');
  let escButtom1 = createButton('RESUME GAME')
  let escButtom2 = createButton('GO HOME')

  escButtom1.parent(escBtnPage)
  escButtom2.parent(escBtnPage)
  escButtom1.mousePressed(() => {
    clickSound.play();
    isPaused = false; 
    document.getElementById('scoreDisplay').style.visibility = 'visible';
    document.querySelector('.button-container').style.visibility = 'visible';
    document.getElementById('escBtnPage').style.visibility = 'hidden';
    totalPausedTime += millis() - pauseStartTime;
  });
  escButtom2.mousePressed(() => {
    clickSound.play();
    clear()
    isPaused = false
    restartGame()
  })

  // helpPage
  let HelpPage = createDiv('')
  HelpPage.id('HelpPage')
  HelpPage.parent('main');
  HelpPage.style('overflow-y', 'auto');
  createElement('h1', 'HELP').parent(HelpPage);

  createElement('h2', '1. Use the mouse cursor to guide the direction of the snake. Hold down the left mouse button to speed up, but stamina will be depleted and needs time to recover.').parent(HelpPage);
  
  createElement('h2', '2. You must score 100 points in 120 seconds to win. You will lose the game in any of the following cases:').parent(HelpPage);
  createElement('p', '   • You fail to score 100 points within 120 seconds<br>   • You touch a ladder<br>   • You hit the game boundary (a red warning appears when you get close)<br>   • Your snake head crashes into another snake').parent(HelpPage);
  
  createElement('h2', '3. If you want to leave the game temporarily, just press the “ESC” key or the space key; press it again to continue.').parent(HelpPage);
  
  createElement('h2', '4. Eating different props will produce different effects').parent(HelpPage);
  createElement('p', '   • Batteries can instantly restore half of your stamina.<br>   • Shield can make you invisible so you can pass through obstacles<br>   • Green circle helps you expand your food collection range').parent(HelpPage);
  
  createElement('h2', '5. Don\'t hit other snakes with your head but you can hit their heads with your body, and there will be a surprise~').parent(HelpPage);
  
  createElement('h2', '6. You can choose the difficulty level. Normal is more suitable for beginners. In Hard mode, there is less food, more hazardous terrain, more obstacles, and more enemy snakes.').parent(HelpPage);
  createElement('h2', '7. You can choose from four different maps: normal, desert, swamp, and teleport. There are different terrains in different maps').parent(HelpPage);
  createElement('p', '   • In the swamp map, puddles will slow you down<br>   • In the desert map, sandstorms will obscure your vision<br>   • In the teleportation map, there are portals that transport you to a different location — the destination is random each time').parent(HelpPage);
  
  createElement('h2', '8. You can customize the snake\'s color according to your preference, but be mindful of the level you choose — it is best to avoid colors that blend in with the background.').parent(HelpPage);
  
  
  
  // createElement('p', '• You need to achieve the required score within a limited time in order to win the game').parent(HelpPage);
  // createElement('p', '• Eating different props will get rewards<br>   —Battery replenishes energy<br>   —Shield can make you invisible<br>   —Green circle helps you expand your food collection range').parent(HelpPage);
  // createElement('p', '• Don\'t touch the borders and obstacles, and don\'t hit other snakes with your head<br>    You can hit their heads with your body and there will be a surprise').parent(HelpPage);
  // createElement('p', '• There are different terrains in different maps<br>   —The SWAMP level has speed reduction zones<br>   —The DESERT level has blind spots<br>   —The TELEPORT level has portals').parent(HelpPage);
  let closeHelpButton = createButton('CLOSE');
  closeHelpButton.parent(HelpPage);
  closeHelpButton.mousePressed(() => {
    clickSound.play();
    document.getElementById('HelpPage').style.visibility = 'hidden'
  })

  // snakeAppearanceScreen
  let snakeAppearanceScreen = createDiv('');
  snakeAppearanceScreen.id('snakeAppearanceScreen');
  snakeAppearanceScreen.style('display', 'none');
  snakeAppearanceScreen.parent('main');

  startButton.mousePressed(() => {
    clickSound.play();
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
    clickSound.play();
    window.selectedColor = selectedColor;
    window.selectedSnakeShape = selectedSnakeShape;
    document.getElementById('snakeAppearanceScreen').style.display = 'none';
    document.getElementById('mapSelectScreen').style.display = 'flex';
  });

  // mapSelectScreen
  let mapSelectScreen = createDiv('');
  mapSelectScreen.id('mapSelectScreen');
  mapSelectScreen.style('display', 'none');
  mapSelectScreen.parent('main');

  let mapTitle = createElement('h2', 'MAP');
  mapTitle.parent(mapSelectScreen);

  let firstRow = createDiv('');
  firstRow.class('button-row');
  firstRow.parent(mapSelectScreen);

  let defaultMapBtn = createButton('DEFAULT');
  defaultMapBtn.parent(firstRow);
  defaultMapBtn.mousePressed(() => {
    clickSound.play();
    currentMap = 'default';
    showDifficultySelection();
  });

  let swampMapBtn = createButton('SWAMP');
  swampMapBtn.parent(firstRow);
  swampMapBtn.mousePressed(() => {
    clickSound.play();
    currentMap = 'swamp';
    showDifficultySelection();
  });

  let secondRow = createDiv('');
  secondRow.class('button-row');
  secondRow.parent(mapSelectScreen);

  let desertMapBtn = createButton('DESERT');
  desertMapBtn.parent(secondRow);
  desertMapBtn.mousePressed(() => {
    clickSound.play();
    currentMap = 'desert';
    showDifficultySelection();
  });

  let teleportMapBtn = createButton('TELEPORT');
  teleportMapBtn.parent(secondRow);
  teleportMapBtn.mousePressed(() => {
    clickSound.play();
    currentMap = 'teleport';
    showDifficultySelection();
  });

  let thirdRow = createDiv('');
  thirdRow.class('button-row');
  thirdRow.style('margin-top', '20px');
  thirdRow.parent(mapSelectScreen);

  let backButtonMap = createButton('BACK');
  backButtonMap.parent(thirdRow);
  backButtonMap.class('back-button');
  backButtonMap.mousePressed(() => {
    clickSound.play();
    document.getElementById('mapSelectScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
  });

  // difficultyScreen
  let difficultyScreen = createDiv('');
  difficultyScreen.id('difficultyScreen');
  difficultyScreen.style('display', 'none');
  difficultyScreen.parent('main');

  let difficultyTitle = createElement('h2', 'DIFFICULTY：');
  difficultyTitle.parent(difficultyScreen);

  let diffFirstRow = createDiv('');
  diffFirstRow.class('button-row');
  diffFirstRow.parent(difficultyScreen);

  let normalButton = createButton('NORMAL');
  normalButton.parent(diffFirstRow);
  normalButton.mousePressed(() => {
    clickSound.play();
    difficultyMode = 'normal';
    startGame();
  });

  let hardButton = createButton('HARD');
  hardButton.parent(diffFirstRow);
  hardButton.mousePressed(() => {
    clickSound.play();
    difficultyMode = 'hard';
    startGame();
  });

  let diffSecondRow = createDiv('');
  diffSecondRow.class('button-row');
  diffSecondRow.style('margin-top', '20px');
  diffSecondRow.parent(difficultyScreen);

  let backButtonDifficulty = createButton('BACK');
  backButtonDifficulty.parent(diffSecondRow);
  backButtonDifficulty.class('back-button');
  backButtonDifficulty.mousePressed(() => {
    clickSound.play();
    document.getElementById('difficultyScreen').style.display = 'none';
    document.getElementById('mapSelectScreen').style.display = 'flex';
  });

  // timer
  let timerDiv = createDiv(`Time: 120s`);
  timerDiv.class('timer');
  timerDiv.id('timerDisplay');
  timerDiv.parent('main');

  // gameOverScreen
  let gameOverScreen = createDiv('');
  gameOverScreen.id('gameOverScreen');
  gameOverScreen.parent('main');

  let gameOverTitle = createElement('h1', '');
  gameOverTitle.id('gameOverTitle');
  gameOverTitle.parent(gameOverScreen);

  let scoreDisplay = createP('');
  scoreDisplay.id('finalScore');
  scoreDisplay.parent(gameOverScreen);

  let restartButton = createButton('RESTART');
  restartButton.parent(gameOverScreen);
  restartButton.mousePressed(restartGame);

  // gameWonScreen
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

  let buttonContainer = createDiv('');
  buttonContainer.class('button-container');
  buttonContainer.parent('main');

  // scoreDisplay
  let scoreDiv = createDiv('score: 0');
  scoreDiv.class('score');
  scoreDiv.id('scoreDisplay');
  scoreDiv.parent('main');

  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
  document.getElementById('timerDisplay').style.visibility = 'hidden';
}

function draw() {
  if (!gameStarted) {
    background(30);
    for (let snake of backgroundAISnakes) {
      snake.update();  // move
      snake.draw();    // render
    }
    if (score >= 100) {
      gameWon = true;
    }

    setTimeout(()=>{defaultCanvas0.style.visibility = 'visible'},800)
    return;
  }

  // timer
  if (!gameOver && !gameWon) {
    if (startGame) {
      if (!isPaused) {
        let gameTime = millis();
        let elapsed = (gameTime - startTime - totalPausedTime) / 1000;
        remainingTime = totalTime - elapsed;

        if (remainingTime <= 0) {
          remainingTime = 0;
          if (score >= 100) {
            gameWon = true;
          } else {
            gameOver = true;
            gameOverReason = 'timeout';
          }
        }
        document.getElementById('timerDisplay').innerHTML =
          `Time: ${Math.ceil(remainingTime)}s`;
      }
    }
    if (isPaused) {
      return;
    }
  }

  if (isPaused) {
    return;
  }

  background(30);
  translateCenter();

  if (score >= 100) {
    gameWon = true;
  }

  if (gameWon) {
    stopCurrentMapBGM();
    document.getElementById('scoreDisplay').style.visibility = 'hidden';
    document.querySelector('.button-container').style.visibility = 'hidden';
    document.getElementById('timerDisplay').style.visibility = 'hidden';
    document.getElementById('gameWonScreen').style.visibility = 'visible';
    document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;
    if (!winSoundPlayed) {
      winSound.play();
      winSoundPlayed = true;
    }
    return;
  }

  if (gameOver) {
    stopCurrentMapBGM();
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
    
    document.getElementById('gameOverTitle').innerHTML = gameOverText;
    document.getElementById('gameOverTitle').style.visibility = 'visible';
    document.getElementById('scoreDisplay').style.visibility = 'hidden';
    document.querySelector('.button-container').style.visibility = 'hidden';
    document.getElementById('timerDisplay').style.visibility = 'hidden';
    document.getElementById('gameOverScreen').style.visibility = 'visible';
    document.getElementById('finalScore').innerHTML = `Final Score: ${score}`;
    if (!failSoundPlayed) {
      failSound.play();
      failSoundPlayed = true;
    }
    return;
  }

  // insert images for maps
  if (currentMap === 'swamp' && swampBg) {
    let gameBoundary = {
      x: -width * gameMap.mapSize / 2,
      y: -height * gameMap.mapSize / 2,
      w: width * gameMap.mapSize,
      h: height * gameMap.mapSize
    };
    image(swampBg, gameBoundary.x, gameBoundary.y, gameBoundary.w, gameBoundary.h);
    gameMap.drawSwamps();
  }

  if (currentMap === 'desert' && desertBg) {
    let gameBoundary = {
      x: -width * gameMap.mapSize / 2,
      y: -height * gameMap.mapSize / 2,
      w: width * gameMap.mapSize,
      h: height * gameMap.mapSize
    };
    image(desertBg, gameBoundary.x, gameBoundary.y, gameBoundary.w, gameBoundary.h);
    gameMap.drawDeserts();
  }

  if (currentMap === 'teleport' && teleportBg) {
    let gameBoundary = {
      x: -width * gameMap.mapSize / 2,
      y: -height * gameMap.mapSize / 2,
      w: width * gameMap.mapSize,
      h: height * gameMap.mapSize
    };
    image(teleportBg, gameBoundary.x, gameBoundary.y, gameBoundary.w, gameBoundary.h);
    gameMap.drawTeleports();
  }

  if (this.isFlashing) {
    this.flashDuration--;
    if (this.flashDuration <= 0) {
      this.isFlashing = false;
    }

    if (this.flashDuration % 4 >= 2) {
      return;
    }
  }

  // AI snakes
  for (let i = smallSnakes.length - 1; i >= 0; i--) {
    smallSnakes[i].draw();
    smallSnakes[i].update();

    if (smallSnakes[i].length < 10) {
      smallSnakes[i] = new AISnake();
    }

    // collision detection
    if (playerSnake.checkCollisionWithAISnake(smallSnakes[i]) && !playerSnake.isInvincible) {
      gameOver = true;
      gameOverReason = 'collision_with_snake';
    }

    // AI snake collision with player snake
    if (smallSnakes[i].checkCollisionWithPlayer(playerSnake)) {
      killSound.play();
      smallSnakes[i].die();
      bannerManager.addKillBanner();
      smallSnakes.splice(i, 1);
      smallSnakes.push(new AISnake());
      continue; 
    }
    drawStaminaBar();
  }

  // collision 
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

  // food and buff 
  if (foodManager.foods.length < 100) {
    foodManager.generateFood(10);
  }
  if (itemManager.items.length < 5) {
    itemManager.generateItem(5);
  }
  
  if (playerSnake.isInvincible) {
    playerSnake.invincibleDuration--;
    if (playerSnake.invincibleDuration <= 0) {
      playerSnake.isInvincible = false;
    }
    if (playerSnake.invincibleDuration % 10 >= 3) {
      playerSnake.draw();
    }
  } else {
    playerSnake.draw();
  }

  if (playerSnake.isEnlarged) {
    playerSnake.enlargeDuration--;
    if (playerSnake.enlargeDuration <= 0) {
      playerSnake.isEnlarged = false;
    }
  
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

  let result = playerSnake.checkItemCollision(itemManager.items);
  if (result.collided) {
    if (result.type === "stamina") {
      itemManager.activateStamina();
      bannerManager.addBanner("STAMINA RESTORED!", 'item');
    }
    if (result.type === "invincible") {
      itemManager.activateInvincible();
      bannerManager.addItemBanner("invincible", 6000); 
    }
    if (result.type === "enlarge") {
      itemManager.activateEnlarge();
      bannerManager.addItemBanner("enlarge", 6000); 
    }
    eatIteamSound.play();
  }

  // eat food
  let foodEaten = playerSnake.checkFoodCollision(foodManager.foods);
  if (foodEaten > 0) {
    score += foodEaten;
    document.getElementById('scoreDisplay').innerHTML = `Score: ${score}`;
    eatSound.play();
  }

  foodManager.drawFoods();
  obstacleManager.drawObstacles();
  itemManager.drawItems();

  if (!gameOver && !gameWon && gameStarted) {
    itemManager.updateTooltips();
    bannerManager.checkSnakeLength(playerSnake);
    bannerManager.updateItemProgress(); 
    bannerManager.checkItemStatus(playerSnake);
    bannerManager.update();
  }

  if (currentMap === 'desert') {
    gameMap.drawDeserts();
  }

  resetMatrix();
  if (!gameOver && !gameWon && gameStarted) {
    itemManager.updateStatusDisplay(playerSnake);
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
  
  const warningWidth = 150;   
  const maxAlpha = 255;         
  const gradientLayers = 100;     

  const head = playerSnake.body[0];
  const leftEdge = -width * mapSize / 2;
  const rightEdge = width * mapSize / 2;
  const topEdge = -height * mapSize / 2;
  const bottomEdge = height * mapSize / 2;

  const worldW = width * 3;
  const worldH = height * 3;

  push();
  noStroke();
  fill(255, 50, 50, 100);

  rect(leftEdge - worldW, topEdge - worldH, worldW * 2 + (rightEdge - leftEdge), worldH);
  rect(leftEdge - worldW, bottomEdge, worldW * 2 + (rightEdge - leftEdge), worldH);
  rect(leftEdge - worldW, topEdge, worldW, bottomEdge - topEdge);
  rect(rightEdge, topEdge, worldW, bottomEdge - topEdge);

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
  if (defaultBGM) defaultBGM.stop();
  if (swampBGM) swampBGM.stop();
  if (desertBGM) desertBGM.stop();
  if (teleportBGM) teleportBGM.stop();
  
  if (mainBGM) mainBGM.loop();
  
  // hide all screens
  document.getElementById('gameOverScreen').style.visibility = 'hidden';
  document.getElementById('gameOverTitle').style.visibility = 'hidden';
  document.getElementById('gameWonScreen').style.visibility = 'hidden';
  document.getElementById('scoreDisplay').style.visibility = 'hidden';
  document.querySelector('.button-container').style.visibility = 'hidden';
  document.getElementById('startScreen').style.display = 'flex';
  document.getElementById('difficultyScreen').style.display = 'none';
  document.getElementById('escBtnPage').style.visibility = 'hidden'

  // reset game variables
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

  // clear game objects
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
  initGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawStaminaBar() {
  if (playerSnake.stamina >= playerSnake.maxStamina && !(mouseIsPressed && mouseButton === LEFT)) {
    return;
  }

  let barWidth = 100;
  let barHeight = 10;
  let offsetY = -100;

  let head = playerSnake.body[0];
  let x = head.x - barWidth / 2;
  let y = head.y + offsetY;

  noStroke();
  fill(100, 100);
  rect(x, y, barWidth, barHeight);

  let staminaWidth = map(playerSnake.stamina, 0, playerSnake.maxStamina, 0, barWidth);
  if (mouseIsPressed && mouseButton === LEFT && playerSnake.stamina > 0) {
    fill(0, 200, 200, 100);
  } else {
    fill(100, 255, 100, 100);
  }
  rect(x, y, staminaWidth, barHeight);

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

  gameState = true;
  mainBGM.stop();
  // BGM
  switch(currentMap) {
    case 'default':
      if (defaultBGM) defaultBGM.loop();
      break;
    case 'swamp':
      if (swampBGM) swampBGM.loop();
      break;
    case 'desert':
      if (desertBGM) desertBGM.loop();
      break;
    case 'teleport':
      if (teleportBGM) teleportBGM.loop();
      break;
  }

  document.getElementById('difficultyScreen').style.display = 'none';
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('mapSelectScreen').style.display = 'none';
  document.getElementById('scoreDisplay').style.visibility = 'visible';
  document.querySelector('.button-container').style.visibility = 'visible';
  document.getElementById('timerDisplay').style.visibility = 'visible';

  // reset game variables
  gameStarted = true;
  gameOver = false;
  gameWon = false;
  startTime = millis();
  initGame();
}

function keyPressed() {
  if (gameState) { 
    if (key === 'p') {
      isPaused = !isPaused; 
      if (isPaused) {
        pauseStartTime = millis(); 
        document.getElementById('escBtnPage').style.visibility = 'visible';
        document.getElementById('scoreDisplay').style.visibility = 'visible';
        document.querySelector('.button-container').style.visibility = 'visible';
      } else {
        totalPausedTime += millis() - pauseStartTime; 
        document.getElementById('escBtnPage').style.visibility = 'hidden';
        document.getElementById('scoreDisplay').style.visibility = 'hidden';
        document.querySelector('.button-container').style.visibility = 'hidden';
      }
    }
    else if (keyCode == 27 || keyCode == 32) { 
      isPaused = !isPaused; 
      if (isPaused) {
        pauseStartTime = millis(); 
        document.getElementById('escBtnPage').style.visibility = 'visible';
        document.getElementById('scoreDisplay').style.visibility = 'visible';
        document.querySelector('.button-container').style.visibility = 'visible';
      } else {
        totalPausedTime += millis() - pauseStartTime; 
        document.getElementById('escBtnPage').style.visibility = 'hidden';
        document.getElementById('scoreDisplay').style.visibility = 'hidden';
        document.querySelector('.button-container').style.visibility = 'hidden';
      }
    }
    elapsed = (millis() - startTime - totalPausedTime) / 1000; 
  }
}
function updatePreview() {
  let previewCanvas = createGraphics(50, 50);
  previewCanvas.pixelDensity(2);
  previewCanvas.clear();
  previewCanvas.push();
  previewCanvas.translate(25, 25); 
  previewCanvas.noStroke();
  previewCanvas.fill(...selectedColor);
  previewCanvas.ellipse(0, 0, 20);
  previewCanvas.pop();
  document.getElementById('snakePreview').src = previewCanvas.canvas.toDataURL();
}

function stopCurrentMapBGM() {
  switch(currentMap) {
    case 'default':
      if (defaultBGM) defaultBGM.stop();
      break;
    case 'swamp':
      if (swampBGM) swampBGM.stop();
      break;
    case 'desert':
      if (desertBGM) desertBGM.stop();
      break;
    case 'teleport':
      if (teleportBGM) teleportBGM.stop();
      break;
  }
}

function initBackgroundAISnakes() {
  backgroundAISnakes = [];
  for (let i = 0; i < 18; i++) {
    let snake = new AISnake();
    let longerSize = floor(random(10, 16));
    let centerX = random(-width * mapSize / 2 + gridSize, width * mapSize / 2 - gridSize);
    let centerY = random(-height * mapSize / 2 + gridSize, height * mapSize / 2 - gridSize);
    
    snake.body = [];
    for (let j = 0; j < longerSize; j++) {
      snake.body.push(createVector(centerX - j * gridSize, centerY));
    }

    backgroundAISnakes.push(snake);
  }
}
