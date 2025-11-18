
import p5 from "p5";

let enemyImg;
let pizzaImg;
let playButtonImg;
let explosionImg;
let gameOverImg;
let bulletImg;
let playAgainImg;
let peperoniImg;

function preload() {
    enemyImg = loadImage('./gameImages/enemy.png');
    pizzaImg = loadImage('./gameImages/pizza.png');
    playButtonImg = loadImage('./gameImages/playButton.png');
    explosionImg = loadImage('./gameImages/explosion.gif');
    gameOverImg = loadImage('./gameImages/gameOver.gif');
    bulletImg = loadImage('./gameImages/bullet.png');
    playAgainImg = loadImage('./gameImages/playAgain.png');
    peperoniImg = loadImage('./gameImages/peperoni.png');

}

preload()

class Dot {

    constructor(x, y) {
        this.x = x;
        this.y = y;
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

        this.p5.imageMode(CENTER);
        this.p5.image(this.img, this.x, this.y, 50, 50);


        // learned this through CMU Academy when I taught middle school last year
        let directionalVector = [mouseX - this.x, mouseY - this.y];
        let magnitude = sqrt(directionalVector[0] ** 2 + directionalVector[1] ** 2);
        let normalizedVector = [directionalVector[0] / magnitude, directionalVector[1] / magnitude];

        this.dx = normalizedVector[0] * 2.5;
        this.dy = normalizedVector[1] * 2.5;

    }

}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.img = enemyImg;

        this.dx = 0;
        this.dy = 0;

        this.variableSpeed = difficultySpeed + (Math.random() * (0.4 - -0.4) + -0.4);

    }

    draw(toX, toY) {


        this.x += this.dx;
        this.y += this.dy;







        // learned this through CMU Academy when I taught middle school last year
        let directionalVector = [toX - this.x, toY - this.y];
        let magnitude = sqrt(directionalVector[0] ** 2 + directionalVector[1] ** 2);
        let normalizedVector = [directionalVector[0] / magnitude, directionalVector[1] / magnitude];

        this.dx = normalizedVector[0] * this.variableSpeed;
        this.dy = normalizedVector[1] * this.variableSpeed;

        // // for testing purposes (comment out when not needed)
        // fill(255);
        // stroke(0);
        // strokeWeight(4);
        // text(this.variableSpeed.toFixed(2), this.x, this.y-30);

        // actual enemy
        this.p5.imageMode(CENTER);
        this.p5.image(this.img, this.x, this.y, 50, 50);

    }


}

class Bullet {
    constructor(x, y, direction, contents) {
        this.bulletSize = 25;
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.img = bulletImg
        this.contents = contents;
    }

    draw() {



        // strokeWeight(2);

        // ellipse(this.x, this.y, bulletSize, bulletSize);
        // imageMode(CENTER);
        // image(this.img, this.x, this.y, bulletSize, bulletSize);
        this.p5.textAlign(CENTER, CENTER);


        this.p5.textSize(this.bulletSize);
        this.p5.fill(255);
        this.p5.stroke(0);
        this.p5.strokeWeight(4);


        this.p5.text(this.contents, this.x, this.y);



    }
}


class SpawnBox {
    constructor(x, y) {
        this.x = x;
        this.y = y;


    }

    draw() {


        this.p5.ellipse(this.x, this.y, 300, 300);

        //Rect(this.x, this.y, this.height, this.width);

    }
}

class Peperoni {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = peperoniImg;

    }

    draw() {

        this.p5.imageMode(CENTER);
        this.p5.image(this.img, this.x, this.y, 20, 20);


    }
}
