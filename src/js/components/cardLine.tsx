import React from "react";
// import { useDrag, DragSourceMonitor } from "react-dnd";
import { Card } from "../../store/cards/types";
import { RootState } from "../../store/types";
import moment from "moment";
import { connect, ConnectedProps } from "react-redux";
import * as cardsActions from "../../store/cards/actions";

// const style: React.CSSProperties = {
//   border: "1px dashed gray",
//   backgroundColor: "white",
//   padding: "0.5rem 1rem",
//   marginRight: "1.5rem",
//   marginBottom: "1.5rem",
//   float: "left",
// };

export interface CardLineProps {
  card: Card;
}

const withReduxProps = connect(() => ({}));
type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {
  card: Card;
} & ReduxProps;

class CardLine extends React.PureComponent<Props> {
  onClick() {
    const { dispatch, card } = this.props;
    dispatch(cardsActions.changeStatus(card));
  }
  render() {
    const { card } = this.props;
    const date = moment(card.created_date).format("DD/MM/YYYY");
    const classToLine = "cardLine card " + card.status;
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
export default withReduxProps(CardLine);
