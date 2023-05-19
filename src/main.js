import '../css/style.css';
import { Sky, Skyeffect, Sea, Splash, PHStatus } from './Background.js';
import { Word, WordFactory } from './Word.js';
import { Numeric } from './Numeric.js';
import bgm from '../assets/bgm.mp3';
import { CANVSIZ_X, CANVSIZ_Y, WORD_LOAD_PERIOD, WORD_DROP_PERIOD, INIT_VELOCITY, SEA_LEVEL, PLAY_LEVEL, INIT_EFFECT, SLOW_EFFECT, FAST_EFFECT, EFFECT_DURATION, ACCELERATE_VAL, WORDS_PER_LEVEL, INITIAL_PH } from "./Constants";

// Handle Text Input
const textInput = document.getElementById('textInput');
textInput.focus();
textInput.oninput = function () {
    const con = textInput.value;
}

// Global Variables Definition
let sky; // Sky object
let skyeffect; // Skyeffect object
let sea; // Sea object
let splash; // Splash object
let phstatus; // PHstatus object
let words = []; // List of imported Word objects
let wordCount = 0; // number of loaded words
let num; // Numeric object
let l; // Setinterval function
let mask = false; // Indicator of word hiding
let eff = INIT_EFFECT; // control drop rate
let effectFunc = function () {}; // Effect function
let restoreFunc = function () {}; // Reset function
let music; // background music

// Load Background Music
function preload() {
    music = loadSound(bgm);
  }

// Game Setup
function setup() {
    createCanvas(CANVSIZ_X, CANVSIZ_Y);
    music.loop();

    // Initialize Classes
    sky = new Sky(CANVSIZ_X, CANVSIZ_Y);
    skyeffect = new Skyeffect(CANVSIZ_X, CANVSIZ_Y);
    sea = new Sea(CANVSIZ_X, CANVSIZ_Y);
    splash = new Splash(0);
    phstatus = new PHStatus(CANVSIZ_X, CANVSIZ_Y);
    num = new Numeric(0, PLAY_LEVEL, INITIAL_PH);

    // Load Words Periodically Into Word List
    l = setInterval(() => {
        if (wordCount < WORDS_PER_LEVEL) {
            words = WordFactory.getInstance().getRandomWords(words, mask, 800, INIT_VELOCITY+ACCELERATE_VAL*(num.level-1));
            wordCount += 1;
            console.log(words);
        }
    }, WORD_LOAD_PERIOD-ACCELERATE_VAL*7000*(num.level-1));
}

// Draw Function
function draw() {
    background('eeeeee');
    
    // Control level
    levelUp();

    // Draw backgrounds and update states by the current game status
    sky.draw();
    sky.weather = num.changeWeather();
    skyeffect.weather = num.changeWeather();
    sea.acidity = num.changepH();

    // Word display
    for(let word of words) {
        word.draw();

        // When the word reaches the ocean, remove the word from screen
        // Also, update pH value, move pH bar and enable splash motion
        if(word.y >= SEA_LEVEL) {
            num.phUpdate();
            splash.x = word.x;
            splash.visible = true;
            splash.draw();
        }
        phstatus.ph = num.ph;
        word.inOcean();

        // Remove the correctly typed words or words in ocean from word list
        if(!word.isVisible()) {
            const index = words.indexOf(word);
            if (index >= 0) words.splice(index, 1);
            console.log(`word out: ${word.content}`);
        }
    }

    // Drop the words with constant rate
    let d = setInterval(() => {
        for(let word of words) word.drop();
    }, WORD_DROP_PERIOD*eff); 
    setTimeout(() => { clearInterval(d);}, WORD_DROP_PERIOD);

    // Draw clouds, sea, and pH status bar
    skyeffect.draw();
    phstatus.draw();
    sea.draw();
    num.draw();

    // Draw GAME OVER layer when the game overs
    if(num.gameOver()) {
        words = [];
        clearInterval(l);
        music.stop();
        textInput.style.display = 'none'; // Disable text input
        fill(0, 0, 0, 150);
        rect(0, 0, CANVSIZ_X, CANVSIZ_Y); 
        textSize(100);
        fill(255);
        textAlign(CENTER);
        text("GAME OVER", 400, 300);
    }
}

// Submit the word and enable interaction when Enter key is pressed
function keyPressed() {
    if (keyCode == 13) {
        const con = textInput.value;
        console.log(`textInput: ${con}`);

        for(let word of words) {
            // Remove the correct word, update score,
            // and enable effects when the word is blue
            // Also, disable word hiding effect when it is present
            if(con === word.content) {
                word.visible = false;
                num.scoreUpdate();
                if(mask) disableMask();
                if(word.color > 0) wordEffect();
            }

            // Redraw
            draw();
        }

        // Empty the text input box
        textInput.value = "";
    }
}

// When sufficient number of words are loaded,
// increment the level and disable all word effects
function levelUp() {
    if (wordCount === WORDS_PER_LEVEL && words.length === 0) {
        num.levelUpdate();
        wordCount = 0;
        eff = INIT_EFFECT;
        disableMask();
    }
}

// Disable hiding words
function disableMask() {
    num.display = -1;
    mask = false;
    for(let w of words) w.hide = false;
}

// Enable word effects
function wordEffect() {
    // Randomly decide the type of effect
    const decideEffect = Math.floor(Math.random()*4);
    // Set to display effects at the upperleft screen
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
    // Enable effects for certain period and disable it
    effectFunc();
    setTimeout(() => restoreFunc(), EFFECT_DURATION);
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;