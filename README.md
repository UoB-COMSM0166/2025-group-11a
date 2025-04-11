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
8. [Conclusion](#conclusion)
9. [References](#references)



# 1. Development Team <a id="development-team"></a>  
<div align="center">
  (photo)
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
| Side-scrolling Action | Super Mario      | 5           | 4        | 5           | 14          |
| Arcade            | Snake              | 5           | 4        | 5           | 14          |
| Tower Defense     | Plants vs. Zombies | 4           | 4        | 3           | 11          |
| Roguelike         | Brotato            | 4           | 3        | 3           | 10          |
| Simulation (Management) | Stardew Valley | 2           | 3        | 2           | 7           |
| Puzzle            | Rusty Lake         | 1           | 2        | 4           | 7           |
| RPG               | Pokémon            | 1           | 2        | 4           | 7           |
| Simulation (Construction) | Poly Bridge | 1           | 2        | 4           | 7           |
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
- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked together.


# 8. Conclusion <a id="conclusion"></a>  
- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work.

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




