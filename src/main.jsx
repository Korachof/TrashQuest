// main app entry point (renders app)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PointsProvider } from './context/PointsContext';
import { AuthProvider } from './context/AuthContext';

// sets default browser/app margins and padding to 0 to avoid unneeded scrollbars
document.body.style.margin = '0';
document.body.style.padding = '0';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PointsProvider>
        <App />
      </PointsProvider>
    </AuthProvider>
  </React.StrictMode>
);
