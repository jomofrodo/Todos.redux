import TetherComponent from 'react-tether';
import React from 'react';
import {Icon} from 'semantic-ui-react';

export default class TetherBasic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
  }
  toggle = () => {
    //debugger;
    const { isOpen } = this.state
    this.setState({isOpen: !isOpen});
  }

  render() {
    const { isOpen } = this.state
    let trigger = this.props.trigger;
    let content = this.props.children;
    let actualTrigger = Object.assign({},trigger);
    let iconName = this.props.iconName;
    let onConfirm = this.props.onConfirm;
    iconName = this.props.iconName || "check";
    //actualTrigger = Object.assign(actualTrigger, {onClick: this.toggle});
    actualTrigger.onClick = this.toggle;
    return(
      <TetherComponent
        attachment="top center"
        constraints={[{
          to: 'scrollParent',
          attachment: 'together'
        }]}
      >
        { /* First child: This is what the item will be tethered to */ }
        { <Icon name={iconName} onClick={this.toggle}/> } 

        { /* Second child: If present, this item will be tethered to the the first child */ }
        {
          isOpen &&
          <div onMouseLeave={this.toggle} className="basic-tether">
          {content}
          <Icon name="check" onClick={this.onConfirm} title="yes, confirm this action"/>
          <Icon name="cancel" onClick={this.toggle} title="no, cancel this action"/>
          </div>
        }
      </TetherComponent>
    )
  }
}