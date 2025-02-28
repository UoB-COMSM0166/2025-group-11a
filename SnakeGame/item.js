class ItemManager {
    constructor() {
      this.items = [];
    }
  
    generateItem(count = 1) {
      for (let i = 0; i < count; i++) {
        let type = this.randomType();
        this.items.push({
          position: createVector(
            random(-width * 1, width * 1),
            random(-height * 1, height * 1)
          ),
          type: type
        });
      }
    }
  
    randomType() {
      let types = ["invincible", "stamina", "helmet"];
      return random(types);
    }
  
    drawItems() {
      push();
      for (let item of this.items) {
        if (item.type === "invincible") {
          fill(255, 215, 0); // 金色代表无敌
        } else if (item.type === "stamina") {
          fill(0, 0, 255); // 蓝色代表耐力
        } else if (item.type === "helmet") {
          fill(128, 128, 128); // 灰色代表头盔
        }
        // 假设你想绘制一个朝上的三角形
        let x = item.position.x;
        let y = item.position.y;

        // 三角形的三个顶点
        let size = gridSize * 0.8; // 三角形的边长
        triangle(
        x, y - size / 2,     // 顶点（向上）
        x - size / 2, y + size / 2, // 左下角
        x + size / 2, y + size / 2  // 右下角
        );
      }
      pop();
    }
  }
  
