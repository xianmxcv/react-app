import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import App from '@/App'
import React from 'react'
import ReactDOM from 'react-dom'
import configStore from './configStore'
// import initMock from '@/service/mock.config'

// initMock()

const store = configStore()

ReactDOM.render(<App store={store} />, document.getElementById('root'))
