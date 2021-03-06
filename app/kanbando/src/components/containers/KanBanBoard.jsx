import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Lanes from '../ent/Lanes.jsx';
import {createLane} from '../../actions/lanes';

class KanBanBoard extends React.Component {
  render() {
    const {lanes, createLane} = this.props;

    return (
      <div>
        <button className="add-lane"
          onClick={createLane.bind(null, {
            name: 'New lane'
          })}>+</button>
        <Lanes lanes={lanes} />
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    lanes: state.get('lanes')
  }), {
    createLane
  }),
  DragDropContext(HTML5Backend)
)(KanBanBoard);
