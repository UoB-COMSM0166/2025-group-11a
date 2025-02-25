class FoodManager {
  constructor() {
    this.foods = [];
  }

  generateFood(count = 1) {
    for (let i = 0; i < count; i++) {
      this.foods.push(createVector(
          random(-width * 1, width * 1),
          random(-height * 1, height * 1)
      ));
    }
  }

  drawFoods() {
    push();
    fill(255, 204, 0);
    for (let f of this.foods) {
      ellipse(f.x, f.y, gridSize * 0.8);
    }
    pop();
  }
}


