### **Snake Game Sequence Diagram Overview**  

This sequence diagram illustrates the **core logic of the Snake Game**, including the **game initialization** and **main game loop execution**. The key objects involved are:  
- **Player** (User)  
- **Sketch** (Game Logic)  
- **PlayerSnake** (Player's Snake)  
- **AISnake** (AI-controlled Snake)  
- **FoodManager** (Manages Food)  
- **ItemManager** (Manages Items)  
- **ObstacleManager** (Manages Obstacles)  
- **GameMap** (Game Environment)  

---

## **1. Game Initialization**  
When the game starts:  
1. **Sketch** calls `setup()`, initializing the game.  
2. Executes the following:  
   - `createUI()` to set up the user interface.  
   - `initGame()` to initialize game settings.  
   - Creates a **PlayerSnake**.  
   - Creates multiple **AISnakes**.  
   - Initializes the **FoodManager** and generates food (`generateFood()`).  
   - Initializes the **ItemManager** and generates items (`generateItem()`).  
   - Initializes the **ObstacleManager** and generates obstacles (`generateObstacle()`).  
   - Initializes the **GameMap**, generating special map features based on the current map type:  
     - `generateSwamps()` for **swamp areas**.  
     - `generateFogs()` for **foggy maps**.  
     - `generateTeleports()` for **teleportation maps**.  

---

## **2. Main Game Loop (draw())**  
During gameplay, the **main loop** continuously executes:  
1. **Every Frame**  
   - If `isPaused == true`, it draws a **fixed grid (`drawFixedGrid()`)**.  
   - Based on the **map type**, it renders:  
     - `drawSwamp()` for **swamp maps**.  
     - `drawTeleport()` for **teleport maps**.  
     - `teleportManager.checkTeleport(playerSnake)` handles **player teleportation**.  

2. **AI Snake Behavior**  
   - **Each AI Snake** executes:  
     - `draw()` for rendering.  
     - `update()` for movement and interaction:  
       - `moveTowardsFood()` makes AI move toward food.  
       - `checkFoodCollision()` detects food consumption.  
       - `checkCollisionWithPlayer(playerSnake)` detects **collisions with the player**.  
       - If a collision occurs, `die()` is called.  
       - `checkCollisionWithAISnake(snake)` detects **AI vs. AI collisions**.  

---

## **3. Game Over & Restart**  
When `gameOverScreen` is active and **player is alive (`isLiving`)**:  
- `gameOver = true`, displaying the **Game Over screen**.  
- Draws the **stamina bar (`drawStaminaBar()`)**.  
- Shows **boundary warnings (`drawBoundaryWarning()`)**.  
- Allows **mouse interaction** to **restart the game (`restartGame()`)**.  

---

### **Summary**  
This sequence diagram describes the **Snake Game's** core logic:  
1. **Game Initialization** (Setting up the player, AI, map, food, and obstacles).  
2. **Main Game Loop** (Handling AI logic, rendering, and player actions).  
3. **Game Over & Restart** (Displaying Game Over UI and allowing a restart).  

This structured design ensures clear **gameplay mechanics and interactions**.
