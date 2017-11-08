import React from 'react'
import { hydrate, render } from 'react-dom'
import App from './App'
import { unregister } from './registerServiceWorker'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  hydrate(<App/>, rootElement)
} else {
  render(<App/>, rootElement)
}

unregister()
