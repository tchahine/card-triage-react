import React from "react";
import { Card } from "../../store/cards/types";
import CardItem from "./cardItem";

export interface CardContainerProps {
  cards: Card[];
  title: string;
}

class CardContainer extends React.PureComponent<CardContainerProps> {
  render() {
    const { cards, title } = this.props;

    const cardsElement = cards
      ? cards.map((card: Card) => {
          return <CardItem card={card} key={card.id} />;
        })
      : [];

    return (
      <section className="col-5">
        <h2>{title}</h2>
        {cardsElement && cardsElement.length > 0 ? (
          <section className="card">{cardsElement}</section>
        ) : (
          <section className="card">
            <label>Pas de patient</label>
          </section>
        )}
      </section>
    );
  }
}
export default CardContainer;
