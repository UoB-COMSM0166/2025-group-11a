# Skateholders
The stakeholders of the **Snake Game** can be analyzed in layers using the **onion model** to ensure that all key needs are fully considered.  
### **Core Layer: Direct Stakeholders**  
These are individuals directly involved in the game's development and experience:  
- **Players** 🎮 – Require a smooth gaming experience, intuitive controls, and engaging gameplay.  
- **Developers** 👨‍💻 – Responsible for programming and optimizing the game to ensure stable performance.  
- **Designers** 🎨 – Focus on UI/UX and game flow to create an intuitive and visually appealing interface.  
- **Testers** 🛠 – Ensure the game runs stably on different devices and resolve potential issues.  
### **Middle Layer: Indirect Stakeholders**  
These stakeholders support or influence the game without being directly involved in its creation:  
- **Game Operators** 🕹 (e.g., Steam, Google Play) – Handle game distribution, promotion, and maintenance, ensuring market performance, privacy compliance, and player feedback.  
- **Guardians** 👨‍👩‍👧‍👦 – Concerned about the gaming behavior of minors, expecting parental controls and anti-addiction mechanisms.
- **Advertisers** 📢 – Focus on precise ad delivery while ensuring ads do not disrupt the user experience.  
### **Outer Layer: External Influencers**  
These stakeholders shape the game's market presence and compliance:  
- **Regulators** ⚖ – Ensure compliance with **data privacy, age rating, and advertising policies**.  
- **Competitors** 🏆 – Drive market competition, encouraging continuous optimization and innovation.  
- **Game Community** 🌍 – Includes **streamers, forum users, and influencers**, who provide feedback and increase game awareness through social engagement.  
### **Conclusion**  
This stakeholder analysis helps the **development team** accurately **identify needs, optimize game design, and improve market competitiveness**. By considering all stakeholder groups, the game can **meet player expectations while achieving sustainable market growth**.  
<div align="center">
    <img width="408" alt="skateholders" src="https://github.com/user-attachments/assets/493b80dc-c43c-46d4-9e9a-78d451e56de6" />
    <p>Image 1: Skateholders of our Snake game</p>
</div>
<br>
<br>

# Epics and User Stories
#### **📌 Epic 1: Core Gameplay Optimization**
- As a player, I want to control the snake using touch or keyboard so that I can play easily.  
- As a player, I want the game speed to increase as the snake gets longer to enhance the challenge.
- As a player, I want animations and sound effects when the snake crashes to improve my experience.

#### **🎨 Epic 2: Visual and Sound Enhancements**
- As a player, I want to adjust the game’s background color to reduce eye strain.
- As a player, I want special sound effects when eating food to enhance immersion.

#### **🏆 Epic 3: Map Mode Optimization**
- As a player, I want different map modes, such as swamp, desert, and teleportation, each with unique characteristics, so that I can experience varied gameplay.
- As a player, I want the swamp mode to have slow movement areas, the desert mode to have occasional sandstorms, and the teleportation mode to feature portals for quick repositioning to enhance the challenge.

#### **⚙ Epic 4: Personalization and Accessibility Settings**
- As a player, I want to customize the snake’s color so that I can clearly distinguish it from the background and food.
- As a player, I want to adjust the game difficulty to match different challenge levels.  

#### **🕹 Epic 5: Multi-Mode Support**
- As a player, I want to choose endless mode to challenge my highest score.
- As a player, I want a timed mode where I can achieve the highest score within a limited time.

#### **🔗 Epic 6: Multi-Device Compatibility and Cloud Save**
- As a player, I want my game progress to be automatically saved in the cloud so that I don’t lose data when switching devices.
- As a player, I want to sync my game data between mobile and PC so that I can continue playing anytime, anywhere.

# Reflection
During the process of defining **epics and user stories** for our **Snake Game**, our team gained valuable insights into requirement engineering and product planning. Here are the key lessons learned:  
1. **How to Define a Clear User Story?**  
   We learned that a well-defined **user story** should follow the **As a [user], I want to [goal] so that [reason]** format. This structure helped us ensure clarity and **user-centric design**. For instance, defining *“As a player, I want to control the snake using touch or keyboard so that I can play easily”* made it explicit who the user is, what they need, and why it matters. We also realized that **breaking large epics into smaller, independent user stories** improves task allocation and implementation feasibility.  
2. **How to Determine Acceptance Criteria?**  
   Writing **clear acceptance criteria** was crucial to ensuring that each feature is properly implemented and tested. We followed the **Given-When-Then** structure to define testable outcomes. For example, for the **three different map modes**, we specified:  
   - *Given the player selects the swamp map, When they start the game, Then the terrain should include water hazards slowing down the snake.*  
   - *Given the player selects the desert map, When they play, Then food should appear less frequently, increasing difficulty.*  
   - *Given the player selects the teleport map, When the snake moves to a teleportation point, Then it should reappear on the opposite side of the screen.*  
   This approach made it easier for testers and developers to validate functionality against defined requirements.  
3. **How to Fit These Requirements into the Context of the Application?**  
   One major challenge was ensuring that our **user stories aligned with the overall game experience**. We had to balance **technical feasibility, gameplay mechanics, and user needs**. For instance, implementing **in-game reward prompts** required designing an intuitive notification system to guide players when they achieve milestones. Additionally, ensuring **historical gameplay records** were saved properly allowed players to review their past performances and track their progress over time. Prioritizing features using **MoSCoW (Must-have, Should-have, Could-have, Won’t-have)** helped us focus on essential functionality first, ensuring a smooth development process.  
### **Final Thoughts**  
By systematically breaking down **epics into user stories**, setting **clear acceptance criteria**, and aligning requirements with the **game’s objectives**, we enhanced both **gameplay design and development efficiency**. This structured approach not only improved team collaboration but also ensured that we built a **fun, accessible, and engaging Snake Game experience** for all players. 
