import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import SkillChild from '../components/SkillChild'

export default class SkillsContent extends Component {
  constructor(props) {
    super(props)

    this.pyRef = React.createRef()
    this.jsRef = React.createRef()
    this.linuxRef = React.createRef()
    this.pupRef = React.createRef()
    this.phpRef = React.createRef()
    this.testRef = React.createRef()
    this.dotnetRef = React.createRef()
    this.wpRef = React.createRef()
    this.reactRef = React.createRef()
    this.javaRef = React.createRef()

    this.state = {
      srcsDict: [
        {
          name: 'Python',
          desc: 'Work related to scripting, report generation, and automation.',
          topics: ['Data Parsing', 'Flask', 'Excel Integration'],
          url: require('../../resources/skillset/python-logo.jpg'),
          ref: this.pyRef,
          height: 'auto',
          width: 'auto',
        },
        {
          name: 'JavaScript',
          desc: 'Work related to personal website and static-applications.',
          topics: ['ES6', 'ReactJS', 'REST'],
          url: require('../../resources/skillset/js-logo.png'),
          ref: this.jsRef,
          height: 'auto',
          width: 'auto',
        },
        {
          name: 'Linux',
          desc: 'Work related to infrastructure support, file-management, scripting.',
          topics: ['SysAdmin', 'BASH', 'Linux Utils'],
          url: require('../../resources/skillset/linux-logo.jpg'),
          ref: this.linuxRef,
          height: 'auto',
          width: 'auto',
        },
        {
          name: 'Java',
          desc: 'Work related to application support.',
          topics: ['JPA', 'REST', 'SpringBoot'],
          url: require('../../resources/skillset/java-logo.jpg'),
          ref: this.javaRef,
          height: 'auto',
          width: 'auto',
        },
        {
          name: 'ReactJS',
          desc: 'Work related to website building and front-end development.',
          topics: ['Redux', 'React Native', 'Smart/Dumb Components '],
          url: require('../../resources/skillset/react-logo.jpg'),
          ref: this.reactRef,
          height: 'auto',
          width: 'auto',
        },
        {
          name: 'Puppet',
          desc: 'Work related to infrastructure support and automation.',
          topics: ['Server Management', 'Modules', 'Hiera'],
          url: require('../../resources/skillset/puppet-logo.jpg'),
          ref: this.pupRef,
          height: 'auto',
          width: 'auto',
        },
        {
          name: 'Wordpress',
          desc: 'Work related to website building - full stack.',
          topics: ['PHP/MySQL', 'Child Themes'],
          url: require('../../resources/skillset/wordpress-logo.jpg'),
          ref: this.wpRef,
          height: 'auto',
          width: 'auto',
        },
        {
          name: 'PHP',
          desc: 'Work related to front-end development, and data injection.',
          topics: ['PHP/HTML', 'Plugins', 'Short-Code'],
          url: require('../../resources/skillset/php-logo.jpg'),
          ref: this.phpRef,
          height: 'auto',
          width: 'auto',
        },
      ],
    }
  }

  componentDidMount = () => {
    window.addEventListener('load', this.updateContainers)
    this.updateContainers()
    window.addEventListener('resize', this.updateContainers)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateContainers)
    window.removeEventListener('load', this.updateContainers)
  }

  updateContainers = () => {
    const state = this.state
    const prev = Array.from(this.state.srcsDict)

    for (let i = 0; i < state.srcsDict.length; i++) {
      const myRef = state.srcsDict[i].ref.current
      if (myRef && myRef.clientHeight !== 0) {
        prev[i].height = `${myRef.clientHeight}px`
        prev[i].width = `${myRef.clientWidth}px`
      } else if (myRef) {
        // prev[i].height = '250px'
      }
    }
    this.setState({ srcsDict: prev })
  }

  render() {
    const state = this.state
    return (
      <Grid padded centered >
        <Grid.Column width={15}><Divider /></Grid.Column>
        {state.srcsDict.map(
          (skillData, index) => {
            return (
              <Grid.Column key={index} widescreen={4} largeScreen={4} tablet={8} mobile={16} verticalAlign="middle">
                <SkillChild key={`child-${index}`} skillData={skillData} />
              </Grid.Column>
            )
          }
        )}
        <Grid.Column width={15}><Divider /></Grid.Column>
      </Grid >
    )
  }
}
