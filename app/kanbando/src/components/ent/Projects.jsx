import React from 'react';
import Project from './Project.jsx';


export default ({projects}) => {

  return (

    <div className="projects">{projects.map((project) =>

      <Project className="project" key={project.projectID} project={project} />
    )}</div>
  );
}
