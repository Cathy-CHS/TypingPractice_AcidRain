import { WORD_SCORE, EFFECT_DURATION } from "./Constants";

class Numeric {
    constructor(score, level, ph) {
        this.score = score;
        this.level = level;
        this.ph = ph;
        this.threshold = 25;
        this.display = -1;
    }

    draw() {
        textSize(25);
        fill(100, 100, 180);
        textAlign(LEFT);
        text(`Score: ${this.score}`, 25, 45);
        text(`Level: ${this.level}`, 25, 80);
        this.displayEffect();
    }

    displayEffect() {
        if(this.display === 0) text("pH Recover", 25, 115);
        if(this.display === 1) text("Fastly", 25, 115);
        if(this.display === 2) text("Slowly", 25, 115);
        if(this.display === 3) text("Hide Word", 25, 115);
    }

    scoreUpdate() {
        this.score += WORD_SCORE*this.level;
    }

    levelUpdate() {
        this.level += 1;
    }

    phUpdate() {
        this.ph = parseFloat(this.ph-0.3).toFixed(1);
    }

    changeWeather() {
        if(this.level >= 7) return 2;
        else if(this.level >= 4) return 1;
        else return 0;
    }

    changepH() {
        if(this.ph > 5) return 2;
        else if(this.ph > 3) return 1;
        else return 0;
    }

    gameOver() {
        return (this.ph <= 1.0);
    }
}

export { Numeric };