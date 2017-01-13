import React from 'react';
import ProjectCard from './ProjectCard.jsx';


export default ({projects}) => {

  return (

    <div className="projects sortable-project">{projects.map((project,idx) =>
           <ProjectCard className="project" key={project.projectID} idx={idx} project={project} />
    )}</div>
  );
}
