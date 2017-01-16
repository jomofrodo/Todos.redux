import React from 'react';
import Modal from 'react-modal';
import {Icon} from 'semantic-ui-react';



/*
The app element allows you to specify the portion of your app that should be hidden (via aria-hidden)
to prevent assistive technologies such as screenreaders from reading content outside of the content of
your modal.  It can be specified in the following ways:

* element
Modal.setAppElement(appElement);

* query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');

const appElement = document.getElementById('your-app-element');
*/




let customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


export default class ReactModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

      flgOpen;

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false, flgClose: true});
  }


  render() {
    let { modalIsOpen, size, flgClose } = this.state
    let flgOpen = this.props.flgOpen;
    if(flgOpen) modalIsOpen = flgOpen;  //Override
    if(flgClose) modalIsOpen = false;  //Override for the override
    let btnPrompt = this.props.btnPrompt;
    let btnIcon = this.props.btnIcon;
    const header = this.props.header;
    let content = this.props.content;
    if(!content) content = this.props.children;

    const actions = this.props.actions;
    return (
      <div>
      {btnPrompt &&   <button onClick={this.openModal}>{btnPrompt}</button>  }
      {btnIcon && <Icon className={btnIcon} onClick={this.openModal}/>}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
            {content}
        </Modal>
      </div>
    );
  }
}