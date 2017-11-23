import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
//import registerServiceWorker from './registerServiceWorker'
//registerServiceWorker();

import './index.css'
import store from './store'
import App from './pages/App'

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
