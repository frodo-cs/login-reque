import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import User from './components/User'
import Admin from './components/Admin'
import Navigation from './components/Navigation'
import Layout from './components/Layout'
import Error from './Error'
import GlobalState from './context/GlobalState'

class App extends React.Component {
  render () {
    return (
      <GlobalState>
        <BrowserRouter>
          <Navigation />
          <br />
          <Layout>
            <Switch>
              <Route path='/' component={Login} exact/>
              <Route path='/register' component={Register} exact/>
              <Route path='/user/:id' component={User} exact/>
              <Route path='/admin' component={Admin} exact/>
              <Route component={Error} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </GlobalState>
    )
  }
}

export default App