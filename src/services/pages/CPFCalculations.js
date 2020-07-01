import React, { useState, useEffect } from "react";

import "./CPFCalculations.css";
import IncomeCalculator from "../components/CPFCalculator";
import CPFAnalysis from "../components/CPFAnalysis";

function CPFCalculations() {
  const [calcDone, setCalcDone] = useState(false);
  const [dreamIncome, setDreamIncome] = useState();
  const [userAge, setUserAge] = useState();
  const [CPFAmount, setCPFAmount] = useState();
  const [employerContributions, setEmployerContributions] = useState();
  const [afterCPF, setAfterCPF] = useState();
  //   const [taxAmount, setTaxAmount] = useState();
  //   const [afterTax, setAfterTax] = useState();
  //   const [usableIncome, setUsableIncome] = useState();

  const incomeInputHandler = (income, age) => {
    setDreamIncome(income);
    setUserAge(age);
  };

  const rounding2dp = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  //   const yearlyTaxCalculations = (amount) => {
  //     // chargeable per annum
  //     //   let amt = amount;
  //     let tax = 0;

  //     if (amount <= 30000) {
  //       tax = (amount - 10000) * 0.02;
  //     } else if (amount <= 40000) {
  //       tax = 200 + (amount - 30000) * 0.035;
  //     } else if (amount <= 80000) {
  //       tax = 550 + (amount - 40000) * 0.07;
  //     } else if (amount <= 120000) {
  //       tax = 3350 + (amount - 80000) * 0.115;
  //     } else if (amount <= 160000) {
  //       tax = 7950 + (amount - 120000) * 0.15;
  //     } else if (amount <= 200000) {
  //       tax = 13950 + (amount - 160000) * 0.18;
  //     } else if (amount <= 240000) {
  //       tax = 21150 + (amount - 200000) * 0.19;
  //     } else if (amount <= 280000) {
  //       tax = 28750 + (amount - 240000) * 0.195;
  //     } else if (amount <= 320000) {
  //       tax = 36550 + (amount - 280000) * 0.2;
  //     } else {
  //       tax = 44550 + (amount - 320000) * 0.22;
  //     }
  //     return tax;
  //   };

  useEffect(() => {
    const CPFCalculationsHandler = (amount, age) => {
      // only first $6000 needs to be creditted to cpf
      let amt = amount;
      if (amt > 6000) {
        amt = 6000;
      }
      let CPFDeduction = 0;
      let employerCPF = 0;
      if (age < 55) {
        // Up to 55 - 20%
        // Up to 55 - 17%
        CPFDeduction = amt * 0.2;
        employerCPF = amt * 0.17;
      } else if (age >= 55 && age < 60) {
        // 55 - 60 - 13%
        // 55 - 60 - 13%
        CPFDeduction = amt * 0.13;
        employerCPF = amt * 0.13;
      } else if (age >= 60 && age < 65) {
        // 60 - 65 - 7.5%
        // 60 - 65 - 9%
        CPFDeduction = amt * 0.075;
        employerCPF = amt * 0.09;
      } else {
        // >65 - 5%
        // >65 - 7.5%
        CPFDeduction = amt * 0.05;
        employerCPF = amt * 0.075;
      }

      return [rounding2dp(CPFDeduction), rounding2dp(employerCPF)];
    };
    if (!userAge || !dreamIncome) {
      return;
    }
    let usableIncome = dreamIncome;
    const CPFCalc = CPFCalculationsHandler(usableIncome, userAge);
    const CPFDeduction = CPFCalc[0];
    setCPFAmount(CPFDeduction);
    setEmployerContributions(CPFCalc[1]);
    usableIncome = dreamIncome - CPFDeduction;
    setAfterCPF(usableIncome);
    // const taxAmount = rounding2dp(
    //   yearlyTaxCalculations(usableIncome * 12) / 12
    // );
    // setTaxAmount(taxAmount);
    // usableIncome = usableIncome - taxAmount;
    // setAfterTax(usableIncome);
    // setUsableIncome(usableIncome);
    setCalcDone(true);
  }, [dreamIncome, userAge, CPFAmount]);

  return (
    <React.Fragment>
      <div className="cpfHeader">
        <h1>CPF Information</h1>
        <p>How much do you really need to earn?</p>
        <p>
          There is more that meets the eye when your employer says "We are
          offering you $X"
        </p>
      </div>
      <IncomeCalculator incomeInputHandler={incomeInputHandler} />
      {calcDone && (
        <div className="incomeCalculationsMain">
          <h2>After CPF deductions</h2>
          {CPFAmount && <p>CPF Contribution: ${CPFAmount}</p>}
          {afterCPF && <p>Income after CPF Contribution: ${afterCPF}</p>}
          <CPFAnalysis
            cpfAmount={CPFAmount}
            employerContributions={employerContributions}
            age={userAge}
          />
          {/* <h2>After Tax deductions* </h2>
          {taxAmount && <p>Tax Contributions: {taxAmount}</p>}
          {afterTax && <p>After Tax Contribution: {afterTax}</p>} */}
        </div>
      )}
      {/* {calcDone && (
        <div className="incomeCalculationsFooter">
          <p>*Assumptions:</p>
          <ul>
            <li>Earn the same amount for 12 months</li>
            <li>No other taxable income/returns</li>
          </ul>
        </div>
      )} */}
    </React.Fragment>
  );
}

export default CPFCalculations;
