import React from "react";

// import ProjectList from "../components/ProjectList";
// import LoadingSpinner from "../../shared/modals/LoadingSpinner";
// import ErrorModal from "../../shared/modals/ErrorModal";

import "./Adulting101MainPage.css";
// import Card from "../../shared/UIElements/Card";
// import { Link } from "react-router-dom";
import ServicesItem from "../components/ServicesItem";

function Adulting101MainPage() {
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState();
  //   const [loadedProjects, setLoadedProjects] = useState();

  return (
    <React.Fragment>
      <div className="homeHeader">
        <h1>Adulting 101</h1>
        <p>Things schools should teach but don't</p>
        <p>Don't worry, not selling you insurance.</p>
      </div>
      <div className="adultingRow">
        <ul className="projectList">
          <ServicesItem
            id="adulting101/cpfbasics"
            src="https://www.cpf.gov.sg/Members/_catalogs/masterpage/CPFB/Images/logo-CPF-web.png"
            name="CPF Basics"
            description="CPF introduction for people starting work"
          />
          <ServicesItem
            id="adulting101/votingbasics"
            src="https://www.straitstimes.com/sites/default/files/styles/article_pictrure_780x520_/public/articles/2020/03/13/ycelexdept130320.jpg?itok=dw6zx_Za&timestamp=1584098331"
            name="Voting Basics"
            description="Introduction to voting for first time voters"
          />
        </ul>
      </div>
    </React.Fragment>
  );
}

// props
// id
// src
// name
// description

export default Adulting101MainPage;
