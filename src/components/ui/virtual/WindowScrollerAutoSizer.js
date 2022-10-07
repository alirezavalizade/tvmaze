import React, { createRef } from 'react';

import { WindowScroller, AutoSizer } from 'react-virtualized';

export default class WindowScrollerAutoSizer extends React.Component {
  constructor(props) {
    super(props);

    this.windowScroller = createRef(null);
  }

  render() {
    const { element, children } = this.props;

    return (
      <WindowScroller
        ref={this.windowScroller}
        scrollElement={element || window}
      >
        {({ height, registerChild, onChildScroll, scrollTop, isScrolling }) => (
          <AutoSizer disableHeight>
            {({ width }) => {
              const props = {
                windowScroller: this.windowScroller,
                registerChild,
                height,
                isScrolling,
                onChildScroll,
                scrollTop,
                width
              };

              return (
                <div ref={registerChild} role="grid">
                  {React.cloneElement(children, props)}
                </div>
              );
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    );
  }
}
