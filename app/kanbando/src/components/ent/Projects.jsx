import React from 'react';
import ProjectCard from './ProjectCard.jsx';


export default ({projects}) => {
  debugger;
  const prjArray= projects.entrySeq().map((project,idx) =>
   project
  );
  console.log(prjArray);
  return (

    <div className="projects sortable-project">{projects.entrySeq().map((project,idx) =>
           <ProjectCard className="project" key={project.projectID} idx={idx} project={project} />
    )}</div>
  );
}
