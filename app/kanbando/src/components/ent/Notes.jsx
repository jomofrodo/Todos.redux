import React from 'react';
import {connect} from 'react-redux';
import Editable from './Editable.jsx';
import Note from './Note.jsx';
import {moveLaneTodo} from '../../actions/lanes';

class Notes extends React.Component {
  render() {
    const {notes, moveLaneTodo, onValueClick, onEdit, onDelete} = this.props;

    return (<ul className="notes">{notes.map((note) =>
      <Note className="note" id={note.id} key={note.id}
        editing={note.editing} onMove={moveLaneTodo}>
        <Editable
          editing={note.editing}
          value={note.task}
          onValueClick={onValueClick.bind(null, note.id)}
          onEdit={onEdit.bind(null, note.id)}
          onDelete={onDelete.bind(null, note.id)} />
      </Note>
    )}</ul>);
  }
}

export default connect(() => ({}), {
  moveLaneTodo
})(Notes);
