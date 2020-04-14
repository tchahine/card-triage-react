import React from "react";
import { connect, ConnectedProps } from "react-redux";
import * as cardsActions from "../../store/cards/actions";
import { RootState } from "../../store/types";

const withReduxProps = connect((state: RootState) => ({
  search: state.cards.search,
}));

type ReduxProps = ConnectedProps<typeof withReduxProps>;
type Props = {} & ReduxProps;

class SearchBox extends React.PureComponent<Props> {
  onChange(target: HTMLInputElement) {
    const value = target.value;
    const { search, dispatch } = this.props;
    if (search !== value) {
      dispatch(cardsActions.search(value));
    }
  }

  render() {
    const { search } = this.props;
    return (
      <input
        type="search"
        className="form-control mr-sm-2 searchInput"
        placeholder="Search"
        name="searchInput"
        aria-label="Search"
        value={search ? search : ""}
        onChange={(event) => this.onChange(event.target)}
      />
    );
  }
}
export default withReduxProps(SearchBox);
