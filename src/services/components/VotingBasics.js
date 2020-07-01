import React from "react";

import "./VotingBasics.css";

//props
//age

function VotingBasics(props) {
  const age = props.age;

  return (
    <div>
      <h2>Voting Basics</h2>
      <hr></hr>
      <p>
        {age > 26
          ? "Not your first time voting. What you doing here?"
          : "Dont Stress Very easy one"}
      </p>
      <h3>What to bring?</h3>
      <ul>
        <li>Identification - IC, Passport, 11B</li>
        <li>Poll Card - Mailed to your legal address (address on you IC)</li>
        <li>Pen (Optional) - Due to Covid-19</li>
      </ul>
      <h3>Which constituency am I in?</h3>
      <p>
        Go{" "}
        <a href="https://app.eservice.eld.gov.sg/Voter/PollingStationEnquiry.aspx">
          here
        </a>{" "}
        to check.
        <br />
        You can see the following:
      </p>
      <ul>
        <li>Electorial Division</li>
        <li>Polling station location</li>
        <li>Time allocated - Due to Covid-19 to prevent cowding</li>
      </ul>
      <h3>What to do there?</h3>
      <p>
        Just follow instructions when you reach the polling station. The polling
        station address is on your polling card.
      </p>
      <h3>How long will it take?</h3>
      <p>5-10mins depending on how fast you walk</p>
      <h3>Can don't vote?</h3>
      <p>
        Yes. Just give up your right to vote for all future elections.
        <br />
        If you do not want to give up your right to vote in the future, but
        don't really feel like shouldering the responsibility of choosing who to
        lead in Singapore, here is what you can do.
        <br />
        <br />
        Go to polling station, follow all the procedure, then when time to
        choose, just draw a tick instead of a cross or just leave it empty like
        the tough exam questions you skip last time. Go home and have a sleep
        well at night knowing that you are not responsible for whatever happens
        to Singapore :)
      </p>
      <h3>More Info</h3>
      <p>
        To get back your voting rights after missing an election, it would cost
        you $50. FIFTY FREAKING DOLLARS! and you also need a valid reason on why
        you miss the previous one. So... just go and vote lah. You never know
        when you will start getting pissed off about the government and then
        realise you need to go through a long process of getting back your right
        to vote.
      </p>
      <p>Valid Reasons (not limited):</p>
      <ul>
        <li>Overseas</li>
        <li>Sick</li>
        <li>Giving birth</li>
        <li>etc</li>
      </ul>
      <p>
        If you did not get your poll card, you can call the Elections Department
        (1800-225-5353) or the nearest CC.
        <br />
        You can also choose to use the new e-Poll Card on the SingPass mobile
        app.
        <br />
        Worst come to worse, just walk up to those people campaigning and tell
        them you don't have a poll card. They will tell you what to do.
      </p>
    </div>
  );
}

export default VotingBasics;
