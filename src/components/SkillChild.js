import React, { Component } from 'react'
import '../../resources/css/skillChild.css'
import { List, Image } from 'semantic-ui-react'

const SmartImage = React.forwardRef((props, ref) => (
  <div id="skillChildImageContainer" ref={ref} >
    <Image src={props.src} name={props.name} size="medium" />
  </div>))


const SkillChild = props => {

  return (

    <div id="skillChildContainer">

      <SmartImage ref={props.skillData.ref} src={props.skillData.url} name={props.skillData.name} />

      <div id="skillChildTextContainer" >
        <h2>{props.skillData.name}</h2>
        <p>{props.skillData.desc}</p>
        <List bulleted>
          {props.skillData.topics.map(
            (topic, i) => <List.Item key={i}>{topic}</List.Item>
          )}
        </List>
      </div>
    </div>

  )
}

export default SkillChild