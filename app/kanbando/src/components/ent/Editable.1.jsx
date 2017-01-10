import React from 'react';
import { Input } from 'semantic-ui-react';

export default class Editable1 extends React.Component {
  render() {
    const {value, onEdit, onValueClick, editing, ...props} = this.props;

    let renderer = (editing ? this.renderEdit : this.renderValue);
    return (
      renderer()
    );
  }
  renderEdit = () => {
    return (
      <Input type="text"
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
    const className = this.props.className;
    const myClasses = "value sortof-disabled";
    let combinedClasses = className + " " + myClasses;
    return (
      <Input type="text" className={combinedClasses}
        readOnly="true"
        onClick={this.props.onValueClick} value={this.props.value} />
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
