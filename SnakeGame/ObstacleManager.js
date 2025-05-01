class ObstacleManager {
  constructor() {
    this.obstacles = [];
  }

  generateObstacle(count = 1) {
    const safeMargin = 4 * gridSize; 
  
    for (let i = 0; i < count; i++) {
      const isHorizontal = random() > 0.4;
      // make sure the obstacles are not too close to the edge
      const boundary = {
        left: -width * mapSize/2 + safeMargin,
        right: width * mapSize/2 - safeMargin,
        top: -height * mapSize/2 + safeMargin,
        bottom: height * mapSize/2 - safeMargin
      };
  
      let x, y, length;
      
      if (isHorizontal) {
        length = floor(random(4, 10)) * gridSize;
        x = random(
          boundary.left,
          boundary.right - length 
        );
        y = random(boundary.top, boundary.bottom);
      } else {
        length = floor(random(4, 10)) * gridSize;
        x = random(boundary.left, boundary.right);
        y = random(
          boundary.top,
          boundary.bottom - length 
        );
      }
  
      const newObstacle = { x, y, length, isHorizontal };
      
      if (!this.isOverlapping(newObstacle)) {
        this.obstacles.push(newObstacle);
      } else {
        i--; 
      }
    }
  }

  isOverlapping(newObstacle) {
    const getBounds = (obs) => {
      if (obs.isHorizontal) {
        return {
          x1: obs.x,
          y1: obs.y - gridSize/4,
          x2: obs.x + obs.length,
          y2: obs.y + gridSize/4
        };
      } else {
        return {
          x1: obs.x - gridSize/4,
          y1: obs.y,
          x2: obs.x + gridSize/4,
          y2: obs.y + obs.length
        };
      }
    };

    // check if the new obstacle overlaps with any existing obstacles
    for (let o of this.obstacles) {
      const a = getBounds(newObstacle);
      const b = getBounds(o);

      if (a.x1 < b.x2 && a.x2 > b.x1 && 
          a.y1 < b.y2 && a.y2 > b.y1) {
        return true;
      }
    }
    return false;
  }

  drawObstacles() {
    push();
    fill(255, 0, 0);
    for (let o of this.obstacles) {
      if (o.isHorizontal) {
      this.drawHorizontalLadder(o.x, o.y, o.length, 0.5*gridSize);
      } else {
      this.drawVerticalLadder(o.x, o.y, 0.5*gridSize, o.length);
      }
    }
    pop();
  }

  drawHorizontalLadder(x, y, width, height) {
    // main horizontal bars
    stroke(210, 180, 140);
    strokeWeight(2);
    line(x, y, x + width, y);
    line(x, y + height, x + width, y + height);
    // ladder rungs - don't fill the whole space
    let numRungs = floor(width / (gridSize * 0.7));
    let margin = width * 0.1;
    let rungSpacing = (width - 2 * margin) / (numRungs - 1);
    
    for (let i = 0; i < numRungs; i++) {
      let rungX = x + margin + (i * rungSpacing);
      line(rungX, y, rungX, y + height);
    }
  }

  drawVerticalLadder(x, y, width, height) {
    stroke(210, 180, 140);
    strokeWeight(2);
    line(x, y, x, y + height);
    line(x + width, y, x + width, y + height);
    
    let numRungs = floor(height / (gridSize * 0.7));
    let margin = height * 0.1;
    let rungSpacing = (height - 2 * margin) / (numRungs - 1);
    
    for (let i = 0; i < numRungs; i++) {
      let rungY = y + margin + (i * rungSpacing);
      line(x, rungY, x + width, rungY);
    }
  }
}
