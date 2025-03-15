class FoodManager {
  constructor() {
    this.foods = [];
    this.foodColors = []; 
  }

  generateFood(count = 1) {
    for (let i = 0; i < count; i++) {
      this.foods.push(createVector(
          random(-width * 1, width * 1),
          random(-height * 1, height * 1)
      ));

      this.foodColors.push({
        h: random(360),  // 随机色相
        s: random(20, 50),  // 高饱和度
        b: random(80, 100)   // 高亮度
      });
    }
  }

  drawFoods() {
    push();
    noStroke();
    colorMode(HSB, 360, 100, 100);
    // for (let f of this.foods) {
    //   ellipse(f.x, f.y, gridSize * 0.4);
    // }
    for (let i = 0; i < this.foods.length; i++) {
      let f = this.foods[i];
      let col = this.foodColors[i];
      
      fill(col.h, col.s, col.b);
      ellipse(f.x, f.y, gridSize * 0.4);
    }
    colorMode(RGB, 255);
    pop();
  }

  removeFood(index) {
    if (index >= 0 && index < this.foods.length) {
      this.foods.splice(index, 1);
      this.foodColors.splice(index, 1);
    }
  }
}


