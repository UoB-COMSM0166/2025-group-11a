# Objectives and Methods
## Objectives
This report assignment aims to evaluate the user experience of the SNAKE RIVAL game at lower difficulty (L1) and higher difficulty (L2) through quantitative methods (including NASA TLX and SUS), and compare the differences in workload and usability.
- Quantify SNAKE RIVAL workload (NASA TLX) and availability (SUS) at L1 and L2.
- Use statistical tests to determine the significance of differences.

Notes: NASA TLX is a subjective workload measurement tool covering six dimensions (Hart & Staveland, 1988). SUS is a reliable usability evaluation tool (Brooke, 1986). This study combines these two methods to analyze the impact of SNAKE RIVAL's workload and usability and its difficulty level on player experience.
## Methods
### Participants
- Quantify SNAKE RIVAL workload (NASA TLX) and availability (SUS) at L1 and L2.
- Use statistical tests to determine the significance of differences.
### Participants
- Quantify SNAKE RIVAL workload (NASA TLX) and availability (SUS) at L1 and L2.
- Use statistical tests to determine the significance of differences.
### Participants
- Quantify SNAKE RIVAL workload (NASA TLX) and availability (SUS) at L1 and L2.
- Use statistical tests to determine the significance of differences.
# Data Results
## Data Summary
| User ID | NASA TLX L1 |NASA TLX L2|SUS L1 | SUS L2 |
|---------|------------|------------|--------|--------|
| U1      | 28       | 63      | 75     | 75     |
| U2      | 35      | 65      |82.5     | 77.5    |
| U3      | 7      | 23      | 80     | 77.5     |
| U4      | 22      | 33         | 57.5     | 55   |
| U5      | 23     | 35      | 80   | 75     |
| U6      | 23       | 39      | 90   | 80     |
| U7      | 19      | 27       | 80   | 72.5     |
| U8      | 15       | 23      | 57.5   |57.5     |
| U9      | 13       | 19      | 80     | 75     |
| U10     | 13      | 20      | 67.5     | 65   |

- **Averages**:
  - NASA TLX L1: 19.8, NASA TLX L2: 34.7.
  - SUS L1: 75, SUS L2: 71. Both is higher than 68.
## Statistical Analysis
- **NASA TLX**:
  - Wilcoxon test result: W test statistic= 0 (n=10, number of non-tied pairs).
  - Critical value (n=10, α=0.05): 8.
  - Conclusion: W < 8, there is a significant difference.
- **SUS**:
  - Wilcoxon test result: W test statistic= 0 (n=8, number of non-tied pairs).
  - Critical value (n=8, α=0.05): 3.
  - Conclusion: W < 3, there is a significant difference.
# Discussion & Conclusion
## Interpretation of Data Results
  - **Workload**: L2 NASA TLX (34.7) is higher than L1 (19.8), presumably due to the increased physical control requirements (such as controlling the player snake to avoid obstacles) and attention efforts (such as finding areas with newly generated food on the map), and this difference is significant between the two difficulties.
  - **Usability**: The L2 SUS (71) is slightly lower than the L1 (75), indicating that the increased difficulty of L2 slightly reduces the usability of users’ perception and operation of the game system, and the difference is significant.
## Insights and Conclusion
  - **Is it consistent with expectations?** Compared with the expectation, L2 is expected to have higher workload and lower availability. The observed data results are consistent with the expectation and reach statistical significance, indicating that the difference in difficulty setting is sufficient and reasonable.
  - **What design was done to meet the test requirements?** By increasing the interval between food generation and shortening the task completion time, the difficulty of L2 is increased to amplify the workload difference. At the same time, in order to ensure the continuity of usability, the mouse control fluency and map settings of L2 are optimized to reduce the decrease in usability caused by the increase in workload.
  - **Is that enough?** The small sample size (only 10 participants) limits the statistical power and does not adequately account for the full results. The difference in difficulty between L1 and L2 may not be sufficient to fully reflect the change in game challenge of the Snake Rival game.
  - **What is the final conclusion?** The workload of L2 is higher than that of L1 (34.7 vs 19.8), and its SUS score is lower than that of L1 (71 vs 75), both of which are statistically significant (NASA TLX W = 0, SUS W = 0, p < 0.05). It is recommended to continue to maintain a balance between the difficulty of L1 and L2 and good usability.
# Appendix
## Raw Data
### NASA TLX L1&L2
| Dimensions | Mental<br>Demand | | Physical<br>Demand | | Temporal<br>Demand | | Frustration | | Effort | | Performance | |
|------|:---------------:|:---:|:----------------:|:---:|:----------------:|:---:|:----------:|:---:|:------:|:---:|:----------:|:---:|
| Two Levels| L1 | L2  | L1               | L2  | L1               | L2  | L1         | L2  | L1     | L2  | L1         | L2  |
| U1 | 25              | 70  | 25               | 60  | 25               | 50  | 5          | 50  | 15     | 50  | 75         | 100 |
| U2 | 50              | 30  | 50               | 75  | 25               | 75  | 35         | 70  | 25     | 65  | 25         | 75  |
| U3 | 10              | 25  | 5                | 15  | 5                | 50  | 5          | 5   | 10     | 15  | 5          | 25  |
| U4 | 30              | 60  | 30               | 40  | 25               | 30  | 10         | 20  | 10     | 20  | 25         | 30  |
| U5 | 40              | 55  | 30               | 45  | 15               | 30  | 10         | 25  | 15     | 20  | 30         | 35  |
| U6 | 45              | 65  | 20               | 45  | 20               | 40  | 15         | 30  | 20     | 25  | 20         | 30  |
| U7 | 40              | 50  | 10               | 30  | 15               | 20  | 10         | 20  | 20     | 20  | 20         | 35  |
| U8 | 30              | 40  | 10               | 20  | 20               | 25  | 10         | 15  | 15     | 20  | 5          | 20  |
| U9 | 15              | 20  | 15               | 20  | 15               | 25  | 10         | 10  | 15     | 20  | 10         | 20  |
| U10| 10              | 15  | 10               | 20  | 15               | 20  | 20         | 20  | 15     | 25  | 10         | 20  |

Note：The scoring method is: (selected scale position - 1) × 5. Thus, The original score of the six dimensions is from 0 to 100.
### SUS L1&L2
| SUS | 1.I would use the system frequently |  |2.The system unnecessarily complex|  | 3.The system is easy to use. |  | 4.Need support of a technical person |  | 5.Various functions were well integrated |  | 6.Too much inconsistency in the system |  | 7.Most people learn the system quickly|  | 8.Very cumbersome to use|  | 9.I felt very confident when using |  | 10.Need to learn a lot of things. |  |
|-----|--------------|--|--------------|--|------------|--|------------|--|------------|--|------------|--|------------|--|------------|--|--------------|--|--------------|--|
|     | L1           | L2 | L1           | L2 | L1         | L2 | L1         | L2 | L1         | L2 | L1         | L2 | L1         | L2 | L1         | L2 | L1           | L2 | L1           | L2 |
| U1  | 5            | 5  | 1            | 1  | 3          | 3  | 3          | 3  | 4          | 3  | 2          | 2  | 5          | 5  | 1          | 1  | 3            | 3  | 3            | 2  |
| U2  | 4            | 3  | 1            | 1  | 5          | 5  | 3          | 3  | 4          | 3  | 2          | 2  | 4          | 4  | 1          | 1  | 4            | 4  | 1            | 1  |
| U3  | 5            | 5  | 2            | 3  | 2          | 2  | 2          | 2  | 4          | 4  | 1          | 1  | 5          | 5  | 1          | 1  | 3            | 3  | 1            | 1  |
| U4  | 4            | 3  | 3            | 3  | 2          | 4  | 3          | 3  | 3          | 3  | 5          | 3  | 5          | 3  | 2          | 2  | 4            | 3  | 3            | 3  |
| U5  | 5            | 5  | 1            | 1  | 3          | 3  | 2          | 2  | 4          | 3  | 2          | 2  | 5          | 5  | 1          | 1  | 3            | 3  | 2            | 2  |
| U6  | 5            | 4  | 1            | 1  | 5          | 5  | 2          | 3  | 4          | 3  | 2          | 2  | 5          | 4  | 1          | 1  | 4            | 4  | 1            | 1  |
| U7  | 5            | 4  | 3            | 3  | 2          | 2  | 2          | 2  | 5          | 4  | 1          | 1  | 5          | 5  | 1          | 1  | 3            | 3  | 1            | 2  |
| U8  | 4            | 3  | 3            | 2  | 2          | 4  | 3          | 3  | 3          | 3  | 5          | 3  | 5          | 3  | 2          | 2  | 4            | 3  | 2            | 3  |
| U9  | 5            | 5  | 3            | 3  | 2          | 2  | 2          | 2  | 5          | 4  | 1          | 1  | 5          | 5  | 1          | 1  | 3            | 3  | 1            | 2  |
| U10 | 4            | 4  | 3            | 2  | 2          | 4  | 3          | 3  | 4          | 3  | 2          | 2  | 5          | 4  | 2          | 2  | 4            | 3  | 2            | 3  |
