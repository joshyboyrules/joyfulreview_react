import React from 'react'
// import { hydrate, render } from 'react-dom'
import App from './App'
import { unregister } from './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import { render } from 'react-snapshot'

const rootElement = document.getElementById('root')

render(<App/>, rootElement)

// if (rootElement.hasChildNodes()) {
//   hydrate(<App/>, rootElement)
// } else {
//   render(<App/>, rootElement)
// }

unregister()
