class GameMap {
  constructor(gridSize, mapSize, borderSize) {
    this.gridSize = gridSize;
    this.mapSize = mapSize;  
    this.borderSize = borderSize; 
    this.visibleRange = 2;    
    this.swampManager = new SwampManager();
    this.desertManager = new DesertManager();
    this.teleportManager = new TeleportManager();
  }

  generateSwamps() {
    this.swampManager.generateSwamps(difficultyMode === 'hard' ? 8 : 5);
  }

  drawSwamps() {
    this.swampManager.drawSwamps();
  }

  generateDeserts() {
    this.desertManager.generateDeserts(difficultyMode === 'hard' ? 8 : 5);
  }

  drawDeserts() {
    this.desertManager.drawDeserts();
  }

  generateTeleports() {
    this.teleportManager.generateTeleports(difficultyMode === 'hard' ? 6 : 4);
  }

  drawTeleports() {
    this.teleportManager.drawTeleports();
  }
}
