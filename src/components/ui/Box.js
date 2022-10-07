import React from 'react';

const Box = React.forwardRef(({ children, as, ...rest }, ref) => {
  if (typeof as === 'object') {
    return React.cloneElement(as, { ...rest, ref }, children);
  }

  if (as) {
    return React.createElement(as, { ...rest, ref }, children);
  }

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

export default Box;
