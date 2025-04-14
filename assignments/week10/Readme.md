## Snake Rival SusAF Sustainability Analysis Report

### Game Overview
This is a single-player snake game developed using p5.js. Players can adjust the RGB values to choose their snake's color, select from four maps (Default, Swamp, Desert, Portal), and pick between two difficulty modes (Default or Hard) before starting the game. The snake’s direction is controlled by mouse movement, with a stamina bar that allows acceleration by holding the left mouse button when not empty. There are three power-ups: Invincibility, Expanded Foraging Range, and Stamina Boost. The map contains AI snakes, obstacles, and boundaries. Players can eliminate AI snakes by colliding with their heads, collecting food and power-ups. Colliding with obstacles, boundaries, or an AI snake’s body results in death. Players win by eating enough food within a time limit.

---

## SusAF Five-Dimension Sustainability Analysis

### 1. Social Dimension
- **Sense of Community**: As a single-player offline game, it lacks community interaction and has minimal impact on community sense.
- **Trust**: No networking or data collection involved; high player trust.
- **Inclusiveness and Diversity**: Simple controls make it accessible to players of all ages and backgrounds.
- **Equity**: No data analytics or smart decision-making; no algorithmic discrimination issues.
- **Participation and Communication**: Single-player mode, no player interaction involved.

### 2. Individual Dimension
- **Health**: Prolonged play may cause visual or hand fatigue. Health reminders and forced pause functions are recommended.
- **Lifelong Learning**: Limited learning effect for players but offers strong educational value for developers.
- **Privacy**: No networking features or personal data, zero privacy risks.
- **Safety**: No physical interaction, very safe.
- **Agency**: Players have complete control over color, map, difficulty, and game behavior.

### 3. Environmental Dimension
- **Material and Resources**: No physical resources consumed, only relies on electricity and hardware processing.
- **Pollution & Waste**: No physical waste; high frame rates or unoptimized rendering can increase energy consumption.
- **Energy**: Can reduce device energy use through frame rate limiting, optimized rendering, and idle energy-saving.
- **Biodiversity and Land Use**: No impact on ecosystems.
- **Logistics**: No logistics or transportation involved.

### 4. Economic Dimension
- **Value**: Offers entertainment and learning value, no direct economic value.
- **Customer Relationship Management**: Not a commercial product; no customer management system.
- **Supply Chain**: Purely digital, no supply chain.
- **Governance and Processes**: No enterprise governance or business processes involved.
- **Innovation and R&D**: Potential for research in green game development through energy-saving mechanisms and adaptive performance control.

### 5. Technical Dimension
- **Maintainability**: Based on p5.js, easy to maintain and modularize.
- **Usability**: Simple controls, accessible to a wide range of users; UI optimization recommended for visually impaired players.
- **Adaptability**: Web-based, compatible with multiple devices, frame rate can be dynamically adjusted according to device performance.
- **Security**: No networking or data storage, highly secure.
- **Scalability**: Fixed load for single-player mode; scalability needs to be reevaluated if expanded to multiplayer.

---

## Improvement Suggestions
1. Lower the default frame rate to 24-30 fps to reduce device energy consumption.
2. Pause rendering when the game is paused or the window loses focus to save idle resources.
3. Optimize for partial rendering, avoiding full screen refreshes.
4. Add a “Green Mode” to manually or automatically adjust performance based on grid carbon intensity.
5. Add health reminders and forced pause functions to protect player well-being.

---

## Conclusion
This snake game performs well in privacy, safety, device compatibility, and low resource consumption. The main areas for sustainability improvement are energy management, health reminders, and scalability for potential multiplayer modes. By implementing the proposed optimizations, the game can further enhance its environmental and individual sustainability performance, serving as a valuable reference case for green software development.

---

## Relevant Green Software Implementation Patterns

### 1. Frame Rate Limiting
**Application:** The game uses `frameRate(30)` in the `setup()` function to limit the frame rate.  
**Green Value:** Reduces unnecessary CPU/GPU cycles, lowering energy consumption and device heat generation while maintaining a smooth user experience.  
**Code Example:**
```javascript
function setup() {
  frameRate(30);
}
```

### 2. Object Pool Pattern
**Application:** AI snakes are reused after death to reduce memory allocation and object creation overhead.  
**Green Value:** Reduces frequent memory allocations and garbage collection, lowering energy usage associated with memory management.  
**Code Example:**
```javascript
smallSnakes.splice(i, 1);
smallSnakes.push(new AISnake());
```

### 3. Singleton-Like Resource Managers
**Application:** Managers like FoodManager, ObstacleManager, and ItemManager are instantiated globally as single instances.  
**Green Value:** Minimizes redundant resource allocations and centralizes management to improve memory and resource efficiency.  
**Code Example:**
```javascript
foodManager = new FoodManager();
```

### 4. Strategy Pattern for Resource-Efficient AI
**Application:** AI snakes use different pathfinding strategies such as `findRandomNearestFood()` and `moveTowardsFood()` to dynamically adjust their behavior.  
**Green Value:** Enables AI to select simpler, low-cost decision strategies in certain contexts, improving computational efficiency.  
**Code Example:**
```javascript
findRandomNearestFood(foods) { ... }
```

---

