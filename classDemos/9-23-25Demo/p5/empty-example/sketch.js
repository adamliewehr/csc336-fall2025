let dots = [];

function setup() {
  // put setup code here

  createCanvas(800, 800);

  for (let i = 0; i < 100; i++) {
    let dot = new Dot(width / 2, height / 2, i);
    dots.push(dot);

  }



}

function draw() {
  // put drawing code here
  background('white');

  fill(mouseX / width * 360, 100, 100, 100);
  stroke('black');
  strokeWeight(10);
  ellipse(mouseX, mouseY, mouseX, mouseY);

  for (let dot of dots) {
    dot.draw();

  }




}


class Dot {

  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.hue = Math.random() * 360;
    this.radius = 100 + dots.length - this.index * 2;

    this.velocityX = random(-5, 5);
    this.velocityY = random(-5, 5);



  }

  draw() {
    // this.x += (-0.5 + Math.random()) * 10;
    // this.y += (-0.5 + Math.random()) * 10;

    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.x > width || this.x < 0) {
      this.velocityX *= -1;
    }

    if (this.y > height || this.y < 0) {
      this.velocityY *= -1;
    }



    //this.x += Map(Math.random(), 0, 1, -1, 1);


    fill(255, 255, 255, fill.hue);
    ellipse(this.x, this.y, this.radius, this.radius);
  }

}