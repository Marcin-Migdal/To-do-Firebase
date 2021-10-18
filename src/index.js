import ReactDOM from 'react-dom';
import { App } from 'components';
import React, { Suspense } from 'react';
import './index.css';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
