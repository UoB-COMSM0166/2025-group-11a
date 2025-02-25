let myImage;

function preload(){
  myImage = loadImage('image.jpg');
}

function setup() {
  createCanvas(500, 500);
  
  tint(255,100);
  background(myImage);
  
  noFill();
  strokeWeight(40);
  stroke(200);
  rect(0,0,500,500);
  
  noStroke();
  textSize(32);
  textFont('Comic Sans MS');
  fill(100);
  text("DRAW A PORTRAIT :)",90,50);
  
}

function draw() {
  if (mouseIsPressed) {  
    noStroke();
    fill(random(100,200));
    for (n=0; n<10; n++) {
      ellipse(
        mouseX + random(-5, 5),
        mouseY + random(-5, 5),
        1+random(4),
        1+random(4)
      )
    }  
  } 
}

