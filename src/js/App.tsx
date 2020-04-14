import React from "react";
import "../css/App.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/types";
import { sortedTodoCardsSelector, sortedDoneCardsSelector } from "../store/cards/selector";
import * as appActions from "../store/root-action";
import SearchBox from "./components/searchBox";
import CardsContainer from "./components/cardsContainer";

const withReduxProps = connect((state: RootState) => {
  const search = state.cards.search;
  return {
    search,
    todo: sortedTodoCardsSelector(state, search),
    done: sortedDoneCardsSelector(state, search),
  };
});

type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

class App extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(appActions.start());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(appActions.unmount());
  }

  render() {
    const { todo, done } = this.props;
    return (
      <section className="app">
        <nav className="navbar navbar-light bg-light justify-content-between">
          <SearchBox />
        </nav>
        <section className="container-fluid">
          <section className="row">
            <CardsContainer title="TODO" cards={todo} />
            <section className="col-2"></section>
            <CardsContainer title="DONE" cards={done} />
          </section>
        </section>
      </section>
    );
  }
}

export default withReduxProps(App);
