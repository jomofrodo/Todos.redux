import React, { Component } from 'react'
import { Button, Popup } from 'semantic-ui-react'

class PopupBasic extends Component {
  setContent(){
    //override for content
    return false;
  }
  render() {
    ////debugger;
    const prompt = this.props.btnPrompt;
    const header = this.props.header;
    let content = this.props.content;
    if(!content) content = this.setContent();
    let trigger = this.props.trigger;
    if(trigger==null){
      trigger =  <Button>{prompt}</Button>
    }

    return (
      <Popup trigger={trigger} hoverable basic key={this.props.idx}
        on='click'
      >
        <Popup.Header>{header}</Popup.Header>
        <Popup.Content>
          {content}
        </Popup.Content>
      </Popup>
    )
  }
}

export default PopupBasic