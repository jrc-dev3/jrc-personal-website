import React from 'react'
import { List, Header, Grid, Divider } from 'semantic-ui-react'
import ContactForm from '../containers/ContactForm'

const ProjectsContent = () => (
  <Grid stackable centered padded columns={2}>
    <Grid.Column width={15}><Divider /></Grid.Column>
    <Grid.Row>
      <Grid.Column>
        <Header> Works </Header>
        <List>
          <List.Item>
            <List.Icon name="marker" />
            <List.Content>
              <List.Header as="a" href="http://hudsoncatholic.org" rel="noopener noreferrer" target="_blank">hudsoncatholic.org</List.Header>
              <List.Description content={<i>Rebuilt the school website's home page.</i>} />
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Icon name="marker" />
            <List.Content>
              <List.Header as="a" href="https://jcaicedo.io/tutorials" rel="noopener noreferrer" target="_blank">jcaicedo.io/tutorials</List.Header>
              <List.Description content={
                <i>Sub-page documenting topics I
                found important learning as a developer.
                </i>} />
            </List.Content>
          </List.Item>

          {/* <List.Item>
            <List.Icon name="marker" />
            <List.Content>
              <List.Header as="a" href="https://mechanizedhuman.com" rel="noopener noreferrer" target="_blank">mechanizedhuman.com</List.Header>
              <List.Description content={
                <i> Handled the backend development.
                </i>} />
            </List.Content>
          </List.Item> */}
        </List>
        <Header> Personal </Header>
        <List>
          <List.Item>
            <List.Icon name="instagram" />
            <List.Content>
              <List.Header as="a" href="https://www.instagram.com/decoded.ninja/" rel="noopener noreferrer" target="_blank">@decoded.ninja</List.Header>
              <List.Description content="An effort to spread knowledge in technology." />
            </List.Content>
          </List.Item>
        </List>

      </Grid.Column>

      <Grid.Column>
        <List>
          <List.Item>
            <List.Content>
              <ContactForm />
            </List.Content>
          </List.Item>
        </List>

      </Grid.Column>

    </Grid.Row>
    <Grid.Column width={15}><Divider /></Grid.Column>
  </Grid>
)

export default ProjectsContent
