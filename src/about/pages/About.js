import React from "react";

import image1 from "../../images/portfolioImage.jpg";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/FormElements/Button";
import resume from "../../images/Pin_Sern_Resume.pdf";
import WhatIKnow from "../components/WhatIKnow";

import "./About.css";

import reactIcon from "../icons/reacticon.png";
import javascriptIcon from "../icons/javascripticon.png";
import flutterIcon from "../icons/fluttericon.png";
import pythonIcon from "../icons/pythonicon.png";
import nodeJsIcon from "../icons/nodejsicon.png";
import javaIcon from "../icons/javaicon.png";
import machineLearningIcon from "../icons/machinelearningicon.png";

function About() {
  return (
    <React.Fragment>
      <div className="homeHeader">
        <h1>About Me</h1>
      </div>
      <div className="aboutMain">
        <div className="aboutMainLeft">
          <Card className="aboutMainLeftCard">
            <img src={image1} alt="myself" />
          </Card>
        </div>
        <div className="aboutMainRight">
          <h3>What I know:</h3>
          <WhatIKnow numStars={5} name={"Python"} icon={pythonIcon} starBar />
          <WhatIKnow numStars={5} name={"React"} icon={reactIcon} starBar />
          <WhatIKnow
            numStars={5}
            name={"Javascript"}
            icon={javascriptIcon}
            starBar
          />
          <WhatIKnow numStars={4} name={"NodeJs"} icon={nodeJsIcon} starBar />
          <WhatIKnow numStars={4} name={"Java"} icon={javaIcon} starBar />
          <h3>What I am currently learning:</h3>
          <WhatIKnow done={30} name={"Flutter"} icon={flutterIcon} loadingBar />
          <WhatIKnow
            done={30}
            name={"Machine Learning"}
            icon={machineLearningIcon}
            loadingBar
          />
          <h3>Current Projects:</h3>
          <WhatIKnow
            done={20}
            name={
              <a href="https://github.com/fangpinsern/PersonalResumeWebsite">
                Resume Website Builder
              </a>
            }
            loadingBar
          />

          <h3>General Information</h3>
          <p>Name: Pin Sern</p>
          <p>Occupation: Student</p>
          <p>School: National University Of Singapore (NUS) Class of 2022</p>
          <p>Course: Computer Science with Second Major in Statistics</p>
          <p>Specialization: Artificial Intelligence and Computer Security</p>
          <p>Description: </p>
          {/* <p>
            I believe that time is precious and should be used wisely. Hence, I
            would always find something useful to do when I am not busy with
            school, be it learning a new skill or starting a personal project.
          </p> */}
          <p>
            I enjoy building things whether is it software or hardware. This
            drove me to build this website which documents the projects I have
            built and various skillsets I have gained along the way.
          </p>
          <p>
            I plan to use this platform to build meaningful and useful
            applications in my free time.
          </p>
          <p>
            I am a team player and prefer to work in groups. Entering university
            with no programming experience, I can relate to people who do not
            understand code. I adapt quickly to change and always open to new
            ideas. I handle criticism well and take it as a chance to be a
            better version of myself.
          </p>
          <p>
            Aside for programming and school work, I enjoy various activities
            like sports, film photography as well as videography
          </p>
          <Button href={resume} download={true} newTab={true}>
            Resume
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default About;
