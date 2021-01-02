// implementing bonus feature #4

let readline = require("readline-sync");

class Board {
  constructor() {
    this.squares  = {};
    for (let index = 1; index <= 9; index++) {
      this.squares[String(index)] = new Square();
    }
  }
  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }
  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }
  markSquareAt(key,marker) {
    this.squares[key].setMarker(marker);
  }
  unusedSquares(){
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }
  isFull() {
    return this.unusedSquares().length === 0;
  }
  countMarkersFor(player,keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }
  clear() {
    this.squares = {};
    for (let index = 1; index <= 9; index++) {
      this.squares[String(index)] = new Square();
    }
  }
}

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }
  toString() {
    return this.marker;
  }
  setMarker(marker) {
    this.marker = marker;
  }
  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
  getMarker() {
    return this.marker;
  }
}

class Player {
  constructor(marker){
    this.marker  =  marker;
  }
  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor(){
    super(Square.HUMAN_MARKER);
  }

}

class Computer extends Player{
  constructor(){
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.playAgain = 'n';
  }
  playMore() {
    this.board.display();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;
      this.board.displayWithClear();
    }
    this.board.displayWithClear();
    this.displayResults();
    this.displayPlayAgainMessage(); // changes the play again based on user choice
  }
  joinOr(arr, delim = ', ', word='or') {
    let result = '';
    if (arr.length === 2 ) {
      return String(arr[0]) + " " + word + " " + String(arr[1]);
    }
    if (arr.length < 2) {
      return String(arr[0]);
    }
    arr.forEach((option,index) => {
      if (index !== (arr.length - 1)) {
        result += String(option) + delim;
      }
      else result += word + " " + String(option);
    });
    return result;
  }
  play() {
    this.displayWelcomeMessage();
    do {
      this.board.clear();
      this.playMore();
    } while (this.playAgain === 'y');

    this.displayGoodbyeMessage();
  }
  displayPlayAgainMessage() {
    const prompt = `Do you want to play again: y or n?`;
    let choice = readline.question(prompt);
    while (true) {
      if (choice.toLowerCase() === 'y' || choice.toLowerCase() === 'n' ) {
        break;
      }
      console.log('Not a valid response. Try again.');
      choice = readline.question(prompt)
    }
    this.setPlayAgain(choice.toLowerCase());
  }

  setPlayAgain(option) {
    this.playAgain = option;
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You won! Congratulations!');
    } else if (this.isWinner(this.computer)) {
      console.log('I won! I won! Take that, human!');
    } else {
      console.log('A tie game. How boring.');
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${this.joinOr(this.board.unusedSquares())}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) {
        break;
      }
      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }
    this.board.markSquareAt(choice,this.human.getMarker());
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;
    do {
      if (this.findBestPlays('offensive').length > 0) {
        choice = this.findBestPlays('offensive')[0];
      } else if (this.findBestPlays('defensive') > 0) {
        choice = this.findBestPlays('defensive')[0];
      } else {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      }
    } while (!validChoices.includes(choice))
    this.board.markSquareAt(choice,this.computer.getMarker());
  }

  someoneWon() {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.isWinner(this.human) || this.isWinner(this.computer);
    });
  }
  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }
  
  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player,row) === 3;
    })
  }
  findPositions() {
    let strategy = {};
    strategy['defensive'] = this.findKeyRows(this.human);
    strategy['offensive'] = this.findKeyRows(this.computer);
    return strategy;
  }
  findKeyRows(player){
    return TTTGame.POSSIBLE_WINNING_ROWS
      .filter((row) => (this.board.countMarkersFor(player,row) === 2));
  }
  findBestPlays(strat){
    let threats = this.findPositions()[strat];
    let options = threats.map((row) => {
      return row.filter((pos) => this.board.squares[pos].isUnused()).toString();
    }).filter((option) => option !== "");
    if (threats.length === 0 || options.length === 0) {
      return [];
    };
    return options;
  }
}

let game = new TTTGame();

game.play();
