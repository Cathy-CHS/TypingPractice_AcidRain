import '../css/style.css';
import { Word, WordFactory } from './Word.js'
import { WORD_LOAD_PERIOD, INIT_VELOCITY, SEA_LEVEL } from "./Constants";
import randomWords from 'random-words';
// import {RWG} from 'randomwordsgenerator';

let words = [];

function setup() {
    createCanvas(800, 600);
    let l = setInterval(() => {
        words = WordFactory.getInstance().getRandomWords(words, WORD_LOAD_PERIOD, 800, INIT_VELOCITY);
        // return words;
        console.log(words);
    }, WORD_LOAD_PERIOD);
    // 1. Init backgrounds and numeric display
}

function draw() {
    background('eeeeee');
    // let randomWords = require('random-words');
    fill(180, 255, 255);
    noStroke();
    rect(0, 0, 800, 450);
    fill(0, 200, 255);
    noStroke();
    rect(0, 450, 800, 150);
    // const word = randomWords();
    // console.log(word);
    // let rwg = new RWG();
    // console.log(rwg.GetWords());
    // while (!isEmpty(words)) 
    // words[words.length-1].draw();
    // words[0].draw();
    // for(let word of words) word.draw();
    // let l = setInterval(() => {
    //     words[words.length-1].draw();
    // }, WORD_LOAD_PERIOD);
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
            word.submit();
            word.draw();
        }
    }
}

// how can we automatically set cursor
// to the text input without using mouse?

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;