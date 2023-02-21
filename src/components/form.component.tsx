import React, { useState } from "react";
import { IRequestForm } from "../react-app-env";

const Form = () => {
  const initualRequestState: IRequestForm = {
    initial_investment: "",
    annual_contribution: "",
    annual_increase: "",
    years_investment: "",
    rate_performance: "",
  };

  const [request, setRequest] = useState(initualRequestState);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRequest((prev) => ({
      ...prev,
      [e.target?.name]: e.target?.value,
    }));
  };

  const handleClick = (): void => {
    let sendResponse = setDefaultValues(request);
    if (validateForm(sendResponse)) {
      fetch("http://localhost:8080/calculation/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendResponse),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    } else {
      setShowErrorMessage(true);
    }
  };

  const validateForm = (req: IRequestForm): boolean => {
    const {
      initial_investment,
      annual_contribution,
      annual_increase,
      rate_performance,
      years_investment,
    } = req;

    if (
      initial_investment >= 1000 &&
      annual_contribution >= 0 &&
      annual_increase >= 0 &&
      years_investment > 0 &&
      rate_performance > 0
    ) {
      return true;
    }

    return false;
  };

  const setDefaultValues = (req: IRequestForm): IRequestForm => {
    if (req.annual_contribution === "") {
      req.annual_contribution = 0;
    }
    if (req.annual_increase === "") {
      req.annual_increase = 0;
    }
    return req;
  };

  return (
    <>
      <div className="container-fluid mt-5">
        {showErrorMessage && (
          <div className="row alert alert-danger" role="alert">
            No es posible procesar su solicitud con los datos proporcionados.
            Ejemplo:
            <br />
            <ul>
              <li>initial_investment: 5000 (Mayor o igual 1000)</li>
              <li>annual_contribution: 3000 (Mayor o igual a 0)</li>
              <li>annual_increase: 1 (Mayor o igual a 0)</li>
              <li>years_investment: 5 (Mayor a 0)</li>
              <li>rate_performance: 21 (Mayor a 0)</li>
            </ul>
          </div>
        )}
        <div className="row justify-content-md-center">
          <div className="col col-md-5">
            <div className="form-group">
              <label htmlFor="initialInvestmentInput">Initial Investment</label>
              <input
                type="text"
                className="form-control"
                id="initialInvestmentInput"
                name="initial_investment"
                value={request?.initial_investment}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="annualContributionInput">
                Annual Contribution
              </label>
              <input
                type="text"
                className="form-control"
                id="annualContributionInput"
                name="annual_contribution"
                value={request?.annual_contribution}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="annualIncreaseInput">Annual Increase</label>
              <input
                type="text"
                className="form-control"
                id="annualIncreaseInput"
                name="annual_increase"
                value={request?.annual_increase}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="yearsInvestmentInput">Years Investment</label>
              <input
                type="text"
                className="form-control"
                id="yearsInvestmentInput"
                name="years_investment"
                value={request?.years_investment}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ratePerformanceInput">Performance Rate</label>
              <input
                type="text"
                className="form-control"
                id="ratePerformanceInput"
                name="rate_performance"
                value={request?.rate_performance}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                disabled={
                  !request.initial_investment ||
                  !request.rate_performance ||
                  !request.years_investment
                }
                onClick={handleClick}
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          {data && (
            <>
              <div className="container py-5">
                <div className="row justify-content-center">
                  <div className="col-md-5 text-center">
                    Final Amount: {data?.final_amount}
                  </div>
                  <div className="col-md-5 text-center">
                    Return Investment: {data?.return_investment}
                  </div>
                </div>
              </div>
              <table className="table mr-5 ml-5">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Initial Balance</th>
                    <th scope="col">Contribution</th>
                    <th scope="col">Calculation for year</th>
                    <th scope="col">Yield</th>
                    <th scope="col">Final Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.registers_calculation.map((row: any) => (
                    <tr key={row?.id}>
                      <th scope="row">{row?.id}</th>
                      <td>{row?.initial_Balance}</td>
                      <td>{row?.contribution}</td>
                      <td>{row?.calculation_year}</td>
                      <td>{row?.yield}</td>
                      <td>{row?.final_balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
