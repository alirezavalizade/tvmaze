import cx from 'classnames';

import Box from './Box';

const Image = ({ className, ...props }) => {
  return (
    <Box as="img" className={cx('max-w-full block', className)} {...props} />
  );
};

export default Image;
