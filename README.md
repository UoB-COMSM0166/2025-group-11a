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


# 2. Introduction <a id="introduction"></a>  
The starting point of this project is the classic game, Snake. However, compared to the traditional version where the snake is controlled using only the four arrow keys, we wanted to break this limitation on PC and make the snake's movement more fluid and free. Inspired by the mobile game Snake Battle (where players control the snake using a virtual joystick), we adopted a similar approach and used the mouse to control the snake’s movement direction.

The p5.js library turned out to be a great fit for this project, as it allows for mouse-based control and supports drawing the snake body using overlapping circles. This means we could render the snake directly in code without needing to create separate textures.

To enhance gameplay, we added special item-based food. When a player consumes these, they receive buffs such as increased food pickup range, temporary invincibility, or extended stamina for acceleration. We also designed different maps and difficulty levels, with each map introducing unique mechanics: swamps slow down movement, fog reduces visibility, and portals teleport players to other locations on the map.

Finally, it's worth mentioning that we implemented AI-controlled snakes that compete with the player for food. To balance the difficulty, AI snakes drop food upon death. Since any snake dies upon colliding with non-food objects, players can use this mechanic to eliminate AI snakes and collect more food.


# 3. Requirements <a id="requirements"></a>  



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




