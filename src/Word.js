import { WORD_LOAD_PERIOD, WORD_SIZE, SEA_LEVEL, DROP_RATE } from "./Constants";
import randomWords from 'random-words';

const textInput = document.getElementById('textInput');
textInput.oninput = function () {
    const con = textInput.value;
    // console.log(`textInput: ${con}`);
}

class Word {
    constructor(content, x, y, velocity) {
        this.content = content;
        this.visible = true;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
    }

    isVisible() {
        return this.visible;
    }

    draw() {
        if(this.visible) {
            fill(0);
            textSize(WORD_SIZE);
            textAlign(CENTER);
            text(this.content, this.x, this.y);
        }
        // this.drop();
    }

    drop() {
        this.y = this.y + DROP_RATE;
    }

    inOcean() {
        if(this.y >= SEA_LEVEL) this.visible = false;
    }

    submit() {
        const con = textInput.value;
        console.log(`textInput: ${con}`);
        if(con == this.content) this.visible = false;
        draw();
    }
}

class WordFactory {
    static getInstance() {
        if (!this._instance) this._instance = new WordFactory();
        return this._instance;
    }

    getRandomWords(words, canvX, vel) {
        // const word = new Word(randomWords(), canvX*(Math.random()), 0, vel);
        // let l = setInterval(() => words.push(new Word(randomWords(), canvX*(Math.random()), 0, vel)), period);
        words.push(new Word(randomWords(), canvX*(Math.random()*0.8+0.1), 20, vel));
        return words;
    }
}

export { Word, WordFactory };