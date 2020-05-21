import React from "react";

import "./Home.css";
import HomeCard from "../components/HomeCard";

import image1 from "../../images/KESunset1.jpg";
import image2 from "../../images/KESunset2.jpg";
import image3 from "../../images/writeCheatSheet2.jpg";
function Home() {
  return (
    <React.Fragment>
      <div className="homeHeader">
        <h1>Home</h1>
      </div>
      <div className="homeMain">
        <div className="homeMainLeft">
          <HomeCard
            src={image1}
            title="Latest Projects"
            description="If you are interested, you could have a look at what I am working on recently!"
            link="/projects"
          />
        </div>
        <div className="homeMainCenter">
          <HomeCard
            src={image2}
            title="Entertainment"
            description="If you are interested, you could have a look at the goofy things I do for fun!"
            link="https://www.youtube.com/"
            download={false}
          />
        </div>
        <div className="homeMainRight">
          <HomeCard
            src={image3}
            title="Resume"
            description="If you are interested, please hire me"
            link={image1}
            download={true}
            newTab={"true"}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
