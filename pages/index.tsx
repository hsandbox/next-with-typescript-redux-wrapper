import React from "react";
import { bindActionCreators } from "redux";
import { startClock, addCount, serverRenderClock } from "../actions";
import { connect } from "react-redux";
import Page from "../components/Page";

interface Props {
  startClock: Function;
}

class Counter extends React.Component<Props> {
  static getInitialProps({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer));
    store.dispatch(addCount());

    return { isServer };
  }

  private timer;

  public componentDidMount() {
    this.timer = this.props.startClock();
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public render() {
    return <Page title="Index Page" linkTo="/other" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Counter);
