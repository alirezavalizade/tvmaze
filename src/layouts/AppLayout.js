import { Box } from '@/components/ui';

import TopNav from '@/components/TopNav';

const Content = ({ children }) => {
  return (
    <Box
      className="flex flex-col flex-1 bg-neutral-900 rounded-md mt-4 overflow-auto"
      id="main"
    >
      {children}
    </Box>
  );
};

const AppLayout = ({ children }) => {
  return (
    <Box
      as="main"
      role="main"
      className="flex flex-col w-full bg-black-900 text-neutral-50 overflow-hidden min-h-full max-h-full p-4"
    >
      <TopNav />
      <Content>{children}</Content>
    </Box>
  );
};

export default AppLayout;
