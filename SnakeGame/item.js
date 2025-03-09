class ItemManager {
  constructor() {
    this.items = [];
    this.tooltips = []; // 存储道具提示
    this.activeEffects = []; // 存储活跃的效果状态
    
    // 图标显示配置
    this.iconSize = 40;
    this.padding = 10;
    this.cornerOffset = 20;
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
  
  //在ai蛇死亡的位置生成随机道具
  generateItemAt(position) {
      let type = this.randomType();
      this.items.push({
          position: position,
          type: type
      });
  }
  
  randomType() {
    let types = ["invincible", "stamina", "enlarge"];
    return random(types);
  }

  drawItems() {
    push();
    for (let item of this.items) {
      if (item.type === "invincible") {
        fill(255, 215, 0);
      } else if (item.type === "stamina") {
        fill(0, 0, 255);
      } else if (item.type === "enlarge") {
        fill(128, 128, 128);
      }
      let x = item.position.x;
      let y = item.position.y;

      let size = gridSize * 0.8;
      triangle(
      x, y - size / 2,    
      x - size / 2, y + size / 2,
      x + size / 2, y + size / 2
      );
    }
    pop();
  }

  activateInvincible(){
    playerSnake.actInvincibility();
    this.addTooltip("Invincible!", playerSnake.body[0], [255, 215, 0]);
  }

  activateStamina(){
    playerSnake.actStamina();
    this.addTooltip("Stamina Restored!", playerSnake.body[0], [0, 128, 255]);
  }

  activateEnlarge(){
    playerSnake.actEnlarge();
    this.addTooltip("Enlarged!", playerSnake.body[0], [150, 150, 150]);
  }
  
  // 添加道具提示文本
  addTooltip(message, position, color) {
    this.tooltips.push({
      message: message,
      position: position.copy(),
      color: color || [255, 255, 255],
      alpha: 255,
      lifetime: 60,
      offsetY: 0
    });
  }
  
  // 更新和绘制所有提示
  updateTooltips() {
    push();
    textAlign(CENTER, CENTER);
    textSize(16);
    
    for (let i = this.tooltips.length - 1; i >= 0; i--) {
      let tooltip = this.tooltips[i];

      tooltip.lifetime--;
      
      tooltip.offsetY -= 1;
      
      tooltip.alpha = map(tooltip.lifetime, 0, 60, 0, 255);
      
      // 绘制提示文字 - 直接在游戏世界坐标系中绘制
      fill(tooltip.color[0], tooltip.color[1], tooltip.color[2], tooltip.alpha);
      stroke(0, tooltip.alpha * 0.8);
      strokeWeight(3);
      text(tooltip.message, tooltip.position.x, tooltip.position.y + tooltip.offsetY - gridSize * 2);
      
      if (tooltip.lifetime <= 0) {
        this.tooltips.splice(i, 1);
      }
    }
    pop();
  }

  updateStatusDisplay(playerSnake) {
    this.activeEffects = [];
    
    // 检查无敌状态
    if (playerSnake.isInvincible && playerSnake.invincibleDuration > 0) {
      this.activeEffects.push({
        type: 'invincible',
        color: [255, 215, 0],
        progress: playerSnake.invincibleDuration / 180, // 假设最大持续时间为180帧
        symbol: '✓',
        name: 'Invincible!'
      });
    }
    
    // 检查食物范围扩大状态
    if (playerSnake.isEnlarged && playerSnake.enlargeDuration > 0) {
      this.activeEffects.push({
        type: 'enlarge',
        color: [150, 150, 150], // 灰色
        progress: playerSnake.enlargeDuration / 180,
        symbol: '⊕',
        name: 'Enlarged!'
      });
    }
  }

  // 绘制状态图标
  drawStatusDisplay() {
    if (this.activeEffects.length === 0) return;
    
    push();
    resetMatrix();
    
    // 在屏幕左下角绘制图标
    let x = (this.cornerOffset)+20;
    let y = (height - this.cornerOffset - this.iconSize)+20;
    
    for (let effect of this.activeEffects) {
      this.drawStatusIcon(x, y, effect);
      x += this.iconSize + this.padding;
    }
    
    pop();
  }

  drawStatusIcon(x, y, effect) {
    push();
    noStroke();

    fill(0, 0, 0, 150);
    ellipse(x, y, this.iconSize);
    
    strokeWeight(4);
    noFill();
    stroke(effect.color[0], effect.color[1], effect.color[2], 200);
    let endAngle = 2 * PI * effect.progress;
    arc(x, y, this.iconSize * 0.8, this.iconSize * 0.8, -PI/2, -PI/2 + endAngle);
    
    // 显示剩余秒数（假设30帧/秒）
    let secondsLeft = Math.ceil(effect.progress * 180 / 30);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(secondsLeft + "Sec", x, y + 5);
    
    textSize(10);
    text(effect.name, x, y - 10);
    
    textSize(14);
    text(effect.symbol, x, y - 25);
    
    pop();
  }
}
