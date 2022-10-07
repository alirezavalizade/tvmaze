import { useApp } from '@/context/AppContext';

import { Box, Input } from '@/components/ui';
import { useCallback } from 'react';

const SearchForm = () => {
  const { showsService } = useApp();

  const afterChange = useCallback(value => {
    showsService.send('SET_FILTERS', { value: { query: value } });
  }, []);

  return (
    <Box as="form">
      <Input
        placeholder="Search for any shows here"
        afterChange={afterChange}
        className="min-w-[300px] md:min-w-[400px]"
      />
    </Box>
  );
};

export default SearchForm;
