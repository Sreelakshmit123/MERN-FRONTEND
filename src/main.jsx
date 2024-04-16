import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <BrowserRouter>   
 <GoogleOAuthProvider clientId="341249022055-bt9tnss2dupf9n58s6580kf48vk3g6n1.apps.googleusercontent.com">
  <App />
  </GoogleOAuthProvider>
 </BrowserRouter>
  </React.StrictMode>,
)
