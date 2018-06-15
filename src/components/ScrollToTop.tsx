import { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { animateScroll as scroll } from 'react-scroll';

class ScrollToTop extends Component<RouteComponentProps<any>> {
  public componentDidUpdate(prevProps: RouteComponentProps<any>) {
    if (this.props.location !== prevProps.location) {
      scroll.scrollToTop({ to: 0, containerId: 'main', duration: 0 });
    }
  }

  public render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
