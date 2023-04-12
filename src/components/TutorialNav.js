import React from 'react'
import { Menu, Divider } from 'semantic-ui-react'
import '../../resources/css/fader.css'


const navConent = <p style={{ fontFamily: "'Courier New', cursive", fontSize: '2.5em', color: 'black' }}>Tutorials<sub style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1em', color: 'black' }} > by (me)</sub></p>


const TutorialNav = () => [

  <Menu widths={4} text>
    <Menu.Item content={navConent} />
  </Menu>,
  <Divider />,
]

export default TutorialNav
