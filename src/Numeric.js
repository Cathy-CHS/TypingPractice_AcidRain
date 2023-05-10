import { WORD_SCORE, PLAY_LEVEL, INITIAL_PH } from "./Constants";

class Numeric {
    constructor(score, level, ph) {
        this.score = score;
        this.level = level;
        this.ph = ph;
        this.threshold = 25;
        this.display = -1;
    }

    draw() {
        textSize(20);
        fill(255, 0, 0);
        textAlign(LEFT);
        text(`Score: ${this.score}`, 20, 30);
        text(`pH: ${this.ph}`, 20, 60);
        text(`Level: ${this.level}`, 20, 90);
        this.displayEffect();
    }

    displayEffect() {
        if(this.display === 0) text("pH Recover", 20, 120);
        if(this.display === 1) text("Fastly", 20, 120);
        if(this.display === 2) text("Slowly", 20, 120);
        if(this.display === 3) text("Hide Word", 20, 120);
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

    gameOver() {
        return (this.ph <= 1.0);
    }
}

export { Numeric };