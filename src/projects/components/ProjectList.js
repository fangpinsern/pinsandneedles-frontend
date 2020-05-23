import React from "react";
import Card from "../../shared/UIElements/Card";
import ProjectItem from "./ProjectItem"

import "./ProjectList.css"

//props
// items - list of items in the list
function ProjectList(props) {
  if (props.items.length === 0) {
    return (
      <div className="projectList center">
        <Card className="emptyProjectListCard">
          <h2>No Projects found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="projectList">
      {props.items.map((project) => {
        return <ProjectItem 
            key={project.id}
            id={project.id}
            name={project.title}
            src={project.imageUrl}
            description={project.description}
        />;
      })}
    </ul>
  );
}

export default ProjectList;

// id
// src
// name
// description
