import '../css/style.css';
import { Sky, Skyeffect, Sea, Splash, PHStatus } from './Background.js';
import { Word, WordFactory } from './Word.js';
import { Numeric } from './Numeric.js';
import bgm from '../assets/bgm.mp3';
import { CANVSIZ_X, CANVSIZ_Y, WORD_LOAD_PERIOD, WORD_DROP_PERIOD, INIT_VELOCITY, SEA_LEVEL, PLAY_LEVEL, INIT_EFFECT, SLOW_EFFECT, FAST_EFFECT, EFFECT_DURATION, ACCELERATE_VAL, WORDS_PER_LEVEL, INITIAL_PH } from "./Constants";

const textInput = document.getElementById('textInput');
textInput.focus();
textInput.oninput = function () {
    const con = textInput.value;
}

let sky;
let skyeffect;
let sea;
let splash;
let phstatus;
let words = [];
let wordCount = 0;
let num;
let l;
let mask = false;
let eff = INIT_EFFECT;
let effectFunc = function () {};
let restoreFunc = function () {};
let music;

function preload() {
    music = loadSound(bgm);
  }

function setup() {
    createCanvas(CANVSIZ_X, CANVSIZ_Y);
    music.loop();
    sky = new Sky(CANVSIZ_X, CANVSIZ_Y);
    skyeffect = new Skyeffect(CANVSIZ_X, CANVSIZ_Y);
    sea = new Sea(CANVSIZ_X, CANVSIZ_Y);
    splash = new Splash(0);
    phstatus = new PHStatus(CANVSIZ_X, CANVSIZ_Y);
    num = new Numeric(0, PLAY_LEVEL, INITIAL_PH);
    l = setInterval(() => {
        if (wordCount < WORDS_PER_LEVEL) {
            words = WordFactory.getInstance().getRandomWords(words, mask, 800, INIT_VELOCITY+ACCELERATE_VAL*(num.level-1));
            wordCount += 1;
            console.log(words);
        }
    }, WORD_LOAD_PERIOD-ACCELERATE_VAL*7000*(num.level-1)); // need to be fixed
}

function draw() {
    background('eeeeee');
    levelUp();
    sky.draw();
    sky.weather = num.changeWeather();
    skyeffect.weather = num.changeWeather();
    sea.acidity = num.changepH();
    for(let word of words) {
        word.draw();
        if(word.y >= SEA_LEVEL) {
            num.phUpdate();
            splash.x = word.x;
            splash.visible = true;
            splash.draw();
        }
        phstatus.ph = num.ph;
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
    skyeffect.draw();
    phstatus.draw();
    sea.draw();
    num.draw();
    if(num.gameOver()) {
        words = [];
        clearInterval(l);
        music.stop();
        textInput.style.display = 'none';
        fill(0, 0, 0, 150);
        // tint(255, 150);
        rect(0, 0, CANVSIZ_X, CANVSIZ_Y); 
        textSize(100);
        fill(255);
        textAlign(CENTER);
        text("GAME OVER", 400, 300);
    }
}

function keyPressed() {
    if (keyCode == 13) {
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
        case 0: // pH recover
            console.log("effect 0");
            effectFunc = function () {num.ph = INITIAL_PH};
            restoreFunc = function () {
                num.display = -1;
                eff = INIT_EFFECT;
            };
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

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;