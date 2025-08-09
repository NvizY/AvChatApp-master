import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Authprovider } from './Context/Authprovider.jsx';
import { SocketProvider } from './Context/SocketContext.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Authprovider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Authprovider>
    </BrowserRouter>
  </React.StrictMode>
);
