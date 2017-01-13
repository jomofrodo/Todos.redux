import React, { Component } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

class ModalBasic extends Component {
  state = { open: false }

  show = (size) => () => {
    debugger;
    this.setState({ size, open: true })
  }
  close = () =>{
    this.setState({ open: false })
  } 

  setContent = ()=> {
      //override in extending class
  }
  flgOpen;
  componentWillReceiveProps(){
    this.flgOpen = this.props.flgOpen;
    if(this.flgOpen) this.setState({open: true});
  }

  render() {
    //this.flgOpen = this.props.flgOpen;
    let { open, size } = this.state
    let btnPrompt = this.props.btnPrompt;
    let btnIcon = this.props.btnIcon;
    const header = this.props.header;
    let content = this.props.content;
    if(!content) content = this.props.children;
    if(!content) content = this.setContent();
    const actions = this.props.actions;

    return (
      <div>
      {btnIcon &&
        <Icon className={btnIcon} onClick={this.show('small')}/>
      }
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