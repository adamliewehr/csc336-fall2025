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

    for (let i = 0; i < 5; i++) {
        let enemy = new Enemy(Math.random() * width, Math.random() * height);
        enemies.push(enemy);

    }



}

let enemyImg;
let pizzaImg;
let playButtonImg;
let explosionImg;

function preload() {
    enemyImg = loadImage('enemy.png');
    pizzaImg = loadImage('pizza.png');
    playButtonImg = loadImage('playButton.png');
    explosionImg = loadImage('explosion.gif');

}

let lostYet = false;
let clickedPlay = false;

let saveX = 0;
let saveY = 0;

function draw() {
    // put drawing code here
    background('white');

    if (!clickedPlay) {

        imageMode(CENTER);
        image(playButtonImg, width / 2, height / 2, 100, 100);

    }




    // fill(mouseX / width * 360, 100, 100, 100);
    // stroke('black');
    // strokeWeight(10);
    // ellipse(mouseX, mouseY, mouseX, mouseY);

    

    if (!lostYet && clickedPlay) {
        for (let dot of dots) {
            dot.draw();
            for (let enemy of enemies) {
                enemy.draw(dot.x, dot.y);
                if (dist(dot.x, dot.y, enemy.x, enemy.y) < 30) {
                    saveX = dot.x;
                    saveY = dot.y;

                    lostYet = true;

                }
            }

        }

        // for (let enemy of enemies) {
            
        // }

    }

    if (lostYet) {
        imageMode(CENTER);
        image(explosionImg, saveX, saveY, 100, 100);
    }





}

function mousePressed() {
    // for (let dot of dots) {
    //     dot.clicked();
    // }

    if (dist(mouseX, mouseY, width / 2, height / 2) < 100) {
        clickedPlay = true;

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

        this.img = pizzaImg;


        this.dx = random(-5, 5);
        this.dy = random(-5, 5);

    }

    draw() {

        this.x += this.dx;
        this.y += this.dy;


        // Only draw the dot if it's visible
        // if (this.isVisible) {
        //     fill(108, 21, 12);
        //     ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        // }

        imageMode(CENTER);
        image(this.img, this.x, this.y, 30, 30);




        // learned this through CMU Academy when I taught last year
        let directionalVector = [mouseX - this.x, mouseY - this.y];
        let magnitude = sqrt(directionalVector[0] ** 2 + directionalVector[1] ** 2);
        let normalizedVector = [directionalVector[0] / magnitude, directionalVector[1] / magnitude];

        this.dx = normalizedVector[0] * 2.5;
        this.dy = normalizedVector[1] * 2.5;

    }

    // clicked() {

    //     let distance = dist(mouseX, mouseY, this.x, this.y);
    //     if (distance < this.radius) {

    //         this.isVisible = false;
    //     }

    // }

}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.img = enemyImg;

        this.dx = 0;
        this.dy = 0;

        this.variableSpeed = Math.random() * 2.4;

    }

    draw(toX, toY) {


        this.x += this.dx;
        this.y += this.dy;



        imageMode(CENTER);
        image(this.img, this.x, this.y, 50, 50);


        // learned this through CMU Academy when I taught last year
        let directionalVector = [toX - this.x, toY - this.y];
        let magnitude = sqrt(directionalVector[0] ** 2 + directionalVector[1] ** 2);
        let normalizedVector = [directionalVector[0] / magnitude, directionalVector[1] / magnitude];

        this.dx = normalizedVector[0]*this.variableSpeed;
        this.dy = normalizedVector[1]*this.variableSpeed;

    }




}