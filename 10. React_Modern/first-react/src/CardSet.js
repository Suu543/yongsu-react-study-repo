import { Component } from "react";
import Card from "./Card";

class CardSet extends Component {
  constructor() {
    super();
    this.state = {
      chosenCards: [],
    };
  }

  saveCourse = (index) => {
    if (
      this.state.chosenCards.filter(
        (e) => e.course === this.props.cards[index].course
      ).length > 0
    ) {
      const copyRemoveOfCards = this.state.chosenCards.filter(
        (e) => e.course !== this.props.cards[index].course
      );

      this.setState({
        chosenCards: copyRemoveOfCards,
      });
    } else {
      // this.state.chosenCards.push(this.props.cards[index]);
      const copyOfCards = [...this.state.chosenCards];
      copyOfCards.push(this.props.cards[index]);
      this.setState({
        chosenCards: copyOfCards,
      });
    }
  };

  render() {
    console.log(this.state.chosenCards);

    const savedCard = this.state.chosenCards.map((card, index) => {
      return <Card key={index} card={card} />;
    });

    const cardList = this.props.cards.map((card, i) => {
      return (
        <div>
          <Card key={i} card={card} idx={i} />
          <button
            onClick={() => {
              this.saveCourse(i);
            }}
          >
            Save
          </button>
        </div>
      );
    });

    return (
      <div>
        {cardList}
        {savedCard}
      </div>
    );
  }
}

export default CardSet;
