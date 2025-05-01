class ItemManager {
  constructor() {
    this.items = [];
    this.tooltips = [];
    this.activeEffects = []; 
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
  
  // generate buffered item where AI snake dies
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
      let x = item.position.x;
      let y = item.position.y;
      let size = gridSize * 0.8;
      
      noStroke();
      for (let r = size * 1.2; r > size * 0.8; r -= 2) {
        let alpha = map(r, size * 1.2, size * 0.8, 50, 150);
        
        if (item.type === "invincible") {
          fill(255, 215, 0, alpha);
        } else if (item.type === "stamina") {
          fill(0, 100, 200, alpha);
        } else if (item.type === "enlarge") {
          fill(50, 180, 50, alpha);
        }
        
        ellipse(x, y, r);
      }

      if (item.type === "invincible") {
        fill(255, 215, 0);
        stroke(255, 255, 200);
        strokeWeight(1.5);

        beginShape();
        vertex(x, y - size * 0.7);
        vertex(x + size * 0.6, y - size * 0.5);
        vertex(x + size * 0.5, y + size * 0.3);
        vertex(x, y + size * 0.7);
        vertex(x - size * 0.5, y + size * 0.3);
        vertex(x - size * 0.6, y - size * 0.5);
        endShape(CLOSE);

        stroke(255, 255, 200);
        strokeWeight(2);
        fill(255, 240, 110);

        push();
        translate(x, y);
        noStroke();
        fill(255);
        
        // cross shape
        rectMode(CENTER);
        rect(0, -size * 0.05, size * 0.15, size * 0.8);
        rect(0, -size * 0.15, size * 0.7, size * 0.15);

        for (let i = 0; i < 5; i++) {
          let angle = TWO_PI / 5 * i - PI/2;
          let sx = cos(angle) * size * 0.3;
          let sy = sin(angle) * size * 0.3;
          line(0, 0, sx, sy);
        }
        pop();
        
      } 
      else if (item.type === "stamina") {
        const batteryWidth = size * 0.8;
        const batteryHeight = size * 1.2;
        const batteryCorner = size * 0.1;
        const terminalWidth = size * 0.3;
        const terminalHeight = size * 0.15;
        
        push();
        // battery body
        stroke(255);
        strokeWeight(1.5);
        fill(80, 150, 255);
        rect(
            x - batteryWidth/2, 
            y - batteryHeight/2, 
            batteryWidth, 
            batteryHeight,
            batteryCorner
        );
        // battery top
        fill(255);
        noStroke();
        rect(
            x - terminalWidth/2, 
            y - batteryHeight/2 - terminalHeight, 
            terminalWidth, 
            terminalHeight,
            batteryCorner/2
        );

        const lightningSize = size * 0.8;
        fill(255);
        beginShape();
        // lightning shape
        vertex(x + lightningSize * 0.1, y - lightningSize * 0.6);
        vertex(x - lightningSize * 0.2, y - lightningSize * 0.1);
        vertex(x, y + lightningSize * 0.1);
        vertex(x - lightningSize * 0.3, y + lightningSize * 0.6);
        vertex(x + lightningSize * 0.2, y + lightningSize * 0.1);
        vertex(x, y - lightningSize * 0.1);
        endShape(CLOSE);
        
        pop();
      } else if (item.type === "enlarge") {
        // radar
        stroke(30, 100, 30);
        strokeWeight(1);
        fill(120, 200, 70);
        ellipse(x, y, size * 1.5);

        // radar rings
        noFill();
        stroke(130, 260, 130, 180);
        strokeWeight(1);
        ellipse(x, y, size * 1);
        ellipse(x, y, size * 0.7);
        ellipse(x, y, size * 0.45);
        stroke(255);
        ellipse(x, y, size * 1.5);
        
        // radar lines
        stroke(150, 255, 150);
        strokeWeight(3);
        let scanAngle = (frameCount * 0.05) % TWO_PI;
        line(x, y, x + cos(scanAngle) * size * 0.75, y + sin(scanAngle) * size * 0.75);
        
        fill(200, 255, 200);
        noStroke();
        ellipse(x, y, size * 0.15);
      }
      
      
      // particle effect
      if (frameCount % 5 === 0) {
        for (let i = 0; i < 2; i++) {
          let particleManager = {
            particles: []
          };
          
          let angle = random(TWO_PI);
          let distance = random(size * 0.8, size);
          let px = x + cos(angle) * distance;
          let py = y + sin(angle) * distance;
          
          if (item.type === "invincible") {
            fill(255, 215, 0, 150);
          } else if (item.type === "stamina") {
            fill(100, 150, 255, 150);
          } else if (item.type === "enlarge") {
            fill(200, 200, 200, 150);
          }
          
          noStroke();
          ellipse(px, py, random(2, 4));
        }
      }
    }
    pop();
  }

  activateInvincible(){
    playerSnake.actInvincibility();
    playerSnake.isInitialInvincibility = false;
    this.addTooltip("Invincible!", playerSnake.body[0], [255, 215, 0]);
  }

  activateStamina(){
    playerSnake.actStamina();
    this.addTooltip("Stamina Restored!", playerSnake.body[0], [80, 150, 255]);
  }

  activateEnlarge(){
    playerSnake.actEnlarge();
    this.addTooltip("Enlarged!", playerSnake.body[0], [120, 200, 70]);
  }
  
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
  
  updateTooltips() {
    push();
    textAlign(CENTER, CENTER);
    textSize(16);
    
    for (let i = this.tooltips.length - 1; i >= 0; i--) {
      let tooltip = this.tooltips[i];

      tooltip.lifetime--;
      tooltip.offsetY -= 1;
      tooltip.alpha = map(tooltip.lifetime, 0, 60, 0, 255);
      
      fill(tooltip.color[0], tooltip.color[1], tooltip.color[2], tooltip.alpha);
      stroke(0, tooltip.alpha * 0.8);
      strokeWeight(0.5);
      text(tooltip.message, tooltip.position.x, tooltip.position.y + tooltip.offsetY - gridSize * 2);
      
      if (tooltip.lifetime <= 0) {
        this.tooltips.splice(i, 1);
      }
    }
    pop();
  }

  updateStatusDisplay(playerSnake) {
    this.activeEffects = [];
    
    // check invincibility status
    if (playerSnake.isInvincible && playerSnake.invincibleDuration > 0) {
      this.activeEffects.push({
        type: 'invincible',
        color: [255, 215, 0],
        progress: playerSnake.invincibleDuration / 180, 
        symbol: '✓',
        name: 'Invincible'
      });
    }
    
    // check enlarge status
    if (playerSnake.isEnlarged && playerSnake.enlargeDuration > 0) {
      this.activeEffects.push({
        type: 'enlarge',
        color: [50, 180, 50],
        progress: playerSnake.enlargeDuration / 180,
        symbol: '⊕',
        name: 'Enlarged'
      });
    }
  }

  drawStatusDisplay() {
    if (this.activeEffects.length === 0) return;
    
    push();
    resetMatrix();
    
    const totalWidth = this.activeEffects.length * (this.iconSize + this.padding) - this.padding;
    let x = width / 2 - totalWidth / 2; 
    let y = this.cornerOffset + 30;   
    
    for (let effect of this.activeEffects) {
      this.drawStatusIcon(x, y, effect);
      x += this.iconSize + this.padding;
    }
    
    pop();
  }

}
