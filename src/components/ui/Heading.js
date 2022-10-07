import cx from 'classnames';

import { forwardRef } from 'react';

import Box from './Box';

const weights = {
  h1: 'font-semibold',
  h2: 'font-semibold',
  h3: 'font-semibold',
  h4: 'font-semibold',
  h5: 'font-semibold'
};

const Heading = forwardRef(({ as, className, ...props }, ref) => {
  return (
    <Box
      className={cx(className, weights[as], 'leading-normal')}
      as={as}
      {...props}
      ref={ref}
    />
  );
});

Heading.defaultProps = {
  as: 'h1'
};

export default Heading;
