class SwampManager {
  constructor() {
    this.swamps = [];
    this.noiseSeed = 0;
  }

  generateSwamps(count = 5) {
    this.noiseSeed = random(1000);
    for (let i = 0; i < count; i++) {
      let center = createVector(
        random(-width * mapSize/2 + 200, width * mapSize/2 - 200),
        random(-height * mapSize/2 + 200, height * mapSize/2 - 200)
      );

      let swamp = {
        position: center,
        points: this.generateOrganicSwampShape(center),
        slowdown: 0.6 
      };

      this.swamps.push(swamp);
    }
  }
  generateOrganicSwampShape(center) {
    let points = [];
    const baseRadius = random(100, 180);
    const noiseLayers = [
      { scale: 0.15, weight: 0.5 }, 
      { scale: 0.4, weight: 0.3 },  
      { scale: 1.2, weight: 0.2 }   
    ];
    const pointCount = 36; 

    // base shape
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

    // process shape
    return this.processShape(points);
  }

  processShape(points) {
    // smooth corners
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

    return points.map(p =>
      createVector(
        p.x + random(-3, 3),
        p.y + random(-2, 2)
      )
    );
  }

  drawSwamps() {
    push();
    noStroke();
    fill(89, 170, 193, 50);
    for (let swamp of this.swamps) {
      beginShape();
      for (let p of swamp.points) {
        vertex(p.x, p.y);
      }
      endShape(CLOSE);
    }
    pop();
  }

  inSwamp(position) {
    for (let swamp of this.swamps) {
      if (this.pointInPolygon(position, swamp.points)) {
        return swamp.slowdown;
      }
    }
    return 1.0;
  }

  pointInPolygon(point, polygon) {
    let collision = false;
    for (let i = 0; i < polygon.length; i++) {
      let vc = polygon[i];
      let vn = polygon[(i + 1) % polygon.length];
      if (((vc.y > point.y) !== (vn.y > point.y)) &&
          (point.x < (vn.x - vc.x) * (point.y - vc.y) / (vn.y - vc.y) + vc.x)) {
        collision = !collision;
      }
    }
    return collision;
  }
}
