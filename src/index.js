import { BrowserRouter as Router } from 'react-router-dom';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { App } from 'App/App';
import './index.css';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <Router>
        <App />
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
