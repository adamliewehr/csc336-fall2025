let dots = [];
let enemies = [];

function setup() {
    // put setup code here

    createCanvas(800, 800);
    frameRate(240);

    for (let i = 0; i < 1; i++) {
        let dot = new Dot(width / 2, height / 2, i);
        dots.push(dot);

    }

    for (let i = 0; i < 2; i++) {
        let enemy = new Enemy(Math.random()*width, Math.random()*height);
        enemies.push(enemy);

    }



}

let enemyImg;

function preload() {
  enemyImg = loadImage('enemy.png'); 
}

function draw() {
    // put drawing code here
    background('white');

    // fill(mouseX / width * 360, 100, 100, 100);
    // stroke('black');
    // strokeWeight(10);
    // ellipse(mouseX, mouseY, mouseX, mouseY);

    for (let dot of dots) {
        dot.draw();
        for (let enemy of enemies) {
            if (dist(dot.x, dot.y, enemy.x, enemy.y)<30) {
                ellipse(width/2, height/2, 200, 200);
                
            }
        }

    }

    for (let enemy of enemies) {
        enemy.draw();
    }
    




}

function mousePressed() {
    for (let dot of dots) {
        dot.clicked();
    }
}




class Dot {

    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.hue = Math.random() * 360;
        this.radius = 25;
        this.isVisible = true;


        this.dx = random(-5, 5);
        this.dy = random(-5, 5);

    }

    draw() {

        this.x += this.dx;
        this.y += this.dy;


        // Only draw the dot if it's visible
        if (this.isVisible) {
            fill(108, 21, 12);
            ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        }

        
        // learned this through CMU Academy when I taught last year
        let directionalVector = [mouseX - this.x, mouseY - this.y];
        let magnitude = sqrt(directionalVector[0]**2+directionalVector[1]**2);
        let normalizedVector = [directionalVector[0]/magnitude, directionalVector[1]/magnitude];

        this.dx = normalizedVector[0]*2;
        this.dy = normalizedVector[1]*2;

    }

    clicked() {

        let distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < this.radius) {
            
            this.isVisible = false;
        }

    }

}

class Enemy {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.img = enemyImg;

        this.dx = 0;
        this.dy = 0;

    }

    draw() {
        

        this.x += this.dx;
        this.y += this.dy;



        imageMode(CENTER);
        image(this.img, this.x, this.y, 50, 50);

        
        // learned this through CMU Academy when I taught last year
        let directionalVector = [mouseX - this.x, mouseY - this.y];
        let magnitude = sqrt(directionalVector[0]**2+directionalVector[1]**2);
        let normalizedVector = [directionalVector[0]/magnitude, directionalVector[1]/magnitude];

        this.dx = normalizedVector[0];
        this.dy = normalizedVector[1];

    }




}