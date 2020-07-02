import React from "react";

import "./CPFAnalysis.css";

//props
//cpf amount
//employer contributions
//age

function CPFAnalysis(props) {
  const age = props.age;
  const totalCPFMonthly = props.cpfAmount + props.employerContributions;
  const rounding2dp = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const CPFAccountCalc = (userAge, amt) => {
    let oa = 0;
    let sa = 0;
    let ma = 0;
    let ra = 0;
    if (userAge <= 35) {
      oa = amt * 0.6216;
      sa = amt * 0.1621;
      ma = amt - oa - sa;
    } else if (userAge <= 45) {
      oa = amt * 0.5676;
      sa = amt * 0.1892;
      ma = amt - oa - sa;
    } else if (userAge <= 50) {
      oa = amt * 0.5135;
      sa = amt * 0.2162;
      ma = amt - oa - sa;
    } else if (userAge <= 55) {
      oa = amt * 0.4054;
      sa = amt * 0.3108;
      ma = amt - oa - sa;
    } else if (userAge <= 60) {
      oa = amt * 0.4615;
      sa = amt * 0.1346;
      ma = amt - oa - sa;
      ra = oa + sa;
      oa = 0;
      sa = 0;
    } else if (userAge <= 65) {
      oa = amt * 0.2121;
      sa = amt * 0.1515;
      ma = amt - oa - sa;
      ra = oa + sa;
      oa = 0;
      sa = 0;
    } else {
      oa = amt * 0.08;
      sa = amt * 0.08;
      ma = amt - oa - sa;
      ra = oa + sa;
      oa = 0;
      sa = 0;
    }

    return [rounding2dp(oa), rounding2dp(sa), rounding2dp(ma), rounding2dp(ra)];
  };

  const [oa, sa, ma, ra] = CPFAccountCalc(age, totalCPFMonthly);
  return (
    <div>
      <h2>CPF. The basics</h2>
      <hr></hr>
      <p>Total Employee Contribution: ${props.cpfAmount}</p>
      <p>Total Employer Contribution: ${props.employerContributions}</p>
      <p>
        Total CPF Amount Creditted Monthly: $
        {props.cpfAmount + props.employerContributions}
      </p>
      <h3>How is it calculated?</h3>
      <p>
        Simply put, first $6000 of your monthly income is subjected to CPF
        contributions. The subsequent amount is not. E.g. if you earn
        $10000/month, only the first $6000 have to be subjected to CPF
        contributions
      </p>
      <p>
        NDR 2019 announced that CPF contributions for older worker (&gt; 55)
        will gradually increase as well. (sian...)
      </p>
      <p>
        Age &lt; 55: <br /> You - 20% <br /> Employer - 17%
      </p>
      <p>
        55 &lt; Age &lt; 60: <br /> You - 13% <br /> Employer - 13%
      </p>
      <p>
        60 &lt; Age &lt; 65: <br /> You - 7.4% <br /> Employer - 9%
      </p>
      <p>
        Age &gt; 65: <br /> You - 5% <br /> Employer - 7.5%
      </p>
      <h3>Why have CPF?</h3>
      <p>
        Basically, the government thinks you are not capable of saving. Thus it
        decides to help you do it.
      </p>
      <h3>Type of accounts</h3>
      <ul>
        <li>Ordinary Account (OA) - ordinary cuz can spend</li>
        <li>Special Account (SA) - tbh, special cuz cannot do much</li>
        <li>Medisave Account (MA) - anything medical</li>
        <li>Retirement Account (RA) - after 55 OA + SA = RA</li>
      </ul>
      <p>Monthly amount credited:</p>
      <ul>
        {oa > 0 && <li>OA - ${oa}</li>}
        {sa > 0 && <li>SA - ${sa}</li>}
        {<li>MA - {ma}</li>}
        {ra > 0 && <li>RA - ${ra}</li>}
      </ul>
      <h3>CPF can earn money?</h3>
      <p>CPF provides different interest rates for different accounts</p>
      <ul>
        <li>OA - 2.5%</li>
        <li>SA - 4% (maybe thats why special)</li>
        <li>MA - 4%</li>
        <li>RA - 4%</li>
      </ul>
      <p>
        You can transfer money from OA to SA. BUT its one way only. Go won't
        come back.
      </p>
      <h3>What can you use it for?</h3>
      <ul>
        <li>Buy house (OA) - Have some T&amp;C but at least can use</li>
        <li>Pay education (OA) - BUT need return one</li>
        <li>Invest (OA SA) - CPF interest not bad though</li>
        <li>Insurance (Medisave) - buy some plan</li>
        <li>Retirement - complicated... just have at least $60000 by 55</li>
      </ul>
      <h3>Die already how?</h3>
      <p>
        Your family memeber (whoever nominated) will get a letter. Just follow
        instructions. Easy. With that said, don't die to early. If not you don't
        get to spend your hard earn money.
      </p>
      <h3>More Info</h3>
      <p>
        Additional Income is not calculated here. Additional income is things
        like bonus or leave pay that is not something you recieve monthly. To
        calculate the contribution, take 102000 - YEARLY wage subjected to CPF
        contributions. That would be the amount considered for CPF
        contributions.
        <br />
        <br />
        For example, if you earn $10000 a month, only $6000 is subjected to CPF
        contributions. Therefore, 102000 - (6000*12) = 30000. Hence, the first
        $30000 of your additional income is subjected to CPF contributions. Have
        bonus same as no bonus like that. Employer give you bonus still need to
        give extra CPF. You are actually very expensive. So please be more
        useful.
      </p>
    </div>
  );
}

export default CPFAnalysis;
