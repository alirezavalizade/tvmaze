import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/theme/index.css';
import 'react-virtualized/styles.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import('@xstate/inspect').then(({ inspect }) => {
  inspect({
    // options
    // url: 'https://stately.ai/viz?inspect', // (default)
    iframe: false // open in new window
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
