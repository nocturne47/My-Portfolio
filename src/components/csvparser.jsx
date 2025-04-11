import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import CsvTable from "./Projects"; // Import the component where data will be displayed

const CsvParser = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Path to the CSV file in the public directory
    const csvUrl = "../../public/sample.csv";

    // Fetch the CSV file
    fetch(csvUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((csvText) => {
        // Parse the CSV content using PapaParse
        Papa.parse(csvText, {
          header: true, // Parse the first row as headers
          skipEmptyLines: true, // Ignore empty rows
          complete: (results) => {
            console.log("Parsed Data:", results.data); // Log the parsed data
            setData(results.data); // Save parsed data to state
          },
          error: (err) => {
            console.error("Error parsing CSV:", err);
            setError(err);
          },
        });
      })
      .catch((fetchError) => {
        console.error("Error fetching CSV:", fetchError);
        setError(fetchError);
      });
  }, []);

  return (
    <div>
      <h1>CSV Parser</h1>
      {error && <p>Error: {error.message}</p>}
      {/* Pass parsed data as props to the CsvTable component */}
      <CsvTable data={data} />
    </div>
  );
};

export default CsvParser;
