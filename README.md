# 2025-group-11a
2025 COMSM0166 group 11a  
🎮 [Click this link to play our game!](https://uob-comsm0166.github.io/2025-group-11a/SnakeGame/)   
🎬 [Click this link to watch our game video!](https://youtu.be/3kyE73LDukw?si=L8YsLN-xsl0hhlIV)   
💻 Here are the links to our weekly homeworks.<br>  | [week 1](https://uob-comsm0166.github.io/2025-group-11a/assignments/week01) | [week 2](https://uob-comsm0166.github.io/2025-group-11a/assignments/week02) | [week 3](https://uob-comsm0166.github.io/2025-group-11a/assignments/week03) | [week 4](https://uob-comsm0166.github.io/2025-group-11a/assignments/week04) | [week 5](https://uob-comsm0166.github.io/2025-group-11a/assignments/week05) | [week 7](https://uob-comsm0166.github.io/2025-group-11a/assignments/week07) | [week 8](https://uob-comsm0166.github.io/2025-group-11a/assignments/week08) | [week 9](https://uob-comsm0166.github.io/2025-group-11a/assignments/week09) | [week 10](https://uob-comsm0166.github.io/2025-group-11a/assignments/week10)<br>
📋 [This is the link to our Kanban board.](https://yiqing.atlassian.net/jira/software/projects/DP/boards/1?atlOrigin=eyJpIjoiZjNjMTJhMWUyMDY1NDg3ODk3Nzk3MzcwZTc5MjNlYWYiLCJwIjoiaiJ9)

# Table of Contents

1. [Development Team](#development-team)
2. [Introduction](#introduction)
3. [Requirements](#requirements)
4. [Design](#design)
5. [Implementation](#implementation)
6. [Evaluation](#evaluation)
7. [Process](#process)
8. [Sustainability, ethics and accessibility](#sustainability)
9. [Conclusion](#conclusion)
10. [References](#references)



# 1. Development Team <a id="development-team"></a>  
<div align="center">
   <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/team_photo.jpg" alt="team_photo" height="400"> 
</div>
<div align="center">
  <p>Image 1: Team Members</p>
</div>

<div align="center">
  
  | MEMBER | NAME               | EMAIL                   | ROLE               |
  |--------|--------------------|-------------------------|--------------------|
  | 1      | Yiqing Zhou        | lr24125@bristol.ac.uk   | Scrum Master, Coder |
  | 2      | Xing Yang          | zj24404@bristol.ac.uk   | Optimizer, Coder    |
  | 3      | Cheng Wang         | fd24967@bristol.ac.uk   | Designer, Coder     |
  | 4      | Jiayi Lin          | fg24079@bristol.ac.uk   | UI Designer, Coder  |
</div>
<div align="center">
  Table 1: Team Members
</div>

# 2. Introduction <a id="introduction"></a> 
<div align="center"> 
    <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/classicsnake.gif" alt="classic" height="130"> <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/snakebattle.gif" alt="snakebattle" height="130">  <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/ourgame.gif" alt="our game" height="130"> 
     <p>Image 2: Classic Snake Game, 
    Source: <a href="https://analyticsindiamag.com/deep-tech/how-neural-network-can-be-trained-to-play-the-snake-game/">analyticsindiamag</a><br>
    Image 3: Snake Battle, 
    Source: <a href="https://www.youtube.com/watch?v=ZVsTZoaf-YM">Youtube</a><br>
    Image 4: Our Game</p> <br>
</div>

This project draws inspiration from one of the most iconic classic games—**Snake**. However, in contrast to the traditional version, which restricts player movement to four directional keys (up, down, left, right), our goal was to provide a more fluid and intuitive control system on the PC platform. Inspired by the mobile game Snake Battle, where players use a virtual joystick to control the snake's direction, we designed our version to allow players to guide the snake using mouse input. The **p5.js** library proved to be particularly suitable for this purpose, as it enables precise mouse-based direction control and allows for the snake's body to be dynamically rendered using overlapping circles, eliminating the need for external sprite assets.

To enhance the game's playability, we introduced a variety of **power-up food items**. When consumed, these items grant temporary buffs such as increased food collection range, short-term invincibility, or enhanced stamina for acceleration. Additionally, we designed multiple **maps and difficulty levels**, each incorporating unique gameplay mechanics. For example, swamp terrain reduces movement speed, fog limits visibility, and teleportation portals allow for quick relocation to different areas of the map.

An important feature of the game is the inclusion of **AI-controlled snakes** that compete with the player for food. To maintain balance and competitiveness, AI snakes drop food upon death. Since any collision between a snake's head and a non-food object results in death, players can strategically eliminate AI opponents to gain additional resources.


# 3. Requirements <a id="requirements"></a>  
### Ideation Process

Each member of our team independently researched game types they were personally interested in. We then came together to share and discuss our findings, evaluating each proposed concept based on feasibility, alignment with team members’ interests, and the potential for scalability within the scope of our project. Through this scoring process, two game types emerged as the highest-rated: side-scrolling platformers and arcade-style games, with Snake as a representative example.

Ultimately, we chose Snake as the foundation for our project. Our primary objective was to focus on enhancing our coding skills and gameplay design abilities, rather than investing a large portion of our time in level or map design, which would have been a significant part of a platformer. The simplicity and extensibility of Snake aligned well with our goal to experiment with control schemes, AI behavior, and game mechanics.

During the ideation phase, we also referenced modern adaptations of the classic Snake game, such as Slither.io and Snake Battle, which inspired us to explore mouse-based controls, dynamic gameplay elements, and multiplayer mechanics. We held structured brainstorming sessions using collaborative tools to consolidate ideas and assess the technical feasibility of each concept, especially within the capabilities of the p5.js library.

Additionally, you may notice that our team was divided into two subgroups, 11a and 11b. This decision arose during the this stage, as we encountered fundamental differences in creative direction that proved difficult to reconcile. To ensure smooth progress and allow each group to pursue its own vision effectively, we mutually agreed to split into two sub-teams and continue the development of two game projects independently.

<div align="center">
  
| Game Genre        | Reference Game     | Feasibility | Interest | Scalability | Total Score |
|-------------------|--------------------|-------------|----------|-------------|-------------|
| Side-scrolling Action | Super Mario Bros  | 5           | 4        | 5           | 14          |
| Arcade            | Snake              | 5           | 4        | 5           | 14          |
| Tower Defense     | Plants vs. Zombies | 4           | 4        | 3           | 11          |
| Roguelike         | Brotato            | 4           | 3        | 3           | 10          |
| Simulation (Management) | Stardew Valley | 2           | 3        | 2           | 7           |
| Scrolling Shooter | Gradius            | 5           | 1        | 1           | 7           |
| Puzzle            | Rusty Lake         | 1           | 2        | 4           | 7           |
| RPG               | Pokémon            | 1           | 2        | 4           | 7           |
| Simulation (Construction) | Poly Bridge | 1           | 2        | 3           | 6           |
</div>
<div align="center">
Table 2: Game Research and Game Type Evaluation
</div>

### User Stories
To clarify the features we could realistically implement and to prioritize our development tasks, we discussed and formulated a series of user stories. The full list can be found in our [week 4 assignment](https://uob-comsm0166.github.io/2025-group-11a/assignments/week04). Below are several key stories that had a significant impact on the final deliverable:

> "As a player, I want to control the snake using touch or keyboard so that I can play easily."

>“As a player, I want different map modes, such as swamp, desert, and teleportation, each with unique characteristics, so that I can experience varied gameplay.”

>“As a player, I want to adjust the game difficulty to match different challenge levels.”

>“As a player, I want a timed mode where I can achieve the highest score within a limited time.”

In addition to player-centered stories, we also created developer and UI designer stories to guide the project from a broader perspective:

> "As a developer, I want to implement modular managers (e.g., FoodManager, ObstacleManager, ItemManager) so that we can maintain and expand different gameplay elements independently."

> "As a developer, I want to implement AI snakes that can compete with players for food, so the game has an engaging and competitive challenge."

> "As a designer, I want to create a multi-step start menu (snake customization → map → difficulty), so players are guided smoothly into the game."

> "As a designer, I want to implement a victory and game-over screen with reasons (e.g., timeout, collision), so that players receive clear feedback."

In designing user stories for our Snake Game, we adopted the “As a [user], I want to [goal] so that [reason]” structure to ensure clarity and player-centered design. This method helped us define features that directly address user needs and align with gameplay experience. 

We also emphasized writing clear, testable acceptance criteria using the Given-When-Then format. For example, selecting the swamp map slows the snake with water hazards, while the desert mode increases difficulty by reducing food frequency. The teleportation mode repositions the snake across the screen, adding a unique twist. These outcomes help validate functionality effectively during development.

Importantly, we ensured that all user stories were feasible and supported gameplay diversity. Using frameworks like MoSCoW, we prioritized features and focused development on delivering a smooth, engaging experience. This systematic approach improved collaboration and guaranteed a balanced, player-friendly design.

### Early Stages Design

<p align="center">
  <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/prototype_compressed.gif" alt="Prototype" height="400"/>
</p>
<p align="center">Image 5: Prototype</p>


To align with our development approach, we referred to the mobile game Snake Battle as our primary design inspiration. Although Snake Battle is a multiplayer online game, our target platform does not support multiplayer functionality. As a result, we had to explore alternative gameplay mechanics to enhance player engagement.

In the early stages of design, we proposed incorporating roguelike elements, including various buff and debuff items—such as candy (which grants a temporary speed boost), cookies (which reveal additional food locations), and trash (which causes damage or unexpected acceleration). We also considered implementing both single-player and two-player modes.

However, as development progressed, we realized that these ideas deviated from the core essence of the classic Snake game and introduced ambiguity in the win conditions, which undermined gameplay consistency. Therefore, we decided to retain only the buff system and the single-player mode, while continuously re-evaluating new gameplay ideas through weekly iteration and testing.

In the first sprint (initial deliverable version), our focus was on faithfully recreating the core mechanics of the reference game: the snake is controlled using the mouse to navigate, consuming food increases its length and score, and the game ends if the snake collides with the map boundary or any obstacle. To increase the level of challenge, we added AI-controlled snakes and obstacles to the map. A collision between the player's snake head and an AI snake’s body also results in game over. AI snakes compete with the player for food, and in hard mode, food dropped upon the death of AI snakes becomes a crucial scoring resource.

### Use-Case Diagram
<div align="center">
    <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/use-case.jpg" alt="use-case diagram" >
    <p>Image 6: Use-Case Diagram<br>
</div>
We used a use case diagram to preliminarily identify the functional components of the game, helping to provide a clear and intuitive understanding of the required features. During this phase, we held discussions to determine the key use cases of the game and how players would interact with each component. Players engage with the game through a linear interaction flow, starting from a specific screen shown after selecting "Start Game", after which they can choose a map and a difficulty mode. This design allows players to become familiar with the game before challenging themselves further.

In addition, each difficulty mode is associated with its own set of components. As players progress, these components increase the challenge within each mode. For instance, the “Swamp” map may extend into a “Slow Speed” challenge, while the “Desert” map could introduce a “Reduced Visibility” mechanic. During gameplay, players are able to move, gain scores, and collect buff items, but may also die if they encounter obstacles.

This use case diagram focuses solely on the game’s core gameplay functionality and supports the implementation of the features discussed in the early design phase. Since we adopted an agile development methodology, numerous additional features were introduced later in the project—such as pause functionality, sound effects, and more refined AI snake movement. All of these were integrated without disrupting the structure of the original use case diagram, which continued to serve as a foundation for iterative improvements.

### Requirements Definition
We conduct weekly requirement reviews based on the current state of the game to gather additional player feedback, refine gameplay mechanics, and address bugs. This iterative process is also reflected in our Kanban board. The finalized requirements for the deliverable version are as follows: <br>

**1. Game Objective <br>**
The main goal of the game is for the player to control a snake and consume randomly generated food on the map. The player must reach a target score within a limited time in order to win.

**2. Player Controls <br>**
The snake’s direction is controlled using the mouse. <br>
The player can accelerate the snake by holding the left mouse button. Acceleration consumes stamina, which is limited and regenerates over time or through specific items.

**3. Core Gameplay Mechanics <br>**
Each time the snake consumes a piece of food, its body length increases and the score is incremented. <br>
If the player defeats an AI-controlled snake by colliding with it using their snake’s body (not head), the AI snake is destroyed and additional food or special items are dropped. <br>
The game ends immediately if the player's snake collides with the edge of the map, any obstacles, or the head/body of an AI snake.

**4. Power-Ups and Items <br>**
Several power-up items are introduced to enhance gameplay. <br>
**Charge Boost**: Instantly refills the stamina bar, allowing the player to accelerate again. <br>
**Invincibility**: Grants temporary immunity to collisions with obstacles and AI snakes. However, the player can still die if they collide with the edge of the map. <br>
**Foraging Radius Increase**: Temporarily enlarges the effective area around the snake’s head for collecting food, making it easier to gather items.

**5. Map Variations and Environmental Effects <br>**
To introduce variety and challenge, the game includes multiple map modes, each with unique effects. <br>
**Swamp Map**: When the snake moves through swamp terrain, its movement speed decreases, and acceleration is less effective. <br>
**Desert Map**: Occasional sandstorms obscure the player's vision, making navigation more difficult. <br>
**Teleportation Map**: Teleportation portals allow the snake to instantly travel to different locations on the map, enabling strategic repositioning. <br>

**6. Difficulty Modes <br>**
**Normal Mode**: Designed for casual gameplay, this mode includes a moderate number of AI snakes, a balanced distribution of obstacles, and a standard amount of food items across the map. <br>
**Hard Mode**: Intended for experienced players seeking a challenge. In this mode, the game initializes with a significantly higher number of AI-controlled snakes, increased obstacles scattered throughout the map, and a reduced frequency of food item spawns. This setting requires more strategic movement and resource management to succeed.

**7. Win and Loss Conditions <br>**
**Victory Condition**: The player wins the game by achieving the target score within the allotted time limit. <br>
**Defeat Conditions**: The player loses if they fail to reach the target score in time, or if their snake collides with the map boundary, any obstacle, or an AI-controlled snake.


# 4. Design <a id="design"></a>  
### Class diagram
The class diagram for the Snake Game represents the key components and their relationships. The Snake class serves as the base for PlayerSnake and AISnake, with attributes like body, direction, and movement methods, while PlayerSnake handles user input, stamina, and special states, and AISnake focuses on AI-controlled behavior such as tracking food and avoiding obstacles. The GameMap class manages grid size, borders, and environmental effects, interacting with specialized managers like SwampManager, FogManager, and TeleportManager to generate and process different terrain effects. The ItemManager controls in-game items such as stamina boosts and teleportation, while ObstacleManager generates and manages obstacles like ladders. The FoodManager governs food placement and properties, ensuring AI and player interactions. Enumerations define item types and difficulty modes. This structured design ensures modularity, clear responsibilities, and efficient game management.
<p align="center">
  <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/snake_class diagram.png" alt="class_diagram" height="800"/>
</p>

### Behavioural diagrams
The Snake Game sequence diagram illustrates the game's core logic, including initialization, main game loop, and game over handling. The game starts with Sketch calling setup(), which initializes the UI, player snake, multiple AI snakes, and managers for food, items, obstacles, and the game map. Based on the map type, specific elements like swamps, fog, or teleportation points are generated. During the main game loop (draw()), if the game is not paused, it renders the grid and special map features, updates AI snakes to move toward food, check collisions with food, the player, or other AI, and handles AI deaths when needed. The game over phase is triggered if the player loses, displaying the Game Over screen, drawing the stamina bar and boundary warnings, and allowing the player to restart via mouse interaction. This sequence diagram provides a structured view of the game's execution flow, covering initialization, frame-by-frame updates, AI behavior, and restart mechanics.
<p align="center">
  <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/snake_sequence diagram.png" alt="sequence_diagram" height="1600"/>
</p>


# 5. Implementation <a id="implementation"></a>  
There are three areas of challenge：
### Challenge 1: Flexible use of mouse to control the snake
To enhance the player's sense of control and immersion within the game, we designed and implemented a direction control system based on the position of the mouse cursor. This mechanism continuously listens for mousemove events to retrieve the real-time coordinates of the mouse and calculates a directional vector relative to the current position of the player character. By applying vector normalization techniques, the character is programmed to consistently move in the direction of the mouse pointer, resulting in smooth and natural directional transitions.

To prevent sudden angular shifts or jitter during gameplay, we further incorporated a linear interpolation algorithm (commonly referred to as "lerp") to ensure a gradual transition of direction. Specifically, in each frame, the angle between the current orientation and the target direction is smoothly adjusted, producing a gentle turning curve. This approach not only improves the responsiveness of the controls but also enhances the physical coherence of the character’s movement.

<p align="center">
  <img src="https://github.com/UoB-COMSM0166/2025-group-11a/blob/main/docs/Control.gif" alt="Control" height="300"/>
</p>
<p align="center">Image 7: Control</p>

### Challenge 2: AI enemy snake design
To enhance the game's challenge, we designed an AI-controlled enemy snake with capabilities including autonomous pathfinding, obstacle avoidance, target tracking, and player interaction.

The most technically demanding aspects of the AI snake implementation lie in path planning and obstacle avoidance. To simulate realistic movement behavior, we adopted a directional vector system combined with linear interpolation via the lerp() function, enabling smoother and more natural turns. To prevent collisions, the AI snake “predicts” whether its next movement step will result in a collision with an obstacle or boundary. This prediction is carried out through the predictCollision() method. If a potential collision is detected, the AI will promptly adjust its direction and attempt to navigate around the obstacle.

Furthermore, the target tracking mechanism enhances the AI's strategic behavior. Instead of always pursuing the nearest food item, the AI selects one at random from the three closest food items using the findRandomNearestFood() method. This introduces a degree of unpredictability, thereby increasing gameplay diversity and challenge. Additionally, the AI evaluates the feasibility of pursuing a target based on distance, avoiding ineffective “blind chasing” behavior.

Lastly, the interaction with the player and the death feedback mechanism further enrich gameplay dynamics. The AI actively detects collisions with the player's snake: if the player's head collides with the AI's body, the player is defeated; conversely, if the AI's head hits the player, the AI is destroyed. Upon death, the AI snake spawns a number of food items and power-ups proportional to its body length. This design not only increases the game's dynamism but also provides clear reward feedback to the player. To ensure these drops do not overlap or appear in invalid locations, the system shuffles the AI's body segments and applies coordinate offsets during placement.

<p align="center">
  <img src="https://github.com/UoB-COMSM0166/2025-group-11a/blob/main/docs/AI%20snake.gif" alt="AI snake" height="300"/>
</p>
<p align="center">Image 8: AI snake</p>

### Challenge 3: Different maps and terrains
To enrich the gameplay experience, we introduced several distinct map types: Swamp, Desert, and Teleport. Each map features unique terrain types and items, along with background color variations to enhance visual diversity.

One of the major technical challenges was the terrain generation algorithm. For the swamp and desert regions, we employed a multi-layered Perlin noise approach combined with angular perturbations to produce irregular yet natural-looking organic boundaries. To further enhance the smoothness and visual appeal of these shapes, we applied cubic smoothing techniques and point displacement. The generation of such irregular regions requires both precision in graphical algorithms and a balance between real-time performance and layout diversity, while avoiding overlapping terrain or unreasonable map configurations.

Another significant programming difficulty lies in the gameplay mechanics influenced by terrain. For example, when a snake enters a swamp or desert area, its movement speed is significantly reduced. Implementing this behavior necessitates real-time detection of whether the snake's head is within a complex polygon. To achieve this, we implemented a point-in-polygon collision detection algorithm, which involves ray casting and geometric computations. Although the logic is complex, it must operate efficiently to maintain game responsiveness.

Additionally, the teleportation system posed a considerable technical challenge. Each teleport portal is randomly paired with a target location. When the snake enters a portal, its entire body must be repositioned to the corresponding target portal while preserving its current movement direction. A cooldown mechanism is also implemented to prevent immediate reactivation. To enhance player feedback and immersion, the teleportation process is accompanied by particle explosion effects, which must be precisely synchronized with the interaction logic to ensure seamless gameplay.

<p align="center">
  <img src="https://github.com/UoB-COMSM0166/2025-group-11a/blob/main/docs/Teleport.gif" alt="Teleport" height="300"/>
</p>
<p align="center">Image 9: Teleport</p>


# 6. Evaluation <a id="evaluation"></a>  

## Heuristic Evaluation
The evaluation team conducted a comprehensive review of the Snake game, identifying multiple issues and scoring them by severity based on Nielsen's usability principles:
<table>
  <thead>
    <tr>
      <th><strong>Interface</strong></th>
      <th><strong>Issue</strong></th>
      <th><strong>Heuristic</strong></th>
      <th><strong>Frequency</strong></th>
      <th><strong>Impact</strong></th>
      <th><strong>Persistence</strong></th>
      <th><strong>Severity</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Starting</td>
      <td>Lack a description of gameplay mechanics, level selection, and the option to choose between single-player and multiplayer modes</td>
      <td>Help and Documentation</td>
      <td>3</td>
      <td>3</td>
      <td>4</td>
      <td>3.33</td>
    </tr>
    <tr>
      <td>Gaming</td>
      <td>Ai Snake won't die when it touches the player</td>
      <td>Consistency and standards</td>
      <td>4</td>
      <td>2</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <td>Gaming</td>
      <td>Unable to pause the game and unable return to previous step</td>
      <td>User control and freedom</td>
      <td>3</td>
      <td>2</td>
      <td>3</td>
      <td>2.67</td>
    </tr>
    <tr>
      <td>Ending</td>
      <td>Lack of winning conditions</td>
      <td>Consistency and standards</td>
      <td>2</td>
      <td>4</td>
      <td>2</td>
      <td>2.67</td>
    </tr>
    <tr>
      <td>Gaming</td>
      <td>Lack of sufficient game feedback to players</td>
      <td>Visibility of System Status</td>
      <td>2</td>
      <td>3</td>
      <td>3</td>
      <td>2.67</td>
    </tr>
    <tr>
      <td>Gaming</td>
      <td>Background and player snake visually synchronized</td>
      <td>Aesthetic and minimalist design</td>
      <td>3</td>
      <td>1</td>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Gaming</td>
      <td>Restarting the game doesn't not clear the score</td>
      <td>Consistency and standards</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<br>
Heuristic evaluation provides us with a systematic, quantifiable list of problems and improvement directions. By categorizing the problems by severity, our team solved the following problems that affect the user experience in order of priority, greatly improving the user experience of the game.

| High Priority (Severity > 3) | Medium Priority (Severity 2-3) | Feature Enhancements |
|------------------------------|--------------------------------|----------------------|
| Add game instructions, level selection, and single/multiplayer mode options | Add a game pause button | Add a health system for the snake |
| Fix the logic issue where AI snakes don't die when colliding with the player | Set clear winning conditions (reaching 100 points = win) | Increase food variety with corresponding effects |
| | Make snake head more obvious by adding eyes | Add map obstacles |
| | Change background design for better visual contrast | Implement speed boost mechanism with stamina bar |
| | | Add difficulty modes |

## SUS
SUS is a reliable usability evaluation tool (Brooke, 1986) used to analyze the impact of SNAKE RIVAL's workload and usability at different difficulty levels.

**Data Collection and Analysis information about SUS:**
- SUS consists of a 10-question survey (raw scores)
- Each user completed the SUS form after playing at each difficulty level
- The statistical analysis used the Wilcoxon signed-rank test with a significance level of α = 0.05

**Here's the SUS data result:**

| User ID | SUS L1 | SUS L2 |
|---------|--------|--------|
| U1      | 75     | 75     |
| U2      | 82.5   | 77.5   |
| U3      | 80     | 77.5   |
| U4      | 57.5   | 55     |
| U5      | 80     | 75     |
| U6      | 90     | 80     |
| U7      | 80     | 72.5   |
| U8      | 57.5   | 57.5   |
| U9      | 80     | 75     |
| U10     | 67.5   | 65     |

**Data Analysis:**
- SUS L1 (lower difficulty): Average score of 75
- SUS L2 (higher difficulty): Average score of 71
- Both scores are higher than 68 (which appears to be a benchmark threshold)
- Statistical Analysis showed:
  * Wilcoxon test result: W test statistic = 0 (n=8, number of non-tied pairs)
  * Critical value (n=8, α=0.05): 3
  * Conclusion: W < 3, indicating a statistically significant difference between difficulty levels

**Interpretation:**
The L2 SUS score (71) is slightly lower than the L1 score (75), indicating that the increased difficulty of L2 slightly reduces the usability of users' perception and operation of the game system. This difference was found to be statistically significant. Maintaining a balance between difficulty levels and good usability is recommended.

## Black-Boxing Testing


# 7. Process <a id="process"></a>  
### Division of Work & Collaboration
**(1) Division of Work**  
At the beginning of the project, our team held a detailed discussion on task allocation. Since all members expressed strong interest in programming, we decided that everyone would participate in the development of core functionalities. Other responsibilities were assigned based on each member’s strengths:

- **Cheng**, as an avid gamer, has a good understanding of gameplay mechanics and user experience. He was mainly responsible for the design of game mechanics.
- **Xing**, who previously worked as a product manager, is familiar with feature validation and user experience optimization. She took charge of testing and also participated in code reviews.
- **Jiayi**, with a background in art and design, was in charge of the UI, including elements such as menus, help pages, and background visuals.
- **Yiqing** demonstrated strong organizational and coordination skills and therefore took the role of project manager, responsible for overall progress tracking, task delegation, and project coordination.

**(2)Agile Software Development**  
We adopted the methodology of Agile Software Development, which proved to be particularly suitable given the team’s relatively limited programming experience and the small scale of the project. Each week, we set clear short-term goals and adjusted our plans flexibly based on the previous progress and feedback. Compared with the traditional Waterfall Development Model, our process focused more on continuous user feedback and iterative improvements rather than rigidly following an initial plan to perfection. Additionally, we embraced the concept of Minimum Viable Product — implementing the core gameplay first, followed by iterative extensions and optimizations. Feedback was mainly gathered from internal playtesting among group members and comments received during in-class demonstrations. We carefully incorporated this feedback into the development cycle to ensure a continuously improving game experience.

**(3)Pair Programming**  
To improve code quality and minimize errors, we frequently adopted pair programming. This strategy was particularly effective for a team like ours, where members had limited experience but strong willingness to collaborate. For instance, in the module led by Cheng and Xing, Cheng focused on logic design and core code implementation, while Xing provided ongoing optimization suggestions and later carried out thorough testing and validation. The close collaboration ensured a higher degree of accuracy and efficiency in the final output.

**(4)Frequent and Efficient Meetings**  
Throughout the project, we held meetings approximately every three days to review progress, resolve any issues, and assign new tasks. These meetings were kept brief yet efficient. We utilized the Planning Poker method to estimate the workload and complexity of each task. This technique enabled the team to achieve a fair and reasonable distribution of tasks and ensured that all assignments matched each member’s capability.

### Tools

**(1) GitHub**  
Each team member used GitHub for version control throughout the development process. Every contributor developed their assigned modules in a separate branch. Before merging any development branch into the main branch, a Pull Request was created and reviewed by Xing, ensuring code quality and maintaining a stable main branch at all times. We merged into the main branch weekly. Bugs and feedback issues are also logged via GitHub.

<p align="center">
  <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/github.png" alt="github" height="300"/>
</p>
<p align="center">Image 10: github</p>

**(2) Temporary Google Shared Document**  
We used a Shared Document to record outcomes from lab discussions, as well as ideas and task distributions discussed during each meeting. The shared document allowed real-time viewing and editing, greatly improving collaboration efficiency and transparency.

**(3) Kanban Board**   
Project management was mainly conducted using our [Kanban board](https://yiqing.atlassian.net/jira/software/projects/DP/summary). Yiqing was responsible for updating task statuses on a weekly basis, which included the categories “To Do,” “In Progress,” and “Completed.” Our team started working on the project in Week 6, which was relatively late compared to other groups, giving us a tighter schedule. The Kanban board helped us stay organized and on track under pressure. Weekly deadlines were set for Monday so that we could learn new topics in Tuesday’s lab session and then assign new tasks after class.

<p align="center">
  <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/kanban.png" alt="kanban" height="300"/>
</p>
<p align="center">Image 11: kanban</p>

**(4) Online Meeting and WeChat Group**   
Most of our regular discussions took place online using Tencent Meeting. Screen sharing was frequently used to collaboratively debug. We also created a WeChat group, which served as the main channel for quick updates, Q&A, and file sharing. It played a key role in maintaining fast and effective communication.

### Reflection  
Looking back on the entire project process, our team demonstrated a high level of collaboration efficiency, with well-organized task allocation and effective progress management, resulting in the successful development of an ideal game. Each member made significant contributions and fully experienced the complete cycle of project development.


# 8. Sustainability, ethics and accessibility <a id="sustainability"></a>  
### Environmental Impact

Our *Snake Rival* game demonstrates strong environmental sustainability through several key design choices and technical implementations.

**Energy Efficiency:** We have implemented multiple green software patterns to minimize energy consumption. The game uses `frameRate(30)` to cap rendering at 30 frames per second, significantly reducing unnecessary CPU/GPU cycles while maintaining smooth gameplay. This can lower energy usage by up to 40% compared to uncapped frame rates. AI snakes are reused after death instead of being recreated, minimizing memory allocation and garbage collection cycles. This reduces the high energy cost of frequent object creation and destruction. Centralized managers for food, obstacles, and power-ups (Singleton Resource Managers) prevent redundant resource allocations, improving memory efficiency.  
**Carbon Awareness:** Although currently a local offline game, we’ve designed the architecture to support future carbon-aware features. These include a potential “Green Mode” that adjusts graphical fidelity based on the local grid’s carbon intensity, dynamic performance scaling to reduce energy usage during high-carbon periods, and zero data transmission by avoiding online features and logins.  
**Resource Optimization:** Our web-based implementation using **p5.js** ensures no physical materials or distribution logistics are required. It supports adaptive rendering based on device capabilities and has been tested on Windows, Linux, and Android. Additionally, efficient collision detection algorithms (for food, power-ups, AI snakes, obstacles, and boundaries) help reduce computational load.

### Individual Impact

Our game prioritizes player health and well-being through multiple user-friendly design elements.

**Health Considerations:** Customizable snake colors and map themes reduce eye strain, with swamp and desert themes offering low-contrast, soothing palettes. Rich sound effects and background music enhance immersion without being overwhelming. Planned improvements include periodic health reminders and optional forced pauses to prevent overplay.  
**Privacy Protection:** We fully implement Privacy by Design principles. The game collects no personal data. No login, user account, or profile is required, no gameplay data is stored or tracked—each session starts fresh—and no third-party analytics or advertising tools are used.  
**Accessibility Features:** Current accessibility implementations include simple mouse-based controls suitable for all ages, clear visual and audio feedback for all in-game events, and two difficulty levels (Normal and Hard) to accommodate different skill levels. Planned improvements inspired by WCAG include a high-contrast mode or maps for visually impaired players and screen reader compatibility for navigating menus.

### Social Impact

Though primarily a single-player experience, our game design also considers broader social factors.

**Inclusivity:** There are no language barriers as gameplay is fully visual and menus use basic English. There are no cultural references, as the snake protagonist is universal and inclusive. There are no competitive elements, removing negative social pressure, and no age-restricted or inappropriate content, making it safe for all ages.  
**Educational Value:** The game enhances hand-eye coordination and strategic thinking for players. For developers, the clean code structure showcases sustainable software architecture. It also highlights responsible use of environmental assets, such as swamp and desert ecosystems.

### Ethical Considerations

We’ve addressed several ethical concerns during the game’s design process.

**Algorithmic Fairness:** AI snakes operate on simple, transparent rules with no opaque machine learning or hidden difficulty adjustments that could cause frustration.  
**Responsible Design:** The game contains no addictive mechanics or variable reward loops. Win/lose conditions are clearly defined, with each session limited to a maximum of 120 seconds. There is no monetization or in-app purchases that could exploit players.  
**Transparency:** All game mechanics are intuitive and explained through gameplay. Basic instructions are available via the in-game Help screen, and the open-source code makes all implementation logic fully inspectable.

### Conclusion and Future Improvements

Our *Snake Rival* game exhibits strong sustainability across environmental, individual, and social dimensions. Even as a simple game, it embraces thoughtful green software practices.

**Key Strengths:** The game achieves excellent energy efficiency through frame rate limiting and object reuse. Privacy is built-in from the ground up, with no data collection or accounts. Accessibility is already supported at a baseline level, with plans for further expansion. The game is ethically designed, with no manipulation or monetization.  
**Planned Enhancements:** We plan to add dynamic performance scaling across devices (PC, tablet, mobile), local multiplayer support without requiring internet connectivity, and an extension of carbon-aware features as needed.

This project shows that even small games can be built with sustainability in mind. The green software patterns applied here are practical, effective, and adaptable—setting an example for responsible game development.


# 9. Conclusion <a id="conclusion"></a>  

The Snake Rival game project marks a significant milestone in our academic and professional development, demonstrating both technical achievement and collaborative growth within our four-member team—Yiqing Zhou, Xing Yang, Cheng Wang, and Jiayi Lin. Beginning as a simple snake game prototype, the project gradually evolved into a feature-rich, engaging gaming experience through the integration of AI opponents, multiple map environments, power-up systems, and sophisticated collision mechanics. This transformation challenged us to effectively apply object-oriented programming principles, establishing structured class hierarchies for different snake types (PlayerSnake, AISnake, AutoSnake) and managing key game elements through dedicated managers such as FoodManager, ObstacleManager, and ItemManager. Throughout this process, we not only enhanced our programming skills but also deepened our understanding of software engineering practices, iterative development, and team coordination.

Our success stemmed from the complementary skill sets within the team and the clear distribution of responsibilities. Yiqing Zhou took on the role of project leader, ensuring that tasks were well-coordinated and project milestones met. Xing Yang focused on debugging and the technical implementation of core game mechanics and collision systems, while Cheng Wang designed item systems and power-up mechanics that gave the game its distinctive variety and strategy. Jiayi Lin contributed through visual design, creating user interface components, visual effects, and enhancing the overall user experience. We adopted an agile workflow, holding weekly stand-up meetings and managing our codebase through GitHub. This structure allowed us to break down the project into manageable components, assign tasks based on individual strengths, conduct regular code reviews, and merge features systematically. Through this, we gained valuable lessons about clear communication, constructive feedback, balancing creative ideas with technical feasibility, and maintaining consistent coding standards within a collaborative environment.

Technically, several challenges tested our problem-solving abilities and resilience. AI pathfinding was one of the most difficult aspects, requiring intelligent behavior for AI-controlled snakes that could navigate the environment effectively, pursue food, avoid obstacles, and react dynamically to other snakes. Our final approach combined food targeting with obstacle avoidance, predictive collision detection, and behavioral state machines. Performance optimization was another key area, where we addressed frame rate drops by implementing object pooling for AI snakes, setting frame rate limits, and using efficient collision detection algorithms. The development of a multi-map system also introduced complexity, as each environment—Default, Swamp, Desert, and Portal—needed distinct mechanics, unique visual elements, and consistent physics behavior. Managing different game states, such as the main menu, gameplay, pause, and game over, required careful event handling and logical state transitions, which taught us the importance of comprehensive testing and prototyping.

Beyond technical challenges, this project provided invaluable professional development experiences. We learned the importance of writing modular, well-documented code that could be easily understood and maintained by others. Using Git effectively for collaborative development, resolving merge conflicts, and performing code reviews became essential habits. Balancing this project alongside other coursework taught us to set realistic milestones, prioritize critical path features, and allocate buffer time for debugging. Additionally, we implemented a quality assurance process through peer code reviews, organized playtesting sessions, and incorporated automated testing where feasible. User experience emerged as a key focus, with feedback from playtesters leading to refinements in difficulty progression, visual feedback, and control responsiveness.

Looking ahead, we have identified several future improvement opportunities. Technically, adding networked multiplayer functionality, procedural map generation, a replay/spectator system, and additional AI behavior patterns would significantly enhance the game’s depth and replayability. In terms of content, expanding map themes, introducing new environmental effects, adding power-up types, and offering customizable snake skins could further enrich the player experience. Performance optimization could also be refined through techniques like spatial partitioning and implementing Level of Detail (LOD) systems. We also recognize the importance of accessibility, and future versions of the game could benefit from colorblind modes, adjustable control schemes, and customizable difficulty settings.

In conclusion, the Snake Rival project transformed our understanding of game development and software engineering, highlighting that successful projects require far more than just technical expertise. Effective communication, the ability to explain complex technical concepts, openness to integrating diverse ideas, and persistence in debugging complex systems all proved equally vital. We learned how to balance creative vision with practical constraints, and how teamwork can produce results that exceed the sum of individual contributions. This project served as a valuable practical application of our coursework in Software Engineering Discipline and Practice, reinforcing core principles while challenging us to address real-world development problems. The lessons we gained in collaborative development, systematic problem-solving, and maintaining user-focused design will undoubtedly benefit us as we continue our studies and pursue future professional opportunities.


# 10. References <a id="references"></a>  
### Contribution Statement
<div align="center">
  
  |     MEMBER     | SCORE | EMAIL            | CONTRIBUTION      |
  |----------------|-------|------------------|-------------------|
  |    Yiqing Zhou    |  1  | lr24125@bristol.ac.uk   | **coding**: overall game architecture, basic gaming functionality, scoring methods, winning and dying decisions, ai snakes moving logic, interface logic, difficulty settings and timers, swamp terrain, bug fixes, code refactor<br>**report**: introduction and requirements<br>**scrum master**: follow up on progress, organize meetings and assign tasks to team members<br>**video**: writing the script|
  |    Xing Yang     |  1   | zj24404@bristol.ac.uk   | Optimizer, Coder    |
  |    Cheng Wang    |  1  | fd24967@bristol.ac.uk   | Designer, Coder     |
  |    Jiayi Lin     |  1  | fg24079@bristol.ac.uk   | **coding**: basic game functionality, border and snake movement, different backgrounds, snake appearance optimization, font style, menu, main interface animation, help page, interface logic, bug fixes<br>**report**: implementation and process<br>**UI Designer**: drawing maps as backgrounds, snake appearance design, interface design<br>**video**: filming and dubbing|
</div>
<div align="center">
Table ???: Contribution
</div>

### Additional Marks
You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:
- **Quality** of report writing, presentation, use of figures and visual material (5%)
  Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5%)
  Is your repo clearly organised?
  Is code well commented throughout?




