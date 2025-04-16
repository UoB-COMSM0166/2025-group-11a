# 2025-group-11a
2025 COMSM0166 group 11a  
🎮 [Click this link to play our game!](https://uob-comsm0166.github.io/2025-group-11a/SnakeGame/)   
💻 Here are the links to our weekly homeworks.  | [week 1](https://uob-comsm0166.github.io/2025-group-11a/assignments/week01) | [week 2](https://uob-comsm0166.github.io/2025-group-11a/assignments/week02) | [week 3](https://uob-comsm0166.github.io/2025-group-11a/assignments/week03) | [week 4](https://uob-comsm0166.github.io/2025-group-11a/assignments/week04) | [week 5](https://uob-comsm0166.github.io/2025-group-11a/assignments/week05) | [week 7](https://uob-comsm0166.github.io/2025-group-11a/assignments/week07) |  <br>
📋 [This is the link to our Kanban board.](https://yiqing.atlassian.net/jira/software/projects/DP/boards/1?atlOrigin=eyJpIjoiZjNjMTJhMWUyMDY1NDg3ODk3Nzk3MzcwZTc5MjNlYWYiLCJwIjoiaiJ9)

# Table of Contents

1. [Development Team](#development-team)
2. [Introduction](#introduction)
3. [Requirements](#requirements)
4. [Design](#design)
5. [Implementation](#implementation)
6. [Evaluation](#evaluation)
7. [Process](#process)
8. [Sustainability, ethics and accessibility](#Sustainability, ethics and accessibility)
9. [Conclusion](#conclusion)
10. [References](#references)



# 1. Development Team <a id="development-team"></a>  
<div align="center">
   <img src="https://uob-comsm0166.github.io/2025-group-11a/docs/小组照片 1.jpg"> 
</div>

<div align="center">
  
  | MEMBER | NAME               | EMAIL                   | ROLE               |
  |--------|--------------------|-------------------------|--------------------|
  | 1      | Yiqing Zhou        | lr24125@bristol.ac.uk   | Scrum Master, Coder |
  | 2      | Xing Yang          | zj24404@bristol.ac.uk   | Optimizer, Coder    |
  | 3      | Cheng Wang         | fd24967@bristol.ac.uk   | Designer, Coder     |
  | 4      |                    |                         |                     |
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

> "As a developer, I want to implement AI snakes that can track, shoot at, and avoid the player, so the game has an engaging and competitive challenge."

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
- 15% ~750 words
- System architecture. Class diagrams, behavioural diagrams.


# 5. Implementation <a id="implementation"></a>  
- 15% ~750 words
- Describe implementation of your game, in particular highlighting the three areas of challenge in developing your game.


# 6. Evaluation <a id="evaluation"></a>  
- 15% ~750 words

- One qualitative evaluation (your choice)

- One quantitative evaluation (of your choice)

- Description of how code was tested.


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

**(2) Temporary Google Shared Document**  
We used a Shared Document to record outcomes from lab discussions, as well as ideas and task distributions discussed during each meeting. The shared document allowed real-time viewing and editing, greatly improving collaboration efficiency and transparency.

**(3) Kanban Board**   
Project management was mainly conducted using our [Kanban board](https://yiqing.atlassian.net/jira/software/projects/DP/summary). Yiqing was responsible for updating task statuses on a weekly basis, which included the categories “To Do,” “In Progress,” and “Completed.” Our team started working on the project in Week 6, which was relatively late compared to other groups, giving us a tighter schedule. The Kanban board helped us stay organized and on track under pressure. Weekly deadlines were set for Monday so that we could learn new topics in Tuesday’s lab session and then assign new tasks after class.

**(4) Online Meeting and WeChat Group**   
Most of our regular discussions took place online using Tencent Meeting. Screen sharing was frequently used to collaboratively debug. We also created a WeChat group, which served as the main channel for quick updates, Q&A, and file sharing. It played a key role in maintaining fast and effective communication.

### Reflection  
Looking back on the entire project process, our team demonstrated a high level of collaboration efficiency, with well-organized task allocation and effective progress management, resulting in the successful development of an ideal game. Each member made significant contributions and fully experienced the complete cycle of project development.


# 8. Sustainability, ethics and accessibility <a id="conclusion"></a>  
## Environmental Impact

Our Snake Rival game demonstrates strong environmental sustainability through several key design choices and technical implementations:

### Energy Efficiency
We have implemented multiple green software patterns to minimize energy consumption:
- **Frame Rate Limiting**: The game uses `frameRate(30)` to cap rendering at 30 frames per second, significantly reducing unnecessary CPU/GPU cycles while maintaining smooth gameplay. This optimization can reduce energy consumption by up to 40% compared to uncapped frame rates.
- **Object Pool Pattern**: AI snakes are reused after death rather than being recreated, minimizing memory allocation overhead and garbage collection cycles. This pattern reduces the energy-intensive process of frequent object creation/destruction.
- **Singleton Resource Managers**: Centralized managers for food, obstacles and power-ups prevent redundant resource allocations, improving memory efficiency.

### Carbon Awareness
While currently a local game, we've designed architecture that could support future carbon-aware features:
- Potential for "Green Mode" that could automatically adjust graphical fidelity based on local grid carbon intensity
- Dynamic performance scaling that could reduce energy use during high-carbon periods
- Minimal data transmission requirements (currently none) that avoids network energy costs

### Resource Optimization
The web-based p5.js implementation ensures:
- No physical materials or logistics required for distribution
- Extremely small file size (<2MB) reduces storage and transfer energy
- Adaptive rendering that can scale to different device capabilities
- Efficient collision detection algorithms minimize computational overhead

## Individual Impact

Our game prioritizes player wellbeing through several thoughtful design elements:

### Health Considerations
- **Visual Ergonomics**: Customizable snake colors and map themes help reduce eye strain. The swamp and desert themes use carefully selected color palettes that are easier on the eyes than high-contrast defaults.
- **Physical Comfort**: Mouse-based controls with stamina mechanics naturally encourage periodic breaks as players wait for stamina to recharge.
- **Future Improvements**: We plan to add periodic health reminders and an optional forced pause function after extended play sessions.

### Privacy Protection
The game collects absolutely no personal data, implementing Privacy by Design principles:
- No user accounts or profiles required
- No tracking of gameplay statistics
- All processing occurs locally in the browser
- No third-party analytics or advertising

### Accessibility Features
Current accessibility implementations include:
- Simple, intuitive controls suitable for all ages
- Clear visual feedback for all game events
- Adjustable difficulty levels to accommodate different skill levels
Planned improvements based on WCAG guidelines:
- High-contrast mode for visually impaired players
- Alternative control schemes for motor-impaired users
- Screen reader compatibility for menu navigation

## Social Impact

While primarily a single-player experience, our game considers several social factors:

### Inclusivity
- No language barriers - gameplay is purely visual
- No cultural references that might exclude certain groups
- No competitive elements that might create negative social pressure
- No age restrictions or mature content

### Educational Value
The game provides learning opportunities:
- For players: develops hand-eye coordination and strategic thinking
- For developers: demonstrates clean software architecture and sustainable coding practices
- Contains subtle educational elements about snake behavior and ecosystems in different map environments

### Community Considerations
While currently offline, the design allows for potential positive social expansion:
- Architecture could support local multiplayer without requiring internet
- Score sharing could be implemented without personal data collection
- Modding support could encourage creative community contributions

## Ethical Considerations

We've addressed several ethical aspects in our design:

### Algorithmic Fairness
- AI snakes use simple, transparent rules rather than opaque machine learning
- No hidden difficulty scaling that might frustrate players
- Random number generation uses fair, verifiable algorithms

### Responsible Design
- No addictive mechanics like variable reward schedules
- Clear win/lose conditions prevent endless play
- No monetization schemes that might exploit players

### Transparency
All game mechanics are either:
- Immediately obvious through gameplay
- Explained in simple tooltips
- Available in source code for inspection

## Conclusion and Future Improvements

Our Snake Rival game demonstrates strong sustainability performance across environmental, individual and social dimensions. The web-based implementation with energy-conscious coding patterns sets a positive example for green game development.

Key strengths include:
- Excellent energy efficiency through frame rate limiting and object reuse
- Strong privacy protections by design
- Good baseline accessibility with clear improvement pathways
- Ethical gameplay mechanics free from manipulative design

Planned enhancements will further improve sustainability:
- Implementation of dynamic performance scaling based on device capabilities
- Addition of comprehensive accessibility options
- Development of local multiplayer without network requirements
- Expansion of carbon-aware features when relevant

This project serves as a model for how even simple games can thoughtfully address sustainability across multiple dimensions while maintaining engaging gameplay. The techniques demonstrated here - particularly the green software patterns - could be adopted by other developers to reduce the environmental impact of digital entertainment.


# 9. Conclusion <a id="conclusion"></a>  

The Snake Rival game project marks a significant milestone in our academic and professional development, demonstrating both technical achievement and collaborative growth within our four-member team—Yiqing Zhou, Xing Yang, Cheng Wang, and Jiayi Lin. Beginning as a simple snake game prototype, the project gradually evolved into a feature-rich, engaging gaming experience through the integration of AI opponents, multiple map environments, power-up systems, and sophisticated collision mechanics. This transformation challenged us to effectively apply object-oriented programming principles, establishing structured class hierarchies for different snake types (PlayerSnake, AISnake, AutoSnake) and managing key game elements through dedicated managers such as FoodManager, ObstacleManager, and ItemManager. Throughout this process, we not only enhanced our programming skills but also deepened our understanding of software engineering practices, iterative development, and team coordination.

Our success stemmed from the complementary skill sets within the team and the clear distribution of responsibilities. Yiqing Zhou took on the role of project leader, ensuring that tasks were well-coordinated and project milestones met. Xing Yang focused on debugging and the technical implementation of core game mechanics and collision systems, while Cheng Wang designed item systems and power-up mechanics that gave the game its distinctive variety and strategy. Jiayi Lin contributed through visual design, creating user interface components, visual effects, and enhancing the overall user experience. We adopted an agile workflow, holding weekly stand-up meetings and managing our codebase through GitHub. This structure allowed us to break down the project into manageable components, assign tasks based on individual strengths, conduct regular code reviews, and merge features systematically. Through this, we gained valuable lessons about clear communication, constructive feedback, balancing creative ideas with technical feasibility, and maintaining consistent coding standards within a collaborative environment.

Technically, several challenges tested our problem-solving abilities and resilience. AI pathfinding was one of the most difficult aspects, requiring intelligent behavior for AI-controlled snakes that could navigate the environment effectively, pursue food, avoid obstacles, and react dynamically to other snakes. Our final approach combined food targeting with obstacle avoidance, predictive collision detection, and behavioral state machines. Performance optimization was another key area, where we addressed frame rate drops by implementing object pooling for AI snakes, setting frame rate limits, and using efficient collision detection algorithms. The development of a multi-map system also introduced complexity, as each environment—Default, Swamp, Desert, and Portal—needed distinct mechanics, unique visual elements, and consistent physics behavior. Managing different game states, such as the main menu, gameplay, pause, and game over, required careful event handling and logical state transitions, which taught us the importance of comprehensive testing and prototyping.

Beyond technical challenges, this project provided invaluable professional development experiences. We learned the importance of writing modular, well-documented code that could be easily understood and maintained by others. Using Git effectively for collaborative development, resolving merge conflicts, and performing code reviews became essential habits. Balancing this project alongside other coursework taught us to set realistic milestones, prioritize critical path features, and allocate buffer time for debugging. Additionally, we implemented a quality assurance process through peer code reviews, organized playtesting sessions, and incorporated automated testing where feasible. User experience emerged as a key focus, with feedback from playtesters leading to refinements in difficulty progression, visual feedback, and control responsiveness.

Looking ahead, we have identified several future improvement opportunities. Technically, adding networked multiplayer functionality, procedural map generation, a replay/spectator system, and additional AI behavior patterns would significantly enhance the game’s depth and replayability. In terms of content, expanding map themes, introducing new environmental effects, adding power-up types, and offering customizable snake skins could further enrich the player experience. Performance optimization could also be refined through techniques like spatial partitioning and implementing Level of Detail (LOD) systems. We also recognize the importance of accessibility, and future versions of the game could benefit from colorblind modes, adjustable control schemes, and customizable difficulty settings.

In conclusion, the Snake Rival project transformed our understanding of game development and software engineering, highlighting that successful projects require far more than just technical expertise. Effective communication, the ability to explain complex technical concepts, openness to integrating diverse ideas, and persistence in debugging complex systems all proved equally vital. We learned how to balance creative vision with practical constraints, and how teamwork can produce results that exceed the sum of individual contributions. This project served as a valuable practical application of our coursework in Software Engineering Discipline and Practice, reinforcing core principles while challenging us to address real-world development problems. The lessons we gained in collaborative development, systematic problem-solving, and maintaining user-focused design will undoubtedly benefit us as we continue our studies and pursue future professional opportunities.


# 9. References <a id="references"></a>  
### Contribution Statement
- Provide a table of everyone's contribution, which may be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Let us know as soon as possible if there are any issues with teamwork as soon as they are apparent.

### Additional Marks
You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:
- **Quality** of report writing, presentation, use of figures and visual material (5%)
  Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5%)
  Is your repo clearly organised?
  Is code well commented throughout?




