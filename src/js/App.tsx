import React from "react";
import "../css/App.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/types";
import { sortedTodoCardsSelector, sortedDoneCardsSelector } from "../store/cards/selector";
import * as appActions from "../store/root-action";
import * as cardsActions from "../store/cards/actions";
import CardLine from "./components/cardLine";
import { Card } from "../store/cards/types";

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

  onChange(target: HTMLInputElement) {
    const name = target.name;
    const value = target.value;

    const { search, dispatch } = this.props;
    if (name === "searchInput") {
      if (search !== value) {
        dispatch(cardsActions.search(value));
      }
    }
  }

  render() {
    const { search, todo, done } = this.props;
    console.log(search);
    console.log(todo);
    console.log(done);
    const todoList = todo
      ? todo.map((card: Card) => {
          return <CardLine card={card} key={card.id} />;
        })
      : [];
    const doneList = done
      ? done.map((card: Card) => {
          return <CardLine card={card} key={card.id} />;
        })
      : [];
    return (
      <section className="app">
        <nav className="navbar navbar-light bg-light justify-content-between">
          <input
            type="search"
            className="form-control mr-sm-2 searchInput"
            placeholder="Search"
            name="searchInput"
            aria-label="Search"
            value={search ? search : ""}
            onChange={(event) => this.onChange(event.target)}
          />
        </nav>
        <section className="container-fluid">
          <section className="row">
            <section className="col-5">
              <h2>TODO</h2>
              <section className="card">{todoList}</section>
            </section>
            <section className="col-2"></section>
            <section className="col-5">
              <h2>DONE</h2>
              <section className="card">{doneList}</section>
            </section>
          </section>
        </section>
      </section>
    );
  }
}

export default withReduxProps(App);
