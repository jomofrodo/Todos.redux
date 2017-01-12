import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal } from 'semantic-ui-react'

class Confirm extends Component {
  state = { open: false }
  flgConfirm = false;

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  deny = () => {
      flgConfirm = false;
      close();
      return flgConfirm;
  }

  approve = () =>{
      flgConfirm = true;
      close();
      return flgConfirm;
  }

  render() {
    const { open, dimmer="none",} = this.state;
    const {title="Confirm or Deny!", content } = this.props;
    
    return (

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content>

            <Modal.Description>
              {content}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Sure" onClick={this.close} />
          </Modal.Actions>
        </Modal>

    );
  }
}

