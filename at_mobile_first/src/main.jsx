import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação atualizada para React 18
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usando createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
