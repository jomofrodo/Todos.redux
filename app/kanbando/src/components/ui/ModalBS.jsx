import React from 'react';
import Modal from 'react-bootstrap-modal';

class ModalExample extends React.Component {

  render(){
    const { open, size } = this.state
    const prompt = this.props.btnPrompt;
    const header = this.props.header;
    const content = this.props.content;
    const actions = this.props.actions;

    let closeModal = () => this.setState({ open: false })

    let saveAndClose = () => {
        this.setState({ open: false })
    }

         /*
            // Or you can create your own dismiss buttons
            <button className='btn btn-primary' onClick={saveAndClose}>
              Save
            </button>
            */
            debugger;
    return (
      <div>
        <button type='button'>Launch modal</button>

        <Modal
          show={this.state.open}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {content}
          </Modal.Body>
          <Modal.Footer>
            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
 
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}