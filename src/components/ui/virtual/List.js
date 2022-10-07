import isEqual from 'react-fast-compare';

import React, {
  useMemo,
  Component,
  createRef,
  forwardRef,
  useEffect
} from 'react';

import {
  List as VList,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';

import WindowScrollerAutoSizer from './WindowScrollerAutoSizer';

const MainList = forwardRef((props, ref) => {
  const {
    height,
    isScrolling,
    onChildScroll,
    overscanRowCount,
    data,
    rowRenderer,
    scrollTop,
    width,
    cache,
    onScrollTopChanged
  } = props;

  useEffect(() => {
    if (onScrollTopChanged) {
      onScrollTopChanged({ scrollTop, height, isScrolling });
    }
  }, [scrollTop, height, isScrolling]);

  return (
    <VList
      ref={ref}
      autoHeight
      height={height || 0}
      isScrolling={isScrolling}
      onScroll={onChildScroll}
      overscanRowCount={overscanRowCount}
      rowCount={data.length}
      rowRenderer={rowRenderer}
      scrollTop={scrollTop}
      width={width}
      rowHeight={cache.rowHeight}
    />
  );
});

class VirtualList extends Component {
  constructor(props) {
    super(props);

    this.rowRenderer = this.rowRenderer.bind(this);

    this.list = createRef(null);
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 387
    });
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.cache?.clearAll) {
        this.cache.clearAll();
      }
      if (this.list?.current?.forceUpdate) {
        this.list.current.forceUpdate();
      }
    }, 0);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  componentDidUpdate({
    data: prevData,
    forceUpdateId: prevForceUpdateId,
    width: prevWidth
  }) {
    const { data, forceUpdateId, windowScroller, width } = this.props;

    const widthChanged = prevWidth !== width;

    if (forceUpdateId !== prevForceUpdateId || widthChanged) {
      setTimeout(() => {
        if (this.cache?.clearAll) {
          this.cache.clearAll();
        }

        if (this.list?.current?.forceUpdate) {
          this.list.current.forceUpdate();
        }
        if (windowScroller.current?.updatePosition) {
          windowScroller.current.updatePosition();
        }
      }, 0);
      return;
    }

    if (!isEqual(data, prevData)) {
      this.cache.clearAll();
      this.list.current.forceUpdate();
      windowScroller.current.updatePosition();
    }
  }

  rowRenderer({ key, index, parent, style, isScrolling }) {
    const { data, renderRow, keyName, itemProps, listId } = this.props;

    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure, registerChild }) => {
          return (
            <div
              ref={registerChild}
              role="row"
              aria-rowindex={index}
              style={style}
              key={keyName ? data[keyName] : key}
            >
              {renderRow({
                item: data[index],
                index,
                items: data,
                key,
                style,
                parent,
                isScrolling,
                measure,
                itemProps,
                listId
              })}
            </div>
          );
        }}
      </CellMeasurer>
    );
  }

  render() {
    const { data, overscanRowCount, onScrollTopChanged, ...rest } = this.props;

    const props = {
      overscanRowCount,
      data,
      rowRenderer: this.rowRenderer,
      cache: this.cache,
      onScrollTopChanged,

      // WindowScrollerAutoSizer is passing some props magically to this component
      ...rest
    };

    return <MainList ref={this.list} {...props} />;
  }
}

const List = props => {
  const { elementId } = props;

  const element = useMemo(() => {
    if (typeof window === 'object') {
      return document.getElementById(elementId);
    }

    return null;
  }, [elementId]);

  if (!element) {
    return null;
  }

  return (
    <WindowScrollerAutoSizer element={element}>
      <VirtualList {...props} />
    </WindowScrollerAutoSizer>
  );
};

List.defaultProps = {
  data: [],
  overscanRowCount: 10,
  elementId: 'main'
};

export default List;
