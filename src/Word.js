import { WORD_LOAD_PERIOD, WORD_SIZE, SEA_LEVEL } from "./Constants";
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

    draw() {
        if(this.visible) {
            textSize(WORD_SIZE);
            text(this.content, this.x, this.y);
        }
    }

    submit() {
        const con = textInput.value;
        console.log(`textInput: ${con}`);
        if(con === ((this.content+" "))) this.visible = false;
        textInput.value = "";
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
        words.push(new Word(randomWords(), canvX*(Math.random()), 20, vel));
        return words;
    }
}

export { Word, WordFactory };