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
    const { isOpen } = this.state
    this.setState({isOpen: !isOpen});
  }

  render() {
    const { isOpen } = this.state
    let trigger = this.props.trigger;
    let content = this.props.children;
    let actualTrigger = Object.assign({},trigger);
    let iconName = this.props.iconName;
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
          <div>
          {content}
          </div>
        }
      </TetherComponent>
    )
  }
}