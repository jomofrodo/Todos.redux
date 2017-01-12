import React, { Component } from 'react'



class JoModal extends React.Component{
state = { open: false }

  show = (size) => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })


render(){

    const { open, size } = this.state
    const prompt = this.props.btnPrompt;
    const header = this.props.header;
    const content = this.props.content;
    const actions = this.props.actions;

    return(
            <div className="jomodal">
              <div className="jomodal-content">
                {content}

            </div>

                    <div classname="jomodal-actions">
                        <Button positive  labelPosition='right' content='Done' onClick={this.close}/>
                    </div>
           </div>

    );
}

}