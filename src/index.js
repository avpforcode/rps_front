import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import redusers from './reducers'
import App from "./App"
import Provider from "react-redux/es/components/Provider"


const store = createStore(
  redusers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)