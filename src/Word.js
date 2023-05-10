import { EFFECT_DURATION, WORD_SIZE, SEA_LEVEL, DROP_RATE } from "./Constants";
import randomWords from 'random-words';

// const textInput = document.getElementById('textInput');
// textInput.oninput = function () {
//     const con = textInput.value;
//     // console.log(`textInput: ${con}`);
// }

class Word {
    constructor(content, x, y, velocity, color) {
        this.content = content;
        this.visible = true;
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
            text(this.content, this.x, this.y);
        }
        // this.drop();
    }

    drop() {
        this.y = this.y + this.velocity;
    }

    inOcean() {
        if(this.y >= SEA_LEVEL) this.visible = false;
    }

    submit() {
        // const con = textInput.value;
        // console.log(`textInput: ${con}`);
        // if(con == this.content) this.visible = false;
        // draw();
    }

    // effect(type) {
    //     let effectFunc;
    //     let restoreFunc;
    //     let backup = _.cloneDeep(this.content);
    //     switch(type) {
    //         case 1: // faster
    //             effectFunc = function () {this.velocity = this.velocity*VEL_EFFECT};
    //             restoreFunc = function () {this.velocity = this.velocity/VEL_EFFECT};
    //             break;
    //         case 2: // slower
    //             effectFunc = function () {this.velocity = this.velocity/VEL_EFFECT};
    //             restoreFunc = function () {this.velocity = this.velocity*VEL_EFFECT};
    //             break;
    //         case 3: // hide
    //             const len = this.content.length;
    //             effectFunc = function () {this.content = this.content.slice(-len).padStart(len, '*')};
    //             restoreFunc = function () {this.content = backup};
    //             break;
    //         }
    //     effectFunc();
    //     setTimeout(() => restoreFunc(), EFFECT_DURATION);
    // }
}

class WordFactory {
    static getInstance() {
        if (!this._instance) this._instance = new WordFactory();
        return this._instance;
    }

    getRandomWords(words, canvX, vel) {
        // const word = new Word(randomWords(), canvX*(Math.random()), 0, vel);
        // let l = setInterval(() => words.push(new Word(randomWords(), canvX*(Math.random()), 0, vel)), period);
        const colorList = [0, 0, 0, 0, 0, 1];
        const decideColor = Math.floor(Math.random()*colorList.length);
        words.push(new Word(randomWords(), canvX*(Math.random()*0.8+0.1), 20, vel, 255*colorList[decideColor]));
        return words;
    }
}

export { Word, WordFactory };