class TeleportManager {
  constructor() {
    this.teleports = [];
    this.teleportCooldown = 0; 
    this.cooldownTime = 30;
    this.teleportEffect = []; 
  }

  generateTeleports(count = 4) {
    this.teleports = [];

    for (let i = 0; i < count; i++) {
      let position = createVector(
          random(-width * mapSize/2 + 200, width * mapSize/2 - 200),
          random(-height * mapSize/2 + 200, height * mapSize/2 - 200)
      );

      // make sure the teleport points are not too close to each other
      let minDistance = 500;
      let isTooClose = false;

      for (let j = 0; j < this.teleports.length; j++) {
        if (p5.Vector.dist(position, this.teleports[j].position) < minDistance) {
          isTooClose = true;
          break;
        }
      }

      if (isTooClose) {
        i--;
        continue;
      }

      let portalColor = [
        random(100, 200), 
        random(100, 200),  
        random(200, 255)   
      ];

      this.teleports.push({
        position: position,
        color: portalColor,
        radius: gridSize * 2,
        active: true
      });
    }

    // assign a target teleportation point to each teleportation point (no duplicates)
    let destinations = [...Array(this.teleports.length).keys()];
    for (let i = 0; i < this.teleports.length; i++) {
      let validDestinations = destinations.filter(idx => idx !== i);
      let destIndex = random(validDestinations);

      this.teleports[i].destination = floor(destIndex);
      this.teleports[i].id = i;
    }
  }

  drawTeleports() {
    push();
    for (let teleport of this.teleports) {
      if (!teleport.active) continue;

      // outer circle
      let outerRadius = teleport.radius * 1.5;
      noFill();
      for (let i = 0; i < 2; i++) {
        let rotationOffset = (frameCount * 0.02 + i * PI);
        let transparency = map(sin(frameCount * 0.05 + i), -1, 1, 150, 255);

        stroke(teleport.color[0], teleport.color[1], teleport.color[2], transparency);
        strokeWeight(2);

        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.3) {
          let r = outerRadius + sin(a * 6 + rotationOffset) * (gridSize * 0.2);
          let x = teleport.position.x + cos(a) * r;
          let y = teleport.position.y + sin(a) * r;
          vertex(x, y);
        }
        endShape(CLOSE);
      }

      // inner circle
      noStroke();
      for (let r = teleport.radius; r > 0; r -= 5) {
        let alpha = map(r, teleport.radius, 0, 100, 200);
        fill(teleport.color[0], teleport.color[1], teleport.color[2], alpha);
        ellipse(teleport.position.x, teleport.position.y, r * 2);
      }

      // draw teleport ID
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(teleport.id + 1, teleport.position.x, teleport.position.y);

      // arrow line to destination
      let destPos = this.teleports[teleport.destination].position;
      let direction = p5.Vector.sub(destPos, teleport.position).normalize().mult(teleport.radius * 0.6);
      stroke(255, 255, 0, 200);
      strokeWeight(2);
      line(
          teleport.position.x,
          teleport.position.y,
          teleport.position.x + direction.x,
          teleport.position.y + direction.y
      );
      push();
      translate(teleport.position.x + direction.x, teleport.position.y + direction.y);
      rotate(direction.heading());
      fill(255, 255, 0, 200);
      noStroke();
      triangle(0, 0, -10, 5, -10, -5);
      pop();
    }

    // teleport effect
    for (let i = this.teleportEffect.length - 1; i >= 0; i--) {
      let effect = this.teleportEffect[i];
      effect.life--;

      // diffusion
      noFill();
      stroke(effect.color[0], effect.color[1], effect.color[2], map(effect.life, 0, effect.maxLife, 0, 255));
      strokeWeight(effect.life / 5);
      ellipse(effect.position.x, effect.position.y, (effect.maxLife - effect.life) * 6);

      // particles
      for (let j = 0; j < 5; j++) {
        let angle = random(TWO_PI);
        let distance = (effect.maxLife - effect.life) * 3;
        fill(effect.color[0], effect.color[1], effect.color[2], random(100, 255));
        noStroke();
        ellipse(
            effect.position.x + cos(angle) * distance,
            effect.position.y + sin(angle) * distance,
            random(3, 6)
        );
      }

      // remove effect if life is over
      if (effect.life <= 0) {
        this.teleportEffect.splice(i, 1);
      }
    }

    // flash
    if (gameMap.teleportManager.checkTeleport(playerSnake)) {
      playerSnake.teleportFlash();
    }

    pop();
  }

  checkTeleport(snake) {
    if (this.teleportCooldown > 0) {
      this.teleportCooldown--;
      return false;
    }

    let head = snake.body[0];
    for (let i = 0; i < this.teleports.length; i++) {
      let teleport = this.teleports[i];
      if (!teleport.active) continue;

      // check if snake head is within teleport radius
      if (p5.Vector.dist(head, teleport.position) < teleport.radius) {
        let destination = this.teleports[teleport.destination];

        this.addTeleportEffect(teleport.position, teleport.color);
        this.addTeleportEffect(destination.position, destination.color);

        // remain direction after teleport
        let newPosition = p5.Vector.add(
            destination.position,
            p5.Vector.mult(snake.direction, gridSize * 3)
        );

        // teleport snake
        let offset = p5.Vector.sub(newPosition, head);
        for (let j = 0; j < snake.body.length; j++) {
          snake.body[j].add(offset);
        }

        this.teleportCooldown = this.cooldownTime;

        if (snake === playerSnake) {
          itemManager.addTooltip("Teleported!", newPosition, [255, 255, 100]);
          teleportSound.play();
        }

        return true;
      }
    }
    return false;
  }

  addTeleportEffect(position, color) {
    this.teleportEffect.push({
      position: position.copy(),
      color: color,
      maxLife: 20,
      life: 20
    });
  }
}
