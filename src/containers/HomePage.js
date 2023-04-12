import React, { Component } from 'react'
import { Container, Divider } from 'semantic-ui-react'
import Fader from './Fader'
import AboutMe from './AboutMe'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      screenWidth: window.innerWidth,
    }
  }

  updateDimensions = () => {
    this.setState({
      screenWidth: window.innerWidth,
    })
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions)
  }
  render () {
    const state = this.state
    const props = this.props
    return (
      <Container fluid >
        <Fader ref={section => { props.refs.aboutRef = section }} screenWidth={state.screenWidth} />
        {/* <Divider section /> */}
        <AboutMe />
        {/* <Divider section /> */}
      </Container >
    )
  }
}
