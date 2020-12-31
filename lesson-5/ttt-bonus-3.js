/*computer ai defense feature */

let readline = require("readline-sync");

class Board {
  constructor() {
    // need a way to model the 3 * 3 grid
    // what data structures to use? An array, object, something else ?
    // what would the data structure store? strings, numbers, square object?
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
    return this.marker  === Square.UNUSED_SQUARE;
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
  }
  play() {
    this.displayWelcomeMessage();
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
    this.displayGoodbyeMessage();
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

  humanMoves() { // was firstPlayerMoves
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${validChoices.join(", ")}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) {
        break;
      }
      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }
    this.board.markSquareAt(choice,this.human.getMarker());
  }

  computerMoves() { // was secondPlayerMoves
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      let immediateThreats = this.findThreats();
      let bestPositions = this.findIdealComputerPosition(immediateThreats);
      choice ? choice = bestPositions[0] : choice = Math.floor((9 * Math.random()) + 1).toString();
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
    });
  }
  /* searchThreat */
  /*
  input - nothing
  output - an array of arrays that hold strings, each subarray represents 
  row where the human is an immediate threat

  rules:
    implicit- use the possible_winning_rows array that contains all the winning positions, 
    use the countMarkersFor to determine how many markers each potentially winning has,
    return an array of strings, can return an empty array
    explicit- will always return an array
  data structure: iterating over array data type (possible_winning_rows),

  algorithm:
    declare a variable called threats and init as an empty array
    iterate through the possible_winning_rows array
      determine if the number of human player counts is 2 at any given array
      (find the markers count using countMarkersFor with human and that row)
        if there are 2 counts
          add that row to threats array
        otherwise
          do nothing
    return the "threats" array
  */
  findThreats() {
    let threats = [];
    TTTGame.POSSIBLE_WINNING_ROWS.forEach((row) => {
      if (this.board.countMarkersFor(this.human,row) === 2) {
        threats.push(row);
      }
    });
    return threats;
  }
  findIdealComputerPosition(immediateThreats){
    let threats = {};
    if (immediateThreats.length === 0) return [];
    immediateThreats.forEach((row) => {
      row.forEach((pos) => {
        if (this.board.squares[pos].isUnused() && !(threats.hasOwnProperty(pos))) {
          threats[pos] = 1;
        } else if (this.board.squares[pos].isUnused()) {
          threats[pos] += 1;
        } 
      });
    });
    let maxThreat = Math.max(...Object.values(threats));
    return Object.keys(threats).filter((pos) => threats[pos] === maxThreat);
  }
  /*
  input - double nested array representing the threats
  output - return an array of strings (numbers that are strings) that represent
  the most optimal position to put the computers defense at

  rules:
    implicit: an empty array can be passed in (due to there being no threats), return an array
    with all positions if the empty array is passed, 
    explicit- always returns an array from 0 element length 9 element length

  data structure - use an object to store the counts of threat positions, i.e. if they occur more
  than once they are more serious threat positions, iterating over a double nested array

  algorithm:
    declare a variable called threats and init as an empty object ({'1':2,'6':1})
    declare a variable called result and init to an empty array
    if the input array is empty
      return an empty array
    iterate through the input array
      iterate through the sub array (of positions)
        if the marker value within the sub array is empty " " (use getMarker on square to determine) 
        and the position doesn't exist as a key in threats object
          create a property on threats with a key of the position (string) and a value of 1
        otherwise, 
          increment the property on threats associated with the position as a key by 1
    
          declare a variable called maxThreat and init to the maximum value found in the threats values
    iterate through the keys of the threats object
      if the value of that specific key is equal to the maxThreat value
        add that key string converted to a number to the results array
      otherwise,
        do nothing
    return the result array
  */
}

let game = new TTTGame();

game.play();
