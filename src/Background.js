import sky from '../assets/sky.jpg';
import sky2 from '../assets/sky2.jpg';
import sky3 from '../assets/sky3.jpg';
import sky_effect from '../assets/sky_effect.png';
import sky2_effect from '../assets/sky2_effect.png';
import sky3_effect from '../assets/sky3_effect.png';
import sea from '../assets/sea.jpg';
import sea2 from '../assets/sea2.jpg';
import sea3 from '../assets/sea3.jpg';
import splash from '../assets/splash.png';
import phbar from '../assets/ph.png';
import cursor from '../assets/cursor.png';
import font from '../assets/nethsans.ttf';
import { SEA_LEVEL, SPALSH_DURATION } from './Constants';

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
                image(this.sky3, 0, 0, this.canvX, this.canvY);
                break;
            }
    }
}

class Skyeffect {
    constructor(x, y) {
        this.weather = 0;
        this.canvX = x;
        this.canvY = y;
        this.sky_effect = loadImage(sky_effect);
        this.sky2_effect = loadImage(sky2_effect);
        this.sky3_effect = loadImage(sky3_effect);
    }

    draw() {
        noTint();
        switch(this.weather) {
            case 0:
                imageMode(CORNER);
                image(this.sky_effect, 0, -5, this.canvX, this.canvY);
                break;
            case 1:
                imageMode(CORNER);
                image(this.sky2_effect, 0, -70, this.canvX, this.canvY);
                break;
            case 2:
                imageMode(CORNER);
                image(this.sky3_effect, 0, 0, this.canvX, this.canvY);
                break;
            }
    }
}

class Sea {
    constructor(x, y) {
        this.acidity = 2;
        this.canvX = x;
        this.canvY = y;
        this.sea = loadImage(sea);
        this.sea2 = loadImage(sea2);
        this.sea3 = loadImage(sea3);
    }

    draw() {
        switch(this.acidity) {
            case 2:
                imageMode(CORNERS);
                image(this.sea, 0, SEA_LEVEL, this.canvX, this.canvY);
                break;
            case 1:
                imageMode(CORNERS);
                image(this.sea2, 0, SEA_LEVEL, this.canvX, this.canvY);
                break;
            case 0:
                imageMode(CORNERS);
                image(this.sea3, 0, SEA_LEVEL, this.canvX, this.canvY);
                break;
        }
    }
}

class Splash {
    constructor(x) {
        this.splash = loadImage(splash);
        this.x = x;
        this.visible = true;
    }

    draw() {
        if (this.visible) {
            imageMode(CENTER);
            image(this.splash, this.x, SEA_LEVEL, this.splash.width/2, this.splash.height/2);
        };
        setTimeout(() => this.visible = false, SPALSH_DURATION);
    }
}

class PHStatus {
    constructor(x, y) {
        this.ph = 7.0;
        this.canvX = x;
        this.canvY = y;
        this.phbar = loadImage(phbar);
        this.cursor = loadImage(cursor);
        this.font = loadFont(font);
    }

    draw() {
        imageMode(CORNERS);
        noTint();
        image(this.phbar, this.canvX*0.73, this.canvY*0.03, this.canvX*0.96, this.canvY*0.09);
        textFont(this.font, 25);
        fill(255);
        text('PH', this.canvX*0.705, this.canvY*0.075);
        imageMode(CENTER);
        noTint();
        image(this.cursor, this.canvX*(0.96-0.23*(7-this.ph)/6), this.canvY*0.085);
        textSize(18);
        fill(70);
        text(this.ph, this.canvX*(0.96-0.23*(7-this.ph)/6), this.canvY*0.128);
    }
}

export { Sky, Skyeffect, Sea, Splash, PHStatus };