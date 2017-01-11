import React from 'react';
import Project from './Project.jsx';


export default ({projects}) => {

  return (

    <div className="projects sortable-project">{projects.map((project,idx) =>
           <Project className="project" key={project.projectID} idx={idx} project={project} />
    )}</div>
  );
}
