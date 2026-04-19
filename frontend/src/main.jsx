import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SignupProvider } from './context/signupContext.jsx'
import { LoginProvider } from './context/loginContext.jsx'

createRoot(document.getElementById('root')).render(
 <SignupProvider>
  <LoginProvider>
   <App />
  </LoginProvider>
 </SignupProvider>

 
)
