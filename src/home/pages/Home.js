import React from "react";

import HomeCard from "../components/HomeCard";
import image1 from "../../images/KESunset1.jpg";
import image2 from "../../images/KESunset2.jpg";
import image3 from "../../images/writeCheatSheet2.jpg";
import resume from "../../images/Pin_Sern_Resume.pdf";

import "./Home.css";

function Home() {
  return (
    <React.Fragment>
      <div className="homeHeader">
        <h1>Home</h1>
      </div>
      <div className="homeMain">
        {/* <div className="homeMainLeft">
          <HomeCard
            src={image1}
            title="Latest Projects"
            description="Have a look at what I am working on recently!"
            link="/projects"
          />
        </div>
        <div className="homeMainCenter">
          <HomeCard
            src={image2}
            title="Garage Sale"
            description="One man's trash is another man's treasure"
            link="/products"
            download={false}
          />
        </div>
        <div className="homeMainRight">
          <HomeCard
            src={image3}
            title="Resume"
            description="Please hire me"
            link={image1}
            download={true}
            newTab={"true"}
          />
        </div> */}
        <div className="col-container">
          <div className="col">
            <div className="homeMainLeft">
              <HomeCard
                src={image1}
                title="Latest Projects"
                description="Have a look at what I am working on recently!"
                link="/projects"
              />
            </div>
          </div>
          <div className="col">
            <div className="homeMainCenter">
              <HomeCard
                src={image2}
                title="Garage Sale"
                description="One man's trash is another man's treasure"
                link="/products"
                download={false}
              />
            </div>
          </div>
          <div className="col">
            <div className="homeMainRight">
              <HomeCard
                src={image3}
                title="Resume"
                description="Please hire me"
                link={resume}
                download={true}
                newTab={"true"}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
