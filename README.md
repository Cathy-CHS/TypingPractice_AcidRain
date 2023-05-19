# ID311 Project 1: Typing Practice Game 'Acid Rain'

### Basic Inforation & Links
- ID: 20200633
- Name: Haeseul Cha
- Email: jjchs1@kaist.ac.kr
- [Git Repository](https://github.com/Cathy-CHS/TypingPractice_AcidRain.git)
- [Video Demo](https://youtu.be/4jsnyMEP20k)

### Content
  - [Ideation: What is 'Acid Rain'?](#ideation:-what-is-acid-rain?)
  - [Mechanism](#mechanism)
  - [Code Organization](#code-organization)
  - [Technical Issues](#technical-issues)
  - [References & Resources](#references-&-resources)

## Ideation: What is 'Acid Rain'?
**Acid Rain** is one of the typing practice games included in 'Hancom Typing Practice 2007', which is developed by HANCOM Inc. The game helps users improve typing skills, with *removing acid word raindrops and saving the ocean!* This [game playing video](https://youtu.be/AVlQQAfFlKo) may help you understand much better about the game.

## Mechanism
![description](./assets/description.png)
According to the playing window shown in the image, the overall mechanism of *Acid Rain* is as follows.
1. **How Does This Game Work?**
   - *Acid raindrops*, which are randomly created words, fall from the sky. When the word reaches to the sea surface, it disappears and make the ocean *acid*.
   - The *pH level* of the ocean decreases as more and more words are dissolved in it. It drops by 0.3 per word, starting from 7.0. When it becomes 1.0, the game ends.
   - The words can be disappeared when users *type* and submit them in the downside text input box.
   - When certain numbers of words are dropped, the level of the game is incremented and the falling speed increases. The faster the speed, the more words the users will miss.
   - Some of the words have *special effects* for a short period when the user destroy it. They are blue-colored to be distinguished with normal words. When the effects are enabled, the name of effects are displayed at the upperleft side of the screen, where the level and score are located.
     - Increase/decrease the falling speed
     - Hide words by masking with *'?'* (If the user types any correct word, then this effect vanishes.)
     - Reset the pH value of the ocean to start value (=7.0)
2. **What Should Users Do?**
    - Users have to destroy the word raindrops by typing the word correctly, before the ocean becomes *too acid*.
    - When users type words and press enter, the input box becomes empty and the typed word is sent.
    - Users get points for each correct word, and the goal is to get points as much as they can. When the level increases, points per word also gets higher and higher.

## Code Organization
#### Code Architecture
```sh
TypingPractice_AcidRain
├── assets
├── css
│   └── style.css
├── src
│   ├── Background.js
│   ├── Constants.js
│   ├── main.js
│   ├── Numeric.js
│   └── Word.js
└── index.html
```
#### UML Diagram
![UML Diagram](./assets/UML_Diagram.png)
- **`Background.js`** : Draws backgrounds and handle interactions with it
  - Class `Sky` : Draws sky background by `draw()` function. The sky depends on the value of `weather`, which is changed by the `level` of `Numeric`.
  - Class `Skyeffect` : Draws cloud layer which partially hides the words by `draw()` function. The cloud also depends on the value of `weather`.
  - Class `Sea` : Draws ocean layer by `draw()` function. The image of sea changes by the value of `acidity`, as the `ph` of `Numeric` fluctuates.
  - Class `Splash` : Draws splash effect by `draw()` function. This is caused when the word reaches to the ocean. To show the splash image temporarily, `setTimeout()` method is used.
  - Class `PHStatus` : Monitors pH status with pH bar and cursor by `draw()` function. The numeric value of pH status and x position of pH cursor change as the `ph` of `Numeric` fluctuates.
- **`Word.js`** : Generates words and control effects with it
  - Class `Word` : Class for each falling word
    - `constructor()`
        - `content` : the string content of word
        - `visible` : control the visablilty of word at the screen
        - `hide` : control the masking of word with *'?'*
        - `x` & `y` : x & y position of word
        - `velocity` : amount of falling per each cycle
        - `color` : color of word to distinguish blue words
        - `font` : font of word
    - `isVisible()` : Returns the visiblity of word.
    - `draw()` : Draws the word when it is visible. The color of word becomes black or blue depending on `this.color`. If the word is masked by function `mask()`, it gets the result of `mask()` and the masked word is printed.
    - `drop()` : Increases the y position of word by `this.velocity`.
    - `inOcean()` : Makes the word invisible when the word reaches the ocean.
    - `mask()` : If `this.hide` is true, masks the word with *'?'* and returns it. Else, just returns the content of word.
  - Class `WordFactory` : Generates words
    - `getInstance()` : Gets instance of `WordFactory()` class.
    - `getRandomWords()` : Generates a random word and pushes into `words` list. The ratio of blue words is determined by the `colorList` constant in the function. Also, the function randomly sets the content and x value of the word so that random words are imported in random position.
- **`Numeric.js`** : Controls numeric status (score, level, pH) and enable effects
  - Class `Word` : Class for each falling word
    - `constructor()`
        - `score` : the score of game
        - `level` : the level of game
        - `ph` : the pH value of ocean
        - `display` : control the display of effects when enabled
    - `isVisible()` : Returns the visiblity of word.
    - `draw()` : Draws the numeric values(score, level), and show which effect is present by `displayEffect()` function.
    - `displayEffect()` : By the value of `this.display` which is determined by the type of effect, displays the content of effect at the screen.
    - `scoreUpdate()` : Updates the score. The adding value depends on `this.level`.
    - `levelUpdate()` : Increments the level.
    - `phUpdate()` : Decrements the pH value.
    - `changeWeather()` : Returns numeric value by level. This value is applied to `weather` in `Background` class.
    - `changepH()` : Returns numeric value by pH. This value is applied to `acidity` in `Background` class.
- **`Constant.js`** : Constants used in code
- **`Main.js`** : Handles the overall control of the game
  - `setup()` : Initializes classes and periodically loads word into `words` list, using `setInterval()` method. The importing period gets faster as the level increases. Also, counts the number of imported words to distinguish whether the level ends.
  - `draw()` : Controls the level, status, and draws backgrounds. This function handles these effects.
    - Apply changed level with `levelUp()`
    - Draw & remove words which are correctly typed or reached to the ocean
    - Update pH value and move pH cursor
    - Enable splash motion
    - Drop the words with constant rate
    - Draw backgrounds and pH status bar
    - Draw GAME OVER layer when the game ends
  - `keyPressed()` : Submits the word and handles the interaction when Enter key is pressed.
    - Remove the correct word and update the score by `scoreUpdate()` in `Numeric` class
    - Enable effects when the word is blue by `wordEffect()`
    - Disable word hiding effect when it is present by `disableMask()`
    - Redraw words with updated status
  - `levelUp()` : Increments the level and disable all word effects when sufficient number of words are loaded.
  - `disableMask()` : Disables hiding words.
  - `wordEffect()` : Enables word effects.
    - The effect is randomly decided by `Math.random()` function.
    - Depending on the type of effect, the effect function `effectFunc` and reset function `restoreFunc` is set and applied with `setTimeout()` method to enable it just for a short period.

## Technical Issues
- **Import Rate of Words**: The changing of import rate of words by level is not applied well even though I controlled by changing the interval.
- **Unstable Play of Background Music**: Sometimes the background music does not play.
- **Short Duration of Splash Motion**: The splash motion disappears more faster than it was set by constant `SPLASH_DURATION`.

## References & Resources
- **References**
    - [p5.js reference](https://p5js.org/ko/reference/)
    - [npm package to import random English words](https://www.npmjs.com/package/random-words)
    - [Removing an item from array](https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript)
    - [Rounding float values](https://blog.edit.kr/entry/%EC%86%8C%EC%88%98%EC%A0%90-2%EC%9E%90%EB%A6%AC-%EC%9E%90%EB%A5%B4%EA%B8%B0-float-2-decimal)
    - [Generating random values with controlling probability](https://stackoverflow.com/questions/8877249/generate-random-integers-with-probabilities)
    - [Applying fonts on CSS](https://velog.io/@jehjong/CSS%EC%97%90-%ED%8F%B0%ED%8A%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%9B%B9%ED%8F%B0%ED%8A%B8-%ED%8F%B0%ED%8A%B8-%ED%8C%8C%EC%9D%BC)
- **Assets Resources**
    - [Freepik: Copyright free images](https://kr.freepik.com/)
    - [Uppbeat: Copyright free musics](https://uppbeat.io/)