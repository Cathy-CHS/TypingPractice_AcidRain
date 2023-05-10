import '../css/style.css';
import { Word, WordFactory } from './Word.js';
import { Numeric } from './Numeric.js';
import { WORD_LOAD_PERIOD, WORD_DROP_PERIOD, INIT_VELOCITY, SEA_LEVEL, PLAY_LEVEL, INIT_EFFECT, SLOW_EFFECT, FAST_EFFECT, EFFECT_DURATION, WORDS_PER_LEVEL, INITIAL_PH } from "./Constants";

const textInput = document.getElementById('textInput');
textInput.oninput = function () {
    const con = textInput.value;
}

let words = [];
let wordCount = 0;
let num;
let l;
let mask = false;
let eff = INIT_EFFECT;
let effectFunc = function () {};
let restoreFunc = function () {};;

function setup() {
    createCanvas(800, 600);
    num = new Numeric(0, PLAY_LEVEL, INITIAL_PH);
    l = setInterval(() => {
        if (wordCount < WORDS_PER_LEVEL) {
            words = WordFactory.getInstance().getRandomWords(words, mask, 800, INIT_VELOCITY+0.1*(num.level-1));
            wordCount += 1;
            console.log(words);
        }
    }, WORD_LOAD_PERIOD);
}

function draw() {
    background('eeeeee');
    if(num.gameOver()) {
        textSize(100);
        fill(255, 0, 0);
        textAlign(CENTER);
        text("GAME OVER", 400, 300);
        clearInterval(l);
    } else {
        fill(180, 255, 255);
        noStroke();
        rect(0, 0, 800, SEA_LEVEL);
        fill(50*(INITIAL_PH-num.ph), 200, 255);
        noStroke();
        rect(0, 450, 800, 600-SEA_LEVEL);
        levelUp();
        num.draw();
        for(let word of words) {
            word.draw();
            if(word.y >= SEA_LEVEL) num.phUpdate();
            word.inOcean();
            if(!word.isVisible()) {
                const index = words.indexOf(word);
                if (index >= 0) words.splice(index, 1);
                console.log(`word out: ${word.content}`);
            }
        }
        let d = setInterval(() => {
            for(let word of words) word.drop();
        }, WORD_DROP_PERIOD*eff); 
        setTimeout(() => { clearInterval(d);}, WORD_DROP_PERIOD);
    }
}

function keyPressed() {
    // enter or spacebar - submit the typed word
    if (key === ' ' || keyCode == 13) {
        const con = textInput.value;
        console.log(`textInput: ${con}`);
        for(let word of words) {
            if(con === word.content) {
                word.visible = false;
                num.scoreUpdate();
                if(mask) disableMask();
                if(word.color > 0) wordEffect();
            }
            draw();
            // word.draw();
        }
        textInput.value = "";
    }
}

function levelUp() {
    if (wordCount === WORDS_PER_LEVEL && words.length === 0) {
        num.levelUpdate();
        wordCount = 0;
        eff = INIT_EFFECT;
        disableMask();
    }
}

function disableMask() {
    num.display = -1;
    mask = false;
    for(let w of words) w.hide = false;
}

function wordEffect() {
    const decideEffect = Math.floor(Math.random()*4);
    num.display = decideEffect;
    switch(decideEffect) {
        case 0:
            console.log("effect 0");
            effectFunc = function () {num.ph = INITIAL_PH};
            restoreFunc = function () {eff = INIT_EFFECT};
            break;
        case 1: // faster
            console.log("effect 1");
            effectFunc = function () {eff = INIT_EFFECT-FAST_EFFECT};
            restoreFunc = function () { 
                num.display = -1;
                eff = INIT_EFFECT;
            };
            break;
            case 2: // slower
            console.log("effect 2");
            effectFunc = function () {eff = INIT_EFFECT+SLOW_EFFECT};
            restoreFunc = function () {
                num.display = -1;
                eff = INIT_EFFECT;
            };
            break;
        case 3: // hide
            console.log("effect 3");
            effectFunc = function () {
                mask = true;
                for(let w of words) w.hide = true;
            };
            restoreFunc = function () {
                disableMask();
                eff = INIT_EFFECT;
            };
            break;
        }
    effectFunc();
    setTimeout(() => restoreFunc(), EFFECT_DURATION);
}

// how can we automatically set cursor
// to the text input without using mouse?

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;