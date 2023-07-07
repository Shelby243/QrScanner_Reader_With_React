import React from "react";
import "../App.css";
let msg;
function filterResults(results) {
  let filteredResults = [];
  console.log("from filetr", results);
  for (let i = 0; i < results.length; i++) {
    if (i === 0) {
      filteredResults.push(results[i]);
      continue;
    }
    if (filteredResults.includes(results[i])) {
      console.log(results[i], "already exists");
      msg = `${results[i]} already scanned`;
    } else {
      msg = `${results[i]} is valid`;
      filteredResults.push(results[i]);
    }
  }
  return filteredResults;
}

const ResultContainerTable = ({ data }) => {
  const results = filterResults(data);
  return (
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>Decoded Code</td>
        </tr>
      </thead>
      <tbody>
        {results.map((result, i) => {
          console.log(result);
          return (
            <tr key={i}>
              <td>{i}</td>
              <td style={{ color: "green" }}>{result}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
const ResultPlugin = ({ results }) => {
  console.log(results);
  const allResults = filterResults(results);

  return (
    <div className="Result-container">
      <div className="Result-header">Scanned results ({allResults.length})</div>
      <div className="Result-section">
        <ResultContainerTable data={allResults} />
      </div>
      <div className="Result-header">Message: {msg}</div>
    </div>
  );
};

export default ResultPlugin;
