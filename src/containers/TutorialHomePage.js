import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'
import LinuxCommonCommands from '../components/tutorials/LinuxCommonCommands'
import ReactPassingProps from '../components/tutorials/ReactPassingProps';
import TutorialGreeting from '../components/tutorials/TutorialGreeting';

class TutorialHomePage extends Component {
  constructor (props) {
    super(props)

    this.state = {

      content: <TutorialGreeting />,

      skills: {

        Linux: ['Common Commands'],
        // Java: ['Spring'],
        // React: ['Passing Props', 'REST Calls'],
      },
    }

    this.handleSelection = this.handleSelection.bind(this)
  }

  handleSelection = skill => {

    switch (skill) {
      case 'Linux-Common Commands':
        this.setState({ content: <LinuxCommonCommands /> })
        break

      case 'React-Passing Props':
        this.setState({ content: <ReactPassingProps /> })
        break

      default:
        this.setState({ content: <TutorialGreeting /> })
        break
    }
  }

  render () {
    const state = this.state

    return (
      <Grid  stackable >

        <Grid.Column container width={4} >
          <Menu fluid vertical>
            <Menu.Item>
              <Menu.Header content="What is this?" onClick={ () => this.setState({ content: <TutorialGreeting /> })}/>
              <Menu.Menu>
                <Link to="/" >
                  <Menu.Item>who am I?</Menu.Item>
                </Link>
              </Menu.Menu>
            </Menu.Item>

            {Object.keys(state.skills).map((skill, index) => (

              <Menu.Item>
                <Menu.Header content={skill} />

                <Menu.Menu>
                  {state.skills[skill].map(
                    (skillTopic, topicIndex) =>
                      <Menu.Item name={skillTopic} onClick={() => this.handleSelection(`${skill}-${skillTopic}`)} />
                  )}
                </Menu.Menu>

              </Menu.Item>
            ))}

          </Menu>

        </Grid.Column>

        <Grid.Column centered width={12} >
            {this.state.content}
        </Grid.Column>

      </Grid>
    )
  }
}

export default TutorialHomePage
