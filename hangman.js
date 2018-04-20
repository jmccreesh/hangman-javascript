var inquirer = require("inquirer");

// Boolean value for end game logic
var correct = false;
var incorrect = false;

// Arrays to store blanks and entered letters
var emptyArray = [];
var guessedArray = [];

// Generate a random hero from array and split its letter to a separated array
var heroesArray = ['daredevil', 'blade', 'antman', 'blackpanther', 'captainmarval', 'spiderman', 'thor'];
var randomHeroes = function(){
    var index = Math.floor(Math.random() * heroesArray.length);
    this.hero = heroesArray[index];
    this.nameLength = heroesArray[index].length;
}
var gameHero = new randomHeroes();
var gameArray = gameHero.hero.split("");

// Game message
console.log("\nWelcome to Dota 2 Heroes Console Hangman!" + "\n");

// Generate the number of blank spaces
for (var i = 0; i < gameHero.nameLength; i++) {
  emptyArray.push("_");
}

console.log("\nThis hero name has " + gameHero.nameLength +
" letters." + "\n" + emptyArray.join(" ") + "\n");

// Game logic
var tries = 0;
var playGame = function () {
  if (tries < gameHero.nameLength + 5) {

    inquirer.prompt([
      {
        type: "input",
        name: "letter",
        message: "Enter a letter to guess: "
      }
    ]).then(function (user) {
      console.log(" ");
      console.log("\n--------------------------------------------------\n");
      console.log("\nYou have used " + (tries + 1) + " of your " + (gameHero.nameLength + 5) +
      " tries for this hero.")

      if (gameArray.indexOf(user.letter) === -1) {
        guessedArray.push(user.letter);
      };

      for (var i = 0; i < guessedArray.length; i++) {
        if ((guessedArray.length > 1) && (incorrect === false)) {
          if (user.letter === guessedArray[i]) {
            incorrect = true;
          }
        }
      }
      incorrect = false;

      for (var i = 0; i < emptyArray.length; i++) {

        if ((emptyArray.length > 1) && (correct === false)) {
          if (user.letter === emptyArray[i]) {
            correct = true;
          }
        }
      }
      correct = false;

      for (var i = 0; i < gameArray.length; i++) {
        if (user.letter === gameArray[i]) {
          emptyArray[i] = user.letter
        }
      };
      tries++;

      console.log("Incorrect letters guessed: " + guessedArray);

      if (emptyArray.join() === gameArray.join()) {
        console.log("\n" + "\n~~~~~You win! The hero was " + gameHero.hero + "!~~~~~\n");
        return;
      }

      console.log(emptyArray.join(" "));
      console.log("\n--------------------------------------------------\n");
      playGame();
    });

  } else {
    console.log("GAME OVER!" + "\nThe hero was " + gameHero.hero + "!\n")
  }
};

// This starts the game
playGame();
