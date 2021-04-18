import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/App';

import { UserProvider } from './providers/user';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

