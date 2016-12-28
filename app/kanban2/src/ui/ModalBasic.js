import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class ModalBasic extends Component {
  state = { open: false }

  show = (size) => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    //debugger;
    const { open, size } = this.state
    const prompt = this.props.btnPrompt;
    const header = this.props.header;
    const content = this.props.content;
    const actions = this.props.actions;

    return (
      <div>
        <Button onClick={this.show('small')}>{prompt}</Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>
            {header}
          </Modal.Header>
          <Modal.Content>
            {content}
          </Modal.Content>
          <Modal.Actions>
            <Button positive  labelPosition='right' content='Done' onClick={this.close}/>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalBasic