import { WORD_SCORE, PLAY_LEVEL, INITIAL_PH } from "./Constants";

class Numeric {
    constructor(score, level, ph) {
        this.score = score;
        this.level = level;
        this.ph = ph;
        this.threshold = 25;
    }

    draw() {
        textSize(20);
        fill(255, 0, 0);
        textAlign(LEFT);
        text(`Score: ${this.score}`, 20, 30);
        text(`pH: ${this.ph}`, 20, 60);
        text(`Level: ${this.level}`, 20, 90);
    }

    scoreUpdate() {
        this.score += WORD_SCORE;
    }

    levelUpdate() {
        this.level += 1;
    }

    phUpdate() {
        this.ph = parseFloat(this.ph-0.3).toFixed(1);
    }

    gameOver() {
        return (this.ph <= 1.0);
    }
}

export { Numeric };