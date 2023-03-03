import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Module from './Module'
import Utilisateur from './Utilisateur'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Utilisateur prenom="finn" nom="kitty" courriel="courriel" />
  </React.StrictMode>,
)

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Module />);