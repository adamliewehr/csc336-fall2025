let dots = [];
let enemies = [];

// let upBullets = [];
// let downBullets = [];
// let leftBullets = [];
// let rightBullets = [];

let holster = [];

let spawnBox;

function setup() {
    // put setup code here

    createCanvas(800, 800);
    frameRate(240);

    for (let i = 0; i < 1; i++) {
        let dot = new Dot(width / 2, height / 2, i);
        dots.push(dot);

    }

    // for (let i = 0; i < 5; i++) {
    //     let enemy = new Enemy(Math.random() * width, Math.random() * height);
    //     enemies.push(enemy);

    // }

    spawnBox = new SpawnBox();



}

let enemyImg;
let pizzaImg;
let playButtonImg;
let explosionImg;
let gameOverImg;
let bulletImg;


function preload() {
    enemyImg = loadImage('enemy.png');
    pizzaImg = loadImage('pizza.png');
    playButtonImg = loadImage('playButton.png');
    explosionImg = loadImage('explosion.gif');
    gameOverImg = loadImage('gameOver.gif');
    bulletImg = loadImage('bullet.png');

}

let lostYet = false;
let clickedPlay = false;

let saveX = 0;
let saveY = 0;

let bulletSpeed = 3;




function draw() {
    // setting up the background and border of the canvas
    background('white');
    stroke(0);
    strokeWeight(10);
    noFill();
    rect(0, 0, width, height);

    if (!clickedPlay) {

        imageMode(CENTER);
        image(playButtonImg, width / 2, height / 2, 100, 100);

    }


    if (!lostYet && clickedPlay) {

        //spawnBox.draw();

        
        

        for (let dot of dots) {
            dot.draw();
            saveX = dot.x;
            saveY = dot.y;
            for (let enemy of enemies) {
                enemy.draw(dot.x, dot.y);
                if (dist(dot.x, dot.y, enemy.x, enemy.y) < 30) {


                    lostYet = true;

                }


            }
    

        }

        for (let bullet of holster) {
            bullet.draw();
            if (bullet.direction == 'up') {
                bullet.y += -bulletSpeed;
            }
            else if (bullet.direction == 'down') {
                bullet.y += bulletSpeed;
            }
            else if (bullet.direction == 'left') {
                bullet.x += -bulletSpeed;
            }
            else if (bullet.direction == 'right') {
                bullet.x += bulletSpeed;
            }

            for (let enemy of enemies) {
                if (dist(bullet.x, bullet.y, enemy.x, enemy.y) < 30) {
                    enemies.splice(enemies.indexOf(enemy), 1);

                }
            }



        }

    }

    if (lostYet) {
        imageMode(CENTER);
        image(explosionImg, saveX, saveY, 100, 100);

        imageMode(CENTER);
        image(gameOverImg, width / 2, height / 2, width / 2, height / 2);


    }


}

function mousePressed() {

    if (dist(mouseX, mouseY, width / 2, height / 2) < 100) {
        clickedPlay = true;

    }
}

let piDigits = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";


let count = 0;




function keyPressed() {

    if (key == 'r' || key == 'R') {

        spawnBox.draw();
        
        
        
        
        for (let i = 0; i < 10; i++) {
            let random1 = Math.random() * width;
            let random2 = Math.random() * height;

            


            if (dist(width/2, height/2, random1, random2)>300) {
                let enemy = new Enemy(random1, random2);
                enemies.push(enemy);
                
            }
            else {
                console.log('enemy removed');
            }

            
            


        }

    }

    else if (key == 'w') {
        holster.push(new Bullet(saveX, saveY, 'up', piDigits[count%piDigits.length]));
        count += 1;

    }

    else if (key == 's') {
        holster.push(new Bullet(saveX, saveY, 'down', piDigits[count%piDigits.length]));
        count += 1;


    }

    else if (key == 'a') {
        holster.push(new Bullet(saveX, saveY, 'left', piDigits[count%piDigits.length]));
        count += 1;


    }

    else if (key == 'd') {
        holster.push(new Bullet(saveX, saveY, 'right', piDigits[count%piDigits.length]));
        count += 1;


    }

    // testing purposes

    else if (key == 'c') {
        enemies = [];
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

        imageMode(CENTER);
        image(this.img, this.x, this.y, 50, 50);


        // learned this through CMU Academy when I taught last year
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

        this.dx = normalizedVector[0] * this.variableSpeed;
        this.dy = normalizedVector[1] * this.variableSpeed;

    }


}


let bulletSize = 25;

//let stay = 0;



class Bullet {
    constructor(x, y, direction, contents) {
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
        textAlign(CENTER, CENTER);


        textSize(bulletSize);
        fill(255);
        stroke(0);
        strokeWeight(4);


        text(this.contents, this.x, this.y);



    }
}


class SpawnBox {
    constructor() {


    }

    draw() {


        ellipse(width/2, height/2, 300, 300);

        //Rect(this.x, this.y, this.height, this.width);

    }
}