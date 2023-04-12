/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '5%',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
}

class ContactForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      message: '',
      status: 'blue',
      statusMessage: 'ready',
    }

    this.validate = this.validate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleMessageChange = this.handleMessageChange.bind(this)
  }

  validate = email => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

    return expression.test(String(email).toLowerCase())
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value,
    })

    if (this.state.status !== 'blue') {
      this.setState({ status: 'blue', statusMessage: 'ready' })
    }
  }

  handleMessageChange = event => {
    this.setState({
      message: event.target.value,
    })

    if (this.state.status !== 'blue') {
      this.setState({ status: 'blue', statusMessage: 'ready' })
    }
  }

  handleSubmit = () => {
    this.setState({ status: 'orange', statusMessage: 'sending ..' })

    const requestBody = {
      email: this.state.email,
      message: this.state.message,
    }

    const gmailEndpoint = 'https://api.jcaicedo.io/v2/methods/contact'
    axios.post(gmailEndpoint, requestBody)
      .then(() => {
        this.setState({ status: 'green', statusMessage: 'sent :)' })
      })
      .catch(() => {
        this.setState({ status: 'red', statusMessage: 'failed :(' })
      })

    this.setState({
      email: '',
      message: '',
    })
  }

  render () {
    return (
      <div style={styles.root}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input type="email" value={this.state.email} placeholder="me@provider.com" onChange={this.handleEmailChange} />
          </Form.Field>
          <Form.TextArea value={this.state.message} onChange={this.handleMessageChange} placeholder="I think..." />
          <div style={styles.button}>
            <Button animated disabled={!(this.validate(this.state.email) && this.state.message)} color={this.state.status} type="submit">
              <Button.Content visible >
                {this.state.statusMessage}
              </Button.Content>
              <Button.Content hidden>
                send!
              </Button.Content>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default ContactForm
