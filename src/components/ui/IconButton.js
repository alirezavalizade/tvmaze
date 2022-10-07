import cx from 'classnames';

import React from 'react';

import Button from './Button';

const CLASSNAMES_BY_SIZE = {
  xxs: 'w-4',
  xs: 'w-6',
  sm: 'w-40',
  md: 'w-10',
  lg: 'w-12'
};

const IconButton = ({ children, icon, className, ...props }) => {
  return (
    <Button
      className={cx('pl-0 pr-0', CLASSNAMES_BY_SIZE[props.size], className)}
      {...props}
    >
      {React.cloneElement(children || icon, {
        className: cx(
          'flex-shrink-0 align-middle fill-current',
          children?.props?.className
        )
      })}
    </Button>
  );
};

IconButton.defaultProps = {
  isRound: true
};

export default IconButton;
