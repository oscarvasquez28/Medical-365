import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Context/UserContext.jsx';
import ToastConfig from './common/styles/ToastConfig.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ToastConfig />
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
