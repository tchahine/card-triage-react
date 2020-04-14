import React from "react";
import { Card } from "../../store/cards/types";
import moment from "moment";
import { connect, ConnectedProps } from "react-redux";
import * as cardsActions from "../../store/cards/actions";

export interface CardItemProps {
  card: Card;
}

const withReduxProps = connect(() => ({}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = CardItemProps & ReduxProps;

class CardItem extends React.PureComponent<Props> {
  onClick() {
    const { dispatch, card } = this.props;
    dispatch(cardsActions.changeStatus(card));
  }
  render() {
    const { card } = this.props;
    const date = moment(card.created_date).format("DD/MM/YYYY");
    const classToLine = "cardItem card " + card.status;
    return (
      <div className={classToLine} onClick={() => this.onClick()} /* ref={drag} style={{ ...style, opacity }} */>
        <div className="row">
          <div className="col-8">{card.patient_name}</div>
          <div className="col-4 text-right">{date}</div>
        </div>
        <div className="row">
          <div className="col-8">{card.arrhythmias.join(", ")}</div>
          <div className="col-4 text-right">{card.status}</div>
        </div>
      </div>
    );
  }
}
export default withReduxProps(CardItem);
