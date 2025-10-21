class Person {
    constructor (data) {
        this.data = data;
        this.x = random(0, width);
        this.y = random(0, height);
        this.hue = random(0, 360);
        this.radius = 50
        this.hover = false;
    }

    update () {
        fill(this.hue, 60, 100); // hue (range 0-360), saturation (range 0-100), brightness (0-100)
        ellipse(this.x, this.y, this.radius);
        textAlign(CENTER);
        fill(0,0, 0);
        strokeWeight(1);
        text(this.data.name, this.x, this.y);

        if (this.hover) {
            this.hue = 10;
        }
        // else {
        //     this.hue=random(0, 360);
        // }

    }
}