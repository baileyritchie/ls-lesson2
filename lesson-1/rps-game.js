const readline = require('readline-sync');
// step 1 - write a textual definition of the problem

/*
RPS is a two player game where each player chooses one out of three rules. 
The winner is chosen by comparing their moves with these rules:
rock v scissors - rock wins
rock v paper - paper wins
paper v scissors - scissors wins

*/
// step 2 - extract the nouns and verbs from the description
/*
nouns - players, rules, moves
verbs - choose, compare
*/

//step 3 - organize and associate the verbs with the nouns

/*
Player
 - choose
Move
Rule

???
- compare
*/
function createPlayer() {
  return {
    move: null,
  };
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {
    move: null,
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };
  return Object.assign(playerObject,humanObject);
}
function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    move: null,

    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };
  return Object.assign(playerObject,computerObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  playAgain() {
    console.log("Would you like to play again? y/n");
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },
  displayWelcomeMessage(){
    console.log("Welcome to Rock, Paper, Sscissors!");
  },
  displayGoodbyeMessage() {
    console.log("Thanks for playing! Goodbye.");
  },
  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);
    if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
              (humanMove === 'paper' && computerMove === 'scissors') ||
              (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },
  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();

