import { Grid, Card, Divider } from 'semantic-ui-react'
import React from 'react'
import MediaPlayer from '../components/MediaPlayer'
import '../../resources/css/mediaPage.css'

const mediaList = [
  {
    header: 'ReactJS + Google Firebase',
    author: 'decoded.ninja',
    text: 'Created a bare-bones React App, added a form for user interaction, and sent data to Google Firebase. This video was made to display the simplicity of creating an application that connects to a "backend". Think you can make your own?',
    src: 'BEMZwNujLZc',
  },
  {
    header: 'Gears of War Montage',
    author: 'smoothSway',
    text: 'Created a GOW gameplay montage. This was made using iMovie, and video captures from Xbox One. Edited the video, synced music from Rage Against The Machine, and got this.',
    src: 'br_EEx72RjY',
  },
]


class MediaPage extends React.Component {
  render () {
    return (
      <Grid className="media-container" padded centered stackable>

        <Grid.Column width={15}><Divider /></Grid.Column>

        {mediaList.map((mediaItem, index) => {
          if ((index + 1) % 2 === 0) {
            return [

              <Grid.Column key={`video-${index}`} width={11} textAlign="center" verticalAlign="middle">
                <MediaPlayer src={mediaItem.src} autoplay={0} />
              </Grid.Column>,

              <Grid.Column key={index} width={5} textAlign="center" verticalAlign="middle">
                <Card.Group className="media-caption">
                  <Card>
                    <Card.Content>
                      <Card.Header>{mediaItem.header}</Card.Header>
                      <Card.Meta>{mediaItem.author}</Card.Meta>
                      <Card.Description>{mediaItem.text}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Column>,
              <Grid.Column width={15}><Divider /></Grid.Column>,
            ]
          }
          return [
            <Grid.Column key={index} width={5} textAlign="center" verticalAlign="middle">
              <Card.Group className="media-caption">
                <Card>
                  <Card.Content>
                    <Card.Header>{mediaItem.header}</Card.Header>
                    <Card.Meta>{mediaItem.author}</Card.Meta>
                    <Card.Description>{mediaItem.text}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Column>,

            <Grid.Column key={`video-${index}`} width={11} textAlign="center" verticalAlign="middle">
              <MediaPlayer src={mediaItem.src} autoplay={0} />
            </Grid.Column>,
            <Grid.Column width={15}><Divider /></Grid.Column>,
          ]
        })}
      </Grid>
    )
  }
}

export default MediaPage
