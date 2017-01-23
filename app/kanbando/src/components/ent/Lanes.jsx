import React from 'react';
import Lane from './Lane.jsx';

export default ({lanes}) => {
  return (
    <div className="lanes">{lanes.entrySeq().map((lane) =>
      <Lane className="lane" key={lane.id} lane={lane} />
    )}</div>
  );
}
