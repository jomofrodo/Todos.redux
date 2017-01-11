import React from 'react';

export default class Editable extends React.Component {
  render() {
    const { editing, onEdit, ...props} = this.props;

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
  renderEdit = () => {
    return (
        <input type="text"
          ref={
            (e) => e ? e.selectionStart = this.props.value.length : null
          }
          autoFocus={true}
          defaultValue={this.props.value}
          onBlur={this.finishEdit}
          onKeyPress={this.checkEnter} />
    );
  };
  renderValue = () => {
    const onDelete = this.props.onDelete;
    return (
        <span className="value" onClick={this.props.onValueClick}>{this.props.value}</span>
    );
  };
  renderDelete = () => {
    return <button className="delete" onClick={this.props.onDelete}>x</button>;
  };
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  finishEdit = (e) => {
    const value = e.target.value;

    if (this.props.onEdit && value.trim()) {
      this.props.onEdit(value);
    }
  };
}
