// implementing bonus feature #1

let readline = require("readline-sync");

let obj = {
  /* object created to hold joinOr method */
}
//console.log(obj.joinOr([1, 2]));                   
//console.log(obj.joinOr([1, 2, 3]));               
//console.log(obj.joinOr([1, 2, 3], '; '));          
//console.log(obj.joinOr([1, 2, 3], ', ', 'and'));

/* PEDAC 
input: array of strings or numbers that represent key (ttt position) options, 
a string delimiter to separate options,the word to precede the last option
output: string that has all available options along with an ending word

examples:
obj.joinOr([1, 2])                   # => "1 or 2"
obj.joinOr([1, 2, 3])                # => "1, 2, or 3"
obj.joinOr([1, 2, 3], '; ')          # => "1; 2; or 3"
obj.joinOr([1, 2, 3], ', ', 'and')   # => "1, 2, and 3"

rules:
implicit: there must be a provided array of strings/numbers, if there is only one elm in the array 
return that element,if only one parameter is provided the delimiter defaults to a comma 
and the word defaults to "or", 
if there are only 2 elements then there doesn't need to be a delim
explicit: the result will return a string

data structure: 
working with array data type and then a string data type

algorithm: 
declare a variable called result and init to an empty string
if the array is only two elements
  return the first element of arr converted to a string along with a space and the word followed by the second element
iterate through the elements of the input array
  if the current index of the element is not the last possible index of the array
    add the number(converted as a string) followed by the delimiter parameteer with a space to the result string
  at the last index position of the array
    add the input word with a space followed by the last element of the array (as a string) to the result string
return the result string
*/

let Square = {
  UNUSED_SQUARE:   " ",
  HUMAN_MARKER:    "X",
  COMPUTER_MARKER: "O",

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },

  toString() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },

  getMarker() {
    return this.marker;
  },
};

let Board = {
  init(){
    this.squares  = {};
    for (let index = 1; index <= 9; index++) {
      this.squares[String(index)] = Object.create(Square).init();
    }
    return this;
  },
  display(){
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
  },

  displayWithClear(){
    console.clear();
    console.log("");
    console.log("");
    this.display();
  },

  markSquareAt(key,marker){
    this.squares[key].setMarker(marker);
  },

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  },

  isFull() {
    return this.unusedSquares().length === 0;
  },
  countMarkersFor(player,keys) {
    let markers = keys.filter((key) => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }
}

const PlayerPrototype = {
  initialize(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  },
};

let Human = Object.create(PlayerPrototype);

Human.init = function() {
  return this.initialize(Square.HUMAN_MARKER);
};

let Computer = Object.create(PlayerPrototype);

Computer.init = function() {
  return this.initialize(Square.COMPUTER_MARKER);
};

let TTTGame = {
  POSSIBLE_WINNING_ROWS: [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ],
  joinOr: function(arr,delim = ', ',word='or') {
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
  },
  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();
    return this;
  },
  play(){
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
  },

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log("");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  },
  
  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${this.joinOr(this.board.unusedSquares())}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  },

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },
}

let game = Object.create(TTTGame).init();
//console.log(game);
game.play();