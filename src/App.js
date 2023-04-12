
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePageNav from './components/HomePageNav'
import HomePage from './containers/HomePage'
import TutorialHomePage from './containers/TutorialHomePage'
import TutorialNav from './components/TutorialNav'

export default class App extends Component {
  constructor (props) {
    super(props)
    const aboutRef = React.createRef()
    this.state = {
      refs: {
        aboutRef,
      },
    }
  }

  render () {
    return [
      <Switch>
        <Route
          exact path="/"
          render={() => <HomePageNav refs={this.state.refs} />} />
        <Route
          exact path="/tutorials"
          render={() => <TutorialNav />} />
      </Switch>,
      <main>
        <Switch>
          <Route
            exact path="/"
            render={() => <HomePage refs={this.state.refs} />} />
          <Route
            exact path="/tutorials"
            render={() => <TutorialHomePage />} />
        </Switch>
      </main>,
    ]
  }
}

