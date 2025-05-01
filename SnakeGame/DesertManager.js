class DesertManager {
  constructor() {
    this.deserts = [];
    this.noiseSeed = 0;
  }

  generateDeserts(count = 5) {
    this.noiseSeed = random(1000);
    for (let i = 0; i < count; i++) {
      let center = createVector(
          random(-width * mapSize/2 + 200, width * mapSize/2 - 200),
          random(-height * mapSize/2 + 200, height * mapSize/2 - 200)
      );

      let desert = {
        position: center,
        points: this.generateOrganicDesertShape(center),
        slowdown: 0.6 
      };

      this.deserts.push(desert);
    }
  }

  generateOrganicDesertShape(center) {
    let points = [];
    const baseRadius = random(100, 180);
    const noiseLayers = [
      { scale: 0.15, weight: 0.5 },
      { scale: 0.4, weight: 0.3 },  
      { scale: 1.2, weight: 0.2 }   
    ];
    const pointCount = 36; 

    // basic shape generation
    for (let a = 0; a < TWO_PI; a += TWO_PI/pointCount) {
      let radius = baseRadius;
      noiseLayers.forEach(layer => {
        const xoff = cos(a) * layer.scale + this.noiseSeed;
        const yoff = sin(a) * layer.scale + this.noiseSeed;
        radius += noise(xoff, yoff) * layer.weight * baseRadius;
      });
      radius *= map(sin(a * 3 + this.noiseSeed), -1, 1, 0.95, 1.05);
      points.push(createVector(
          center.x + radius * cos(a),
          center.y + radius * sin(a)
      ));
    }

    // shape processing
    return this.processDesertShape(points);
  }

  processDesertShape(points) {
    // smooth the shape
    for (let i = 0; i < 3; i++) {
      points = points.map((p, idx) => {
        const prev = points[(idx + points.length - 1) % points.length];
        const next = points[(idx + 1) % points.length];
        return createVector(
            (prev.x + p.x * 4 + next.x) / 6,
            (prev.y + p.y * 4 + next.y) / 6
        );
      });
    }
    // add random noise
    return points.map(p =>
        createVector(
            p.x + random(-3, 3),
            p.y + random(-2, 2)
        )
    );
  }

  drawDeserts() {
    push();
    noStroke();
    for (let i = 0; i < this.deserts.length; i++) {
      let desert = this.deserts[i];
      let alpha = map(sin(frameCount * 0.01 + i), -1, 1, 80, 255);
      let offsetX = map(noise(frameCount * 0.005, i), 0, 1, -2, 2);
      let offsetY = map(noise(frameCount * 0.005 + 1000, i), 0, 1, -2, 2);
      let movedPosition = createVector(desert.position.x + offsetX, desert.position.y + offsetY);
      fill(150, 150, 150, alpha); 

      beginShape();
      for (let p of desert.points) {
        vertex(p.x + offsetX, p.y + offsetY);
      }
      vertex(desert.points[0].x + offsetX, desert.points[0].y + offsetY);
      endShape(CLOSE);
    }

    pop();
  }
}
