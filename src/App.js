import Providers from '@/context/Providers';
import AppLayout from '@/layouts/AppLayout';

import Shows from '@/components/shows/Shows';

const App = () => {
  return (
    <Providers>
      <AppLayout>
        <Shows />
      </AppLayout>
    </Providers>
  );
};

export default App;
