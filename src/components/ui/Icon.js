import { cloneElement } from 'react';

import cx from 'classnames';

const Icon = ({ children }) => {
  return cloneElement(children, {
    className: cx(
      'flex-shrink-0 align-middle fill-current',
      children?.props?.className
    )
  });
};

export default Icon;
