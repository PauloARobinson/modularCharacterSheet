import React from 'react';
import Home from './pages/Home';
import { PrintStyles } from './theme/printStyles';

const App: React.FC = () => {
  return (
    <>
      <PrintStyles />
      <Home />
    </>
  );
};

export default App;
