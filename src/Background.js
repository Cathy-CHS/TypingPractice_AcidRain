import sky from '../assets/sky.jpg';
import sky2 from '../assets/sky2.jpg';
import sky3 from '../assets/sky3.jpg';
import sea from '../assets/sea.jpg';
import { SEA_LEVEL } from './Constants';

class Sky {
    constructor(x, y) {
        this.weather = 0;
        this.canvX = x;
        this.canvY = y;
        this.sky = loadImage(sky);
        this.sky2 = loadImage(sky2);
        this.sky3 = loadImage(sky3);
    }

    draw() {
        switch(this.weather) {
            case 0:
                imageMode(CORNER);
                tint(255, 150);
                image(this.sky, 0, -5, this.canvX, this.canvY);
                break;
            case 1:
                imageMode(CORNER);
                tint(255, 126);
                image(this.sky2, 0, -70, this.canvX, this.canvY);
                break;
            case 2:
                imageMode(CORNER);
                // tint(255, 126);
                image(this.sky3, 0, 0, this.canvX, this.canvY);
                break;
        }
    }
}

class Sea {
    constructor(x, y) {
        this.sea = loadImage(sea);
        this.canvX = x;
        this.canvY = y;
    }

    draw() {
        imageMode(CORNERS);
        noTint();
        // tint(150, 200, 255);
        image(this.sea, 0, SEA_LEVEL, this.canvX, this.canvY);
    }
}

export { Sky, Sea };