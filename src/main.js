import '../css/style.css';
import { Word, WordFactory } from './Word.js';
import { Numeric } from './Numeric.js';
import { WORD_LOAD_PERIOD, WORD_DROP_PERIOD, INIT_VELOCITY, SEA_LEVEL, PLAY_LEVEL, INITIAL_PH } from "./Constants";
import randomWords from 'random-words';
// import {RWG} from 'randomwordsgenerator';

const textInput = document.getElementById('textInput');
textInput.oninput = function () {
    const con = textInput.value;
    // console.log(`textInput: ${con}`);
}

let words = [];
let num;
let l;

function setup() {
    createCanvas(800, 600);
    num = new Numeric(0, PLAY_LEVEL, INITIAL_PH);
    l = setInterval(() => {
        words = WordFactory.getInstance().getRandomWords(words, 800, INIT_VELOCITY);
        // return words;
        console.log(words);
    }, WORD_LOAD_PERIOD);
    // 1. Init backgrounds and numeric display
}

function draw() {
    background('eeeeee');
    // let randomWords = require('random-words');
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
        fill(0, 200, 255);
        noStroke();
        rect(0, 450, 800, 600-SEA_LEVEL);
        // const word = randomWords();
        // console.log(word);
        // let rwg = new RWG();
        // console.log(rwg.GetWords());
        // while (!isEmpty(words)) 
        // words[words.length-1].draw();
        // words[0].draw();
        num.draw();
        for(let word of words) {
            word.draw();
            if(word.y >= SEA_LEVEL) num.phUpdate();
            word.inOcean();
            if(!word.isVisible()) {
                const index = words.indexOf(word);
                if (index >= 0) words.splice(index, 1);
                console.log(word.content);
            }
        }
        let d = setInterval(() => {
            for(let word of words) word.drop();
        }, WORD_DROP_PERIOD); 
        setTimeout(() => { clearInterval(d);}, WORD_DROP_PERIOD);
    }
}

// const textInput = document.getElementById('textInput');
// textInput.oninput = function () {
//     const con = textInput.value;
//     // console.log(`textInput: ${con}`);
// }

function keyPressed() {
    // enter or spacebar - submit the typed word
    if (key === ' ' || keyCode == 13) {
        // const con = textInput.value;
        // console.log(`textInput: ${con}`);
        // textInput.value = "";
        for(let word of words) {
            // word.submit();
            const con = textInput.value;
            console.log(`textInput: ${con}`);
            if(con === word.content) {
                word.visible = false;
                num.scoreUpdate();
            }
            draw();
            // word.draw();
        }
        textInput.value = "";
    }
}

// how can we automatically set cursor
// to the text input without using mouse?

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;