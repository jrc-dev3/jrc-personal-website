import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import ErrorBoundary from './containers/ErrorBoundary'

const Index = () => (
  <ErrorBoundary>
    <Router>
      <App />
    </Router>
  </ErrorBoundary>
)

export default App

ReactDOM.render(<Index />, document.getElementById('root'))
