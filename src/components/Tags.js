import { Box, Text } from '@/components/ui';

const Tags = ({ data }) => {
  return (
    <Box className="flex items-center space-x-2">
      {data.map(item => {
        return (
          <Box key={item} className="">
            <Text className="text-sm bg-zinc-50 text-zinc-900 px-1 rounded-sm">
              {item}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default Tags;
