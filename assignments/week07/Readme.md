# Think Aloud
Due to the simplicity of our current game mechanics, we have only set one task: for the player to score 100 points by controlling a small snake to eat food. The current game mechanics are such that the snake earns 1 point when it eats food, but dies and ends the game if it collides with an AI snake or the map boundaries. Since the food is sparsely distributed, completing this task takes about 5 minutes.
### critical moments: 
1. Players have noticed that the AI snake does not die upon colliding with the player's snake. This is an aspect we overlooked, as we only focused on the player's snake's condition. This is something we need to pay attention to in future development.

2. Players feel that the player's snake is not prominent enough on the screen, especially when it coils into a circle, making it difficult to distinguish the snake's head from its body. We could add eyes to the snake or outline its body to make its movement trajectory clearer. Additionally, we feel that the current grid background does not effectively showcase the snake's movement. Although it is implemented in the code, some optical illusions make the background appear static relative to the snake's movement.

3. Players have discovered a bug where the score is displayed after a game ends, but the score in the top left corner is not reset when a new game starts.

4. Players believe that the game's win condition is unclear, and the failure mechanism alone can easily make players lose interest. This is something we need to discuss. The classic Snake game also lacks a win mechanism, as do many other games. The loss of player interest may not be due to this issue alone; we need to add more stimulating elements to motivate players to continue playing. To this end, we have decided to introduce additional game mechanics, such as adding different types of food that grant temporary buffs or debuffs when eaten by the snake. We are also considering implementing a win condition, such as declaring victory when the player reaches 100 points, while allowing players to earn more points by maneuvering the AI snake to its death.
<br>

# Heuristic Evaluation
<table>
  <thead>
    <tr>
      <th><strong>interface</strong></th>
      <th><strong>issue</strong></th>
      <th><strong>heuristic</strong></th>
      <th><strong>frequency</strong></th>
      <th><strong>impact</strong></th>
      <th><strong>persistence</strong></th>
      <th><strong>severity</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>starting</td>
      <td>lack a description of gameplay mechanics, level selection, and the option to choose between single-player and multiplayer modes</td>
      <td>visibility of system status</td>
      <td>3</td>
      <td>3</td>
      <td>4</td>
      <td>3.33</td>
    </tr>
    <tr>
      <td>gaming</td>
      <td>ai Snake won't die when it touches the player</td>
      <td>consistency and standards</td>
      <td>4</td>
      <td>2</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <td>gaming</td>
      <td>unable to pause the game</td>
      <td>user control and freedom</td>
      <td>3</td>
      <td>2</td>
      <td>3</td>
      <td>2.67</td>
    </tr>
    <tr>
      <td>ending</td>
      <td>lack of winning conditions</td>
      <td>consistency and standards</td>
      <td>2</td>
      <td>4</td>
      <td>2</td>
      <td>2.67</td>
    </tr>
    <tr>
      <td>gaming</td>
      <td>difficulty in distinguishing snake movement</td>
      <td>recognition rather than recall</td>
      <td>2</td>
      <td>3</td>
      <td>3</td>
      <td>2.67</td>
    </tr>
    <tr>
      <td>gaming</td>
      <td>background and player snake visually synchronized</td>
      <td>aesthetic and minimalist design</td>
      <td>3</td>
      <td>1</td>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <td>gaming</td>
      <td>restarting the game doesn't not clear the score</td>
      <td>consistency and standards</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<br>

# Summary of areas requiring adjustments
- Make the head of the snake more obvious by adding eyes.

- Change the background.

- Add gameplay instructions, level selection, and single-player/multiplayer mode options to the start interface.

- Add a pause button to the game interface.

- New feature: Snake health bar, losing health upon being attacked (for future development).

- Increase food variety, corresponding to different forms and buffs (health increase, speed reduction, invincibility for 2 seconds, etc.).

- Add map obstacles; player snake dies upon collision.

- Fix bug: AI snake dies when its head collides with the player snake's body.

- Fix bug: Score resets to zero after game reset.

- New feature: AI snake randomly drops food upon death, allowing players to gain more points.

- New winning condition: Reaching 100 points is judged as a game win.

- New feature: Player snake gains a brief speed boost by holding down the left mouse button; player snake now has a stamina bar.

- New hard mode: Increased number of AI snakes, faster player speed, reduced food, and more obstacles on the map.



