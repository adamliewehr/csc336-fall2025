import Dot from "./p5Objects.js";
import Enemy from "./p5Objects.js";
import Bullet from "./p5Objects.js";
import SpawnBox from "./p5Objects.js";
import Peperoni from "./p5Objects.js";

let enemies = [];

let holster = [];

let spawnBox;

// let myDropdown;
let difficultySpeed = 0.5; // default speed
let dot;

dot = new Dot(width / 2, height / 2);
peperoni = new Peperoni(Math.random() * width, Math.random() * height);


spawnBox = new SpawnBox();

let lostYet = false;
let clickedPlay = false;

let saveX = 0;
let saveY = 0;

let bulletSpeed = 3;


let timesPressedR = 0;

let score = 0;
let highScore = 0;

let piDigits = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";


let count = 0;

class MainGame {
    constructor(p5) {
        this.p5 = p5;
    }



    setup() {
        this.p5.createCanvas(800, 800);
        this.p5.frameRate(240);



        // myDropdown = document.getElementById('myDropdown');

        // myDropdown.addEventListener('change', function () {
        //     let difficulty = this.value;
        //     if (difficulty == 'easy') {
        //         difficultySpeed = 0.5;
        //     } else if (difficulty == 'medium') {
        //         difficultySpeed = 1;
        //     } else if (difficulty == 'hard') {
        //         difficultySpeed = 2;
        //     }


        // });




    }

    draw() {
        // setting up the background and border of the canvas
        this.p5.background('white');
        this.p5.stroke(0);
        this.p5.strokeWeight(10);
        this.p5.noFill();
        this.p5.rect(0, 0, width, height);

        if (!clickedPlay) {

            this.p5.textAlign(CENTER, CENTER);


            this.p5.textSize(30);
            this.p5.fill(255);
            this.p5.stroke(0);
            this.p5.strokeWeight(4);

            this.p5.text("Controls and Instructions:", width / 2, height / 5);
            this.p5.text("Drag the mouse to move the player", width / 2, height / 3.9);
            this.p5.text("Collect pepperoni to increase your score", width / 2, height / 3.15)
            this.p5.text("Use WASD or the arrow keys to shoot", width / 2, height / 2.6);
            this.p5.text("Once you are comfortable with the controls", width / 2, height / 2.2);
            this.p5.text("Press r to start the fight after clicking play", width / 2, height / 1.9);

            this.p5.imageMode(CENTER);
            this.p5.image(playButtonImg, width / 2, height / 1.5, 100, 100);

        }


        if (!lostYet && clickedPlay) {

            //spawnBox.draw();

            this.p5.textAlign(CENTER, CENTER);

            this.p5.textSize(20);
            this.p5.fill(255);
            this.p5.stroke(0);
            this.p5.strokeWeight(4);


            this.p5.text(`Score: ${score}`, 50, 20);
            this.p5.text(`High Score: ${highScore}`, 73, 50);




            dot.draw();
            saveX = dot.x;
            saveY = dot.y;

            // peperoni

            peperoni.draw();

            if (this.p5.dist(dot.x, dot.y, peperoni.x, peperoni.y) < 30) {
                peperoni.x = Math.random() * width;
                peperoni.y = Math.random() * height;
                if (timesPressedR != 0) {
                    score += 1;
                    if (score > highScore) {
                        highScore = score;

                    }

                }


            }


            for (let enemy of enemies) {
                enemy.draw(dot.x, dot.y);
                if (this.p5.dist(dot.x, dot.y, enemy.x, enemy.y) < 30) {

                    score = 0;
                    lostYet = true;
                    enemies = [];
                    holster = [];

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
                    if (this.p5.dist(bullet.x, bullet.y, enemy.x, enemy.y) < 30) {
                        enemies.splice(enemies.indexOf(enemy), 1);

                    }
                }



            }

            if (enemies.length == 0 && timesPressedR > 0) {


                spawnBox.draw(saveX, saveY);




                for (let i = 0; i < 10; i++) {
                    let random1 = Math.random() * width;
                    let random2 = Math.random() * height;

                    if (dist(saveX, saveY, random1, random2) > 300) {
                        let enemy = new Enemy(random1, random2);
                        enemies.push(enemy);

                    }
                    else {
                        console.log('enemy removed');
                    }





                }

            }

        }

        if (lostYet) {
            this.p5.imageMode(CENTER);
            this.p5.image(explosionImg, saveX, saveY, 100, 100);

            this.p5.imageMode(CENTER);
            this.p5.image(gameOverImg, width / 2, height / 2, width / 2, height / 2);

            this.p5.imageMode(CENTER);
            this.p5.image(playAgainImg, width / 2, height / 1.5, 100, 100)

        }


    }

    mousePressed() {

        if (this.p5.dist(mouseX, mouseY, width / 2, height / 1.5) < 100) {
            clickedPlay = true;

        }

        if (lostYet && this.p5.dist(mouseX, mouseY, width / 2, height / 1.5) < 100) {
            clickedPlay = true;
            lostYet = false;
        }
    }

    keyPressed() {

        if (key == 'r' || key == 'R') {
            timesPressedR += 1;



            spawnBox.draw(saveX, saveY);


            for (let i = 0; i < 10; i++) {
                let random1 = Math.random() * width;
                let random2 = Math.random() * height;

                if (dist(saveX, saveY, random1, random2) > 300) {
                    let enemy = new Enemy(random1, random2);
                    enemies.push(enemy);

                }
                else {
                    console.log('enemy removed');
                }


            }

        }

        else if (key == 'w' || keyCode == UP_ARROW) {
            event.preventDefault();
            holster.push(new Bullet(saveX, saveY, 'up', piDigits[count % piDigits.length]));
            count += 1;

        }

        else if (key == 's' || keyCode == DOWN_ARROW) {
            event.preventDefault();
            holster.push(new Bullet(saveX, saveY, 'down', piDigits[count % piDigits.length]));
            count += 1;


        }

        else if (key == 'a' || keyCode == LEFT_ARROW) {
            event.preventDefault();
            holster.push(new Bullet(saveX, saveY, 'left', piDigits[count % piDigits.length]));
            count += 1;


        }

        else if (key == 'd' || keyCode == RIGHT_ARROW) {
            event.preventDefault();
            holster.push(new Bullet(saveX, saveY, 'right', piDigits[count % piDigits.length]));
            count += 1;


        }

        // testing purposes

        else if (key == 'c') {
            enemies = [];
        }




    }

}







export default MainGame;