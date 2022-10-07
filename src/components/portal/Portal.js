import { Component } from 'react';
import { createPortal } from 'react-dom';

export default class Portal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    if (props.className) {
      this.el.classList = props.className;
    }
  }

  componentDidMount() {
    const { rootID, className } = this.props;
    const root = document.getElementById(rootID);
    root.appendChild(this.el);

    if (className) {
      root.classList.add(...className.split(' '));
    }
  }

  componentWillUnmount() {
    const { rootID } = this.props;
    const root = document.getElementById(rootID);
    root.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return createPortal(children, this.el);
  }
}

Portal.defaultProps = {
  rootID: 'main'
};
