// 21 game with OOP
let readline = require("readline-sync");
var shuffle = require('shuffle-array');

class Card{
  static SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
  static RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
                  "Jack", "Queen", "King", "Ace"];
  constructor(rank,suit) {
    this.rank = rank;
    this.suit = suit;
  }
  getRank(){
    return this.rank;
  }
  getSuit(){
    return this.suit;
  }
  isAce(){
    return this.getRank() === 'Ace';
  }
  isKing() {
    return this.getRank() === "King";
  }
  isQueen() {
    return this.getRank() === "Queen";
  }

  isJack() {
    return this.getRank() === "Jack";
  }

  isFaceCard() {
    return this.isKing() || this.isQueen() || this.isJack();
  }
}
class Deck {
  constructor(){
    this.cards = []; // array of Card objects
  }
  generate() {
    let suits = Card.SUITS;
    let ranks = Card.RANKS;
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
      for (let rankIdx = 0; rankIdx < ranks.length; rankIdx ++) {
        this.cards.push(new Card(ranks[rankIdx],suits[suitIdx])); // pushes new card objects
      }
    }
    this.shuffle();
  }
  deal(count) {
    // remove certain number of cards from deck 
    return this.cards.splice(0,count);
  }
  clear() {
    this.cards = new Array();
  }
  shuffle() {
    this.cards = shuffle(this.cards); // fischer yates shuffle
  }
}

class Particpant{
  constructor(){
    this.score = 0;
    this.hand = [];
    this.isStaying = false;
  }
  displayCards(count = 0) {
    let results = '';
    let cards;;
    if (count) { // show a portion of  the hand (parameter passed in)
      cards = this.hand.slice(0,count+1);
      cards.forEach((card,idx) => {
        if (idx !== cards.length - 1) {
          results += card.getRank() + ' ' + card.getSuit() + ' ' + "&" + " ";
        } else {
          results += card.getRank() + ' ' + card.getSuit() + ' ';
        }
      })
      return results;
    } else { // show entire hand (no parameter passed in)
      cards = this.hand.slice(); 
      cards.forEach((card,idx) => {
        if (idx !== cards.length - 1) {
          results += card.getRank() + ' ' + card.getSuit() + ' ' + "&" + " ";
        } else {
          results += card.getRank() + ' ' + card.getSuit() + ' ';
        }
      })
      return results;
    }
  }
  hit(cards) {
    this.hand = this.hand.concat(cards);
    this.setScore();
  }
  stay() {
    this.setScore();
    this.isStaying = true;
  }
  isBusted() {
    return this.score > 21;
  }
  setScore() {
    let total = 0;
    let cards = this.hand;
    for (let cardIdx = 0; cardIdx < cards.length; cardIdx ++) {
      let card = cards[cardIdx];
      if (!card.isFaceCard() && !card.isAce()) {
        total += Number(card.getRank());
      }
      else {
        if (cards[cardIdx].isAce()) {
          if (total + 11 > 21){
            total += 1;
          } else total += 11;
        } else {
          total += 10;
        }
      }
    }
    this.score = total;
  }
  resetHand() {
    this.hand = [];
    this.isStaying = false;
    this.setScore(); // clears score as well
  }
}
class Player extends Particpant{
  constructor() {
    super()
    this.money = 5;
  }
  static RICH = 10;
  static BROKE = 0;
  static BET_AMT = 1
  loseBet() {
    this.money -= Player.BET_AMT;
  }
  winBet() {
    this.money += Player.BET_AMT;
  }
  displayBet() {
    console.log(`Player has $${this.money}.00 on hand and will bet $1.00 now!`);
  }
  displayMoney() {
    console.log(`Player has: $${this.money}.00 available to bet.`);
  }
}
class Dealer extends Particpant{
  constructor() {
    super()
  }
}

class TwentyOneGame {
  static TARGET_SCORE =  21;
  static DEALER_STAYS_SCORE = TwentyOneGame.TARGET_SCORE -  4;
  static START_OF_GAME  =  'start';
  static END_OF_GAME = 'end';

  constructor() {
    this.deck = new Deck(); // populates with an empty array
    this.player = new Player();
    this.dealer = new Dealer();
    this.playAgain = false;
  }
  start () {
    this.displayWelcomeMessage();
    this.player.displayBet();
    do {
      this.dealCards();
      this.showCards(TwentyOneGame.START_OF_GAME);
      
      this.playOneGame();

      this.showCards(TwentyOneGame.END_OF_GAME);
      this.displayResult();
      this.setBetResults();
      this.player.displayMoney();

      this.resetGame();
      this.askToPlayAgain();
    } while (this.playAgain && (this.player.money !== Player.BROKE || this.player.money !== Player.RICH));
    this.displayGoodbyeMessage();
  }
  playOneGame() {
    while (true) {
      this.playerTurn();
      if (this.gameOver()) {
        break;
      }
      this.dealerTurn();
      if (this.gameOver()){
        break;
      }
      this.showCards(TwentyOneGame.START_OF_GAME); 
    }
  }
  resetGame() {
    this.deck.clear(); // always gets a new deck for each game
    this.player.resetHand();
    this.dealer.resetHand();
    this.deck.generate(); //shuffles and repops cards
  } 

  dealCards() {
    this.deck.generate(); // populates and shuffles
    this.player.hit(this.deck.deal(2)); //deal 2 cards
    this.dealer.hit(this.deck.deal(2)); //deal 2 cards
  }

  showCards(time){
    if (time === TwentyOneGame.START_OF_GAME) {
      console.log(`The player's hand is: ${this.player.displayCards()}`);
      console.log(`One of the dealer's cards is: ${this.dealer.displayCards(1)}`); 
      console.log("");
    } else { // if not at start of game, reveal all cards
      console.log("Revealing final cards:")
      console.log(`The player's hand is: ${this.player.displayCards()}`);
      console.log(`The dealer's hand is: ${this.dealer.displayCards()}`);
      console.log("");
    }
  }
  playerTurn() {
    let choice;
    let validChoices = ['h','s'];
    while (!this.player.isStaying) {
      const prompt = 'Would you like to hit or stay? (select h or s) '; // can also type hit or stay
      choice = readline.question(prompt).toLowerCase()[0];
      if (validChoices.includes(choice)) {
        break;
      }
      console.log("Not a valid choice, please try again.")
    }
    if (choice === 'h') {
      this.player.hit(this.deck.deal(1));
    } else {
      this.player.stay();
    }
  }

  dealerTurn() {
    console.log("");
    if (this.dealer.score < 17) {
      this.dealer.hit(this.deck.deal(1));
    } else {
      this.dealer.stay();
    }
  }

  displayWelcomeMessage() {
    console.log('Welcome to 21! You will be playing against a dealer, and the goal of the game');
    console.log('is to have your cards sum to as close to 21 (or at 21) as possible in order to win.');
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log('Thank you for playing TwentyOne!');
  }
  askToPlayAgain() {
    const prompt = 'Would you like to play again? y or n ';
    let choice;
    while (true) {
      choice = readline.question(prompt).toLowerCase()[0];//can type 'yes' or 'no'
      if (choice === 'y' || choice === 'n') {
        break;
      }
      console.log('Invalid choice, please try again');
    }
    console.clear();
    choice === 'y' ? this.playAgain = true : this.playAgain = false;
  }

  displayResult() {
    if (this.getWinner() === this.player) {
      console.log( `Congratulations Player! You have won with ${this.player.score} points.`);
      console.log(`Dealer lost with ${this.dealer.score} points.`);
      console.log("$1 added to your balance!");
    } else if (this.getWinner() === this.dealer) {
      console.log(`Congratulations Dealer! You have won with ${this.dealer.score} points.`);
      console.log(`Player lost with ${this.player.score} points.`);
      console.log("$1 taken from the player's balance!");
    } else console.log('Tie Game. Nobody won!');
  }
  gameOver() {
    if (this.player.isBusted() || this.dealer.isBusted()) {
      return true;
    } else if (this.player.isStaying && this.dealer.isStaying) {
      return true;
    } else return false;
  }
  getWinner() {
    let playScore = this.player.score;
    let dealScore = this.dealer.score;
    let target = TwentyOneGame.TARGET_SCORE;
    if (this.player.isBusted() && !this.dealer.isBusted()) {
      return this.dealer;
    } else if (this.dealer.isBusted() && !this.player.isBusted()){
      return this.player;
    } else {
      if ((playScore === target) || ((target - playScore) < (target - dealScore))) {
        return this.player;
      } else if ((dealScore === target) || ((target - dealScore) < (target - playScore))) {
        return this.dealer;
      } else return null;
    }
  }
  setBetResults() {
    if (this.getWinner() === this.dealer) {
      this.player.loseBet();
    } else if (this.getWinner() === this.player) {
      this.player.winBet();
    }
  }
}

let game  = new TwentyOneGame();
game.start();

