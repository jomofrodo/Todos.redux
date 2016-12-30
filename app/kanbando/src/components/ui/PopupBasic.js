import React, { Component } from 'react'
import { Button, Popup } from 'semantic-ui-react'

class PopupBasic extends Component {
  render() {
    ////debugger;
    const prompt = this.props.btnPrompt;
    const header = this.props.header;
    const content = this.props.content;
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