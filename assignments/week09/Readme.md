# Black-Box Testing Plan for Snake Battle

## Functional Units Segmentation  
First, we need to determine which functional units to test. From the game function, we can identify the following key functional units:

1. **Player Snake Control System** – Handles mouse input and movement  
2. **AI Snake Behavior System** – Manages AI snake movement and decision-making  
3. **Collision Detection System** – Handles collisions with boundaries, obstacles, food, and other snakes  
4. **Item System** – Manages acquisition and effects of various items  
5. **Map Special Zones System** – Includes swamp, desert, and teleport points  

I will focus primarily on the **Collision Detection System** for black-box testing, as it is a core game mechanic and directly affects gameplay and fairness.

## Identification of Input Categories  
For the Collision Detection System, the following input categories can be identified:

1. **Snake Head Position** – Coordinates of the player and AI snake heads  
2. **Type of Collision Object**, including:  
   - Food  
   - Item  
   - Boundary  
   - Obstacle  
   - AI snake body  
   - Player snake body  
3. **Snake State**, including:  
   - Normal state  
   - Invincible state  
   - Expanded detection range state  

## Identification of Constraints  
Identifying constraints between different categories:

1. **Player snake head colliding with boundary/obstacle**:  
   - Ends the game in normal state  
   - Has no effect in invincible state  

2. **Player snake head colliding with AI snake**:  
   - Ends the game in normal state  
   - Has no effect in invincible state  

3. **Player snake head colliding with food**:  
   - Requires direct contact in normal state  
   - Can collect from a distance in expanded detection range state  

4. **AI snake head colliding with player snake body**:  
   - Causes AI snake to die and generate food and items  

## Definition of Test Cases  

### 1. Boundary Collision Test  
| Test Case | Input | Expected Output |  
|-----------|-------|------------------|  
| 1.1 | Player snake in normal state hits the map boundary | Game over, display "You hit the boundary!" |  
| 1.2 | Player snake in invincible state hits the map boundary | Game continues, player takes no damage |  
| 1.3 | Player snake approaches but does not touch boundary | Display boundary warning effect, game continues |  

### 2. Obstacle Collision Test  
| Test Case | Input | Expected Output |  
|-----------|-------|------------------|  
| 2.1 | Player snake in normal state hits an obstacle | Game over, display "You hit an obstacle!" |  
| 2.2 | Player snake in invincible state hits an obstacle | Game continues, player takes no damage |  

### 3. Snake-to-Snake Collision Test  
| Test Case | Input | Expected Output |  
|-----------|-------|------------------|  
| 3.1 | Player snake in normal state hits AI snake body | Game over, display "You hit another snake!" |  
| 3.2 | Player snake in invincible state hits AI snake body | Game continues, player takes no damage |  
| 3.3 | AI snake head hits player snake body | AI snake dies, random number of food and items spawn, display "SNAKE DEFEATED!" banner |  

### 4. Food Collision Test  
| Test Case | Input | Expected Output |  
|-----------|-------|------------------|  
| 4.1 | Player snake in normal state touches food | Snake length increases, play eating sound effect, score increases |  
| 4.2 | Player snake in expanded detection range state approaches food | Snake collects food without direct contact, length increases, play eating sound effect, score increases |  

### 5. Item Collision Test  
| Test Case | Input | Expected Output |  
|-----------|-------|------------------|  
| 5.1 | Player snake touches invincibility item | Invincible state activated, display banner, play item sound effect |  
| 5.2 | Player snake touches stamina item | Stamina restored, display banner, play item sound effect |  
| 5.3 | Player snake touches range expansion item | Expanded detection range state activated, display banner, play item sound effect |  

### 6. Special Map Features Test  
| Test Case | Input | Expected Output |  
|-----------|-------|------------------|  
| 6.1 | Player snake enters swamp area | Snake movement speed is reduced |  
| 6.2 | Player snake enters teleport point | Snake is teleported to the corresponding target point, teleport effect and message shown |  

## Boundary Value Tests  
Designing tests for specific input boundaries:

1. **Food Detection Boundary Values**:  
   - In normal state, the distance between snake head and food is exactly `gridSize * 0.8`  
   - In expanded detection range state, the distance is exactly `gridSize * 2.2`  

2. **Stamina Boundary Values**:  
   - Stamina value is exactly 0 when trying to speed up  
   - Stamina is at maximum value when using a stamina item  

3. **Invincibility State Boundary Values**:  
   - Collision occurs 1 frame before invincibility ends  
   - Collision occurs right after invincibility ends  

