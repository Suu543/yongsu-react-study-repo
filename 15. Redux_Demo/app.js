const prompt = require("prompt-sync")({ sigint: true });

const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
const ranks = [
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Jack",
  "Queen",
  "King",
  "Ace",
];

const values = {
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 10,
  Queen: 10,
  King: 10,
  Ace: 11,
};

let playing = true;

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  summary() {
    return this.rank + " of " + this.suit;
  }
}

class Deck {
  constructor() {
    this.deck = [];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.deck.push(new Card(suits[i], ranks[i]));
      }
    }
  }

  summary() {
    let deck_comp = "";
    for (let i = 0; i < this.deck.length; i++) {
      deck_comp += "\n " + this.deck[i].summary();
    }

    return "The deck has: \n" + deck_comp;
  }

  shuffle() {
    for (let index = this.deck.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(Math.random() * (index + 1));

      const temp = this.deck[index];
      this.deck[index] = this.deck[randomPosition];
      this.deck[randomPosition] = temp;
    }
  }

  deal() {
    let single_card = this.deck.pop();
    return single_card;
  }
}

class Hand {
  constructor() {
    this.cards = [];
    this.value = 0;
    this.aces = 0;
  }

  add_card(card) {
    this.cards.push(card);
    this.value += values[card.rank];
  }

  adjust_for_ace() {
    while (this.value > 21 && this.aces) {
      this.value -= 10;
      this.aces -= 1;
    }
  }
}

class Chips {
  constructor() {
    this.total = 100;
    this.bet = 0;
  }

  win_bet() {
    this.total += this.bet;
  }

  lose_bet() {
    this.total -= this.bet;
  }
}

function take_bet(chips) {
  while (true) {
    chips.bet = Number(prompt("How many chips would you like to bet? "));

    if (chips.bet > chips.total) {
      console.log("Sorry, your bet can't exceed... ", chips.total);
    } else {
      break;
    }
  }
}

function hit(deck, hand) {
  hand.add_card(deck.deal());
  hand.adjust_for_ace();
}

function hit_or_stand(deck, hand) {
  while (true) {
    let x = prompt("Would you like to Hit or Stand? Enter 'h' or 's' ");

    if (x[0].toLowerCase() === "h") {
      hit(deck, hand);
    } else if (x[0].toLowerCase() === "s") {
      console.log("Player stands. Dealer is playing!!!");
      playing = false;
    } else {
      console.log("Sorry, Please Try Again!!!");
      continue;
    }

    break;
  }
}

function show_some(player, dealer) {
  console.log("\nDealer's Hand: ");
  console.log(" <Card Hidden> ");
  console.log("", dealer.cards[1]);

  console.log("----------------------");

  console.log("\nPlayer's Hand");
  player.cards.forEach((card) => {
    console.log("", card);
  });
}

function show_all(player, dealer) {
  console.log("\nDealer's Hand = ", dealer.value);
  dealer.cards.forEach((card) => {
    console.log("", card);
  });
  console.log("----------------------");

  console.log("\nPlayer's Hand = ", player.value);
  player.cards.forEach((card) => {
    console.log("", card);
  });
}

function player_busts(chips) {
  console.log("Player Busts");
  chips.lose_bet();
}

function player_wins(chips) {
  console.log("Player Wins!");
  chips.win_bet();
}

function dealer_busts(chips) {
  console.log("Dealer Busts");
  chips.win_bet();
}

function dealer_wins(chips) {
  console.log("Player Wins!");
  chips.lose_bet();
}

function push() {
  console.log("Dealer and Player tie! It's a push!");
}

function run() {
  while (true) {
    console.log("환영한다...");

    // 1. create Deck
    // 2. shuffle the deck
    // 3. deal two cards to each player
    // 4. Set up the Player's Chips
    // 5. Prompt the player for their bet
    // 6. Show Cards (But keep one dealer card hidden)

    let deck = new Deck();
    deck.shuffle();

    let player_hand = new Hand();
    let dealer_hand = new Hand();

    player_hand.add_card(deck.deal());
    player_hand.add_card(deck.deal());

    dealer_hand.add_card(deck.deal());
    dealer_hand.add_card(deck.deal());

    let player_chips = new Chips();

    take_bet(player_chips);
    show_some(player_hand, dealer_hand);

    while (playing) {
      // Prompt for Player to Hit or Stand
      hit_or_stand(deck, player_hand);
      show_some(player_hand, dealer_hand);

      if (player_hand.value > 21) {
        player_busts(player_chips);
        break;
      }
    }

    if (player_hand.value <= 21) {
      while (dealer_hand.value < 17) {
        hit(deck, dealer_hand);
      }

      show_all(player_hand, dealer_hand);

      if (dealer_hand.value > 21) {
        dealer_busts(player_chips);
      } else if (dealer_hand.value > player_hand.value) {
        dealer_wins(player_chips);
      } else if (dealer_hand.value < player_hand.value) {
        player_wins(player_chips);
      } else {
        push(player_hand, dealer_hand);
      }

      console.log("\nPlayer's winnings stand at: ", player_chips.total);

      new_game = prompt(
        "Would you like to play another hand? Enter 'y' or 'n' "
      );

      if (new_game[0].toLowerCase() == "y") {
        playing = true;
        continue;
      } else {
        console.log("Thanks for playing!");
        break;
      }
    }
  }
}

run();
