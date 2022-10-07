import Box from './Box';

const Text = props => {
  return <Box {...props} />;
};

Text.defaultProps = {
  as: 'p'
};

export default Text;
