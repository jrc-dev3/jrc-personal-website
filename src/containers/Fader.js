import React, { Component } from 'react'
import { Grid, Transition, Image, Segment } from 'semantic-ui-react'
import myData from '../../resources/data'
import '../../resources/css/fader.css'

export default class Fader extends Component {
  constructor(props) {
    super(props)

    this.secs = 500
    this.state = {
      visible: [true, false],
    }
  }

  componentDidMount = () => {
    this.timer = setInterval(this.randomizeAboutMe, 1000)
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
    window.removeEventListener('resize', this.updateDimensions)
  }

  randomizeAboutMe = () => {
    this.setState({ visible: this.shuffle(this.state.visible) })
  }

  shuffle = array => {
    // let currentIndex = array.length, temporaryValue, randomIndex
    let currentIndex = array.length
    let temporaryValue
    let randomIndex
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }

  rowGenerator = columnsPerRow => {
    const rowContent = []
    const state = this.state

    for (let i = 0; i < columnsPerRow; i++) {
      const visible = state.visible[Math.floor(Math.random() * 2)]
      const message = myData.interests[Math.floor(Math.random() * (myData.interests.length))]
      const fontWeight = myData.fontWeights[Math.floor(Math.random() * myData.fontWeights.length)]
      const fontFamily = myData.fonts[Math.floor(Math.random() * (myData.fonts.length))]

      rowContent.push(
        <Grid.Column key={i} id="tester" >
          <Transition duration={this.seconds} visible={visible} >
            <p style={{ fontWeight, fontFamily }}>{message}</p>
          </Transition>
        </Grid.Column>
      )
    }
    return (
      <Grid.Row id="trait"> {rowContent}</Grid.Row>
    )
  }

  colsInRowGenerator = (columnsPerRow, myKey) => {
    const state = this.state
    const columns = []
    for (let i = 0; i < columnsPerRow; i++) {
      const visible = state.visible[Math.floor(Math.random() * 2)]
      const message = myData.interests[Math.floor(Math.random() * (myData.interests.length))]
      const fontWeight = myData.fontWeights[Math.floor(Math.random() * myData.fontWeights.length)]
      const fontFamily = myData.fonts[Math.floor(Math.random() * (myData.fonts.length))]

      columns.push(
        <Grid.Column key={i}>
          <Transition duration={this.seconds} visible={visible} >
            <p style={{ fontWeight, fontFamily }}>{message}</p>
          </Transition>
        </Grid.Column>
      )
    }
    return (
      <Grid.Row key={myKey} id="trait" columns={2}>
        {columns}
      </Grid.Row>
    )
  }

  render() {
    this.makeRows = rows => {
      const myRows = []
      for (let i = 0; i < rows; i++) {
        myRows.push(this.colsInRowGenerator(2, i))
      }
      return myRows
    }

    const picSize = this.props.screenWidth < 1500 ? 'medium' : 'large'


    return (
      <Segment className="faderContainer" basic>
        <Grid textAlign="center" columns="equal" stretched >

          {this.rowGenerator(3)}
        </Grid>

        <Grid textAlign="center" columns="equal" stretched stackable >
          <Grid columns={2} >
            {this.makeRows(4)}
          </Grid>

          <Grid.Column>
            {/* <Image src={require('../../resources/headshot.jpg')} size={picSize} circular centered /> */}
            <video id="introVid" autoPlay muted loop playsInline>
              <source src={require('../../resources/dancing.mp4')}  type="video/mp4"/>
            </video>
          </Grid.Column>

              <Grid columns={2} >
                {this.makeRows(4)}
              </Grid>
        </Grid>

            <Grid textAlign="center" columns="equal" stretched>
              {this.rowGenerator(3)}
              {this.rowGenerator(2)}
            </Grid>
      </Segment>
          )
        }
      }
