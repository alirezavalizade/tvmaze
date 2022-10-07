import { AppProvider } from '@/context/AppContext';

// the reason that I created this file is be able to extend providers
const Providers = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

export default Providers;
