import { ReactComponent as LoadingIcon } from '@/theme/vectors/loading1.svg';

import { Box, Icon } from '@/components/ui';

const LoadingState = ({ className }) => {
  return (
    <Box className={className}>
      <Icon>
        <LoadingIcon className="w-8 h-8 md:w-12 md:h-12" />
      </Icon>
    </Box>
  );
};

export default LoadingState;
