import { Box, Text } from '@/components/ui';

const Rate = ({ children }) => {
  return (
    <Box className="flex">
      <Text className="text-sm bg-amber-500 px-1 rounded-sm">{children}</Text>
    </Box>
  );
};

export default Rate;
