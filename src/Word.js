import { EFFECT_DURATION, WORD_SIZE, SEA_LEVEL, DROP_RATE } from "./Constants";
import randomWords from 'random-words';

class Word {
    constructor(content, hide, x, y, velocity, color) {
        this.content = content;
        this.visible = true;
        this.hide = hide;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.color = color;
    }

    isVisible() {
        return this.visible;
    }

    draw() {
        if(this.visible) {
            fill(0, 0, this.color);
            textSize(WORD_SIZE);
            textAlign(CENTER);
            text(this.mask(), this.x, this.y);
        }
    }

    drop() {
        this.y = this.y + this.velocity;
    }

    inOcean() {
        if(this.y >= SEA_LEVEL) this.visible = false;
    }

    mask() {
        const len = this.content.length;
        if(this.hide) return this.content.slice(len).padStart(len, '*');
        else return this.content;
    }
}

class WordFactory {
    static getInstance() {
        if (!this._instance) this._instance = new WordFactory();
        return this._instance;
    }

    getRandomWords(words, hide, canvX, vel) {
        const colorList = [0, 0, 0, 0, 0, 1];
        const decideColor = Math.floor(Math.random()*colorList.length);
        words.push(new Word(randomWords(), hide, canvX*(Math.random()*0.8+0.1), 20, vel, 255*colorList[decideColor]));
        return words;
    }
}

export { Word, WordFactory };