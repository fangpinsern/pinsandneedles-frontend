import React from "react";

import ProjectList from "../components/ProjectList";
import "./ProjectMainPage.css";

import {DumbProj} from "../data/projectData";

function ProjectMainPage() {
  return (
    <React.Fragment>
      <div className="homeHeader">
        <h1>Projects</h1>
      </div>
      <div className="projectRow">
        <ProjectList items={DumbProj} />
      </div>
    </React.Fragment>
  );
}

export default ProjectMainPage;
