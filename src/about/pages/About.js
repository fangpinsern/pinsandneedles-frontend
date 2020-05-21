import React from "react";

import "./About.css";
import image1 from "../../images/portfolioImage.jpg";
import Card from "../../shared/UIElements/Card";
function About() {
  return (
    <React.Fragment>
      <div className="homeHeader">
        <h1>About Me</h1>
      </div>
      <div className="aboutMain">
        <div className="aboutMainLeft">
          <Card className="aboutMainLeftCard">
            <img src={image1} alt="Picture of myself" />
          </Card>
        </div>
        <div className="aboutMainRight">
          <p>
            Hello, my name is Pin Sern. Currently studying Computer Science at
            the National University of Singapore (NUS)
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed
            sem eu nisl ultrices sodales tincidunt at sapien. Aenean molestie
            eros id velit maximus, at tincidunt nisl imperdiet. Vivamus ut enim
            accumsan, lobortis nisi in, maximus nisi. Mauris nunc ante, mollis
            sit amet efficitur nec, suscipit eget turpis. Sed tincidunt et dui
            sit amet ullamcorper. Nam a consequat lorem, quis dictum magna. Cras
            posuere arcu vitae lorem porta, sed mattis erat posuere. Maecenas
            vel elit semper, volutpat massa vel, accumsan diam. Duis eu
            tristique purus. Cras id pellentesque nibh. Sed non suscipit orci.
            Vivamus facilisis nulla quis neque maximus pulvinar. Cras et luctus
            urna, ac ornare metus. Fusce in tortor ac eros pellentesque
            molestie.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default About;
