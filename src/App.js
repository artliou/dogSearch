import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DogBreedCompactTable from './components/DogBreedCompactTable';
import FilterForm from './components/FilterForm';

// React Bootsrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Utilize PapaParse to data ingest CSV
const Papa = require('papaparse');
const csvFilePath = '../../dataSources/dog_breeds.csv';

function App() {
  const [doggoData, setDoggoData] = useState([]);
  const [enumFields, setFields] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [fieldNamesConversion, setFieldNamesConversion] = useState({});
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(csvFilePath);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      // Parse CSV and store in a DB-like object format
      Papa.parse(csv, { 
        header: true,
        skipEmptyLines: true,
        complete: function (results) { 
            // Fix Up results.data into a proper object to store in state
            // Start row var at -1 to start id at 0
            let row = -1;
            const dogBreedRecords = results.data.map(record => {
              row++;
              return {
                id: row,
                breed: record["Breed"],
                countryOfOrigin: record["Country of Origin"],
                furColor: record["Fur Color"],
                height: record["Height (in)"],
                eyeColor: record["Color of Eyes"],
                longevity: record["Longevity (yrs)"],
                characterTraits: record["Character Traits"],
                commonHealthProblems: record["Common Health Problems"],
              }
            });
            // In addition prepare field names for when we want to filter
            let fieldNamesConversionObj = {
                "Breed": "breed",
                "Country of Origin": "countryOfOrigin",
                "Fur Color": "furColor",
                "Height (in)": "height",
                "Color of Eyes": "eyeColor",
                "Longevity (yrs)": "longevity",
                "Character Traits": "characterTraits",
                "Common Health Problems": "commonHealthProblems"
            }
            // Setting States
            setFieldNamesConversion(fieldNamesConversionObj)
            setDoggoData(dogBreedRecords);
            setSearchResults(dogBreedRecords);
            populateSearchValues(dogBreedRecords)
            // console.log("Data Ingestion: dogBreedRecords", dogBreedRecords)
        }
      });
    }
    
    // Prep Enum Values for DropDownMenu  
    // For columns that may have multiple values, we will grab the individual values.
    async function populateSearchValues(dogBreedRecords) {
      // console.log("populateSearchValues Started", dogBreedRecords)

      let fieldSet = {
          "Breed": new Set(),
          "Country of Origin": new Set(),
          "Fur Color": new Set(),
          "Height (in)": new Set(),
          "Color of Eyes": new Set(),
          "Longevity (yrs)": new Set(),
          "Character Traits": new Set(),
          "Common Health Problems": new Set(),
      }
      // console.log("dogBreedRecords Pre Iteration", dogBreedRecords, typeof dogBreedRecords)
        dogBreedRecords.forEach(dogBreed => {
          fieldSet["Breed"].add(dogBreed.breed);
          fieldSet["Country of Origin"].add(dogBreed.countryOfOrigin);
          dogBreed.furColor.split(/[ ,&]+/).filter(Boolean).forEach(color => {
              fieldSet["Fur Color"].add(color.charAt(0).toUpperCase() + color.slice(1));
          });
          fieldSet["Height (in)"].add(dogBreed.height);
          dogBreed.eyeColor.split(/[ ,&]+/).filter(Boolean).forEach(eyeColor => {
              fieldSet["Color of Eyes"].add(eyeColor.charAt(0).toUpperCase() + eyeColor.slice(1));
          });
          fieldSet["Longevity (yrs)"].add(dogBreed.longevity);
          dogBreed.characterTraits.split(/[ ,&]+/).filter(Boolean).forEach(trait => {
              fieldSet["Character Traits"].add(trait.charAt(0).toUpperCase() + trait.slice(1));
          });
          dogBreed.commonHealthProblems.split(/[ ,&]+/).filter(Boolean).forEach(healthProblem => {
              fieldSet["Common Health Problems"].add(healthProblem.charAt(0).toUpperCase() + healthProblem.slice(1));
          });
      });
      // console.log("populateSearchValues", fieldSet)
      setFields(fieldSet);
    }
    fetchData();
  }, []);

  // For a dog record, and the current filter criteria
  const applyFilter = (record, criteria) => {
    // console.log("Doggo Record", record, criteria)
    let result = true;
    for (let i = 0; i < criteria.length; i++) {
        let { column, value, operator } = criteria[i];
        let columnName = fieldNamesConversion[column];
        
        // Convert FilterString to CamelCase (capitalization and spacing format for our doggoData / DB)
        let recordValue = record[columnName]
        // console.log("Comparison: Column, Value, Operator", column, value, operator)
        
        // Columns that may have multiple values to compare to
        if (columnName === "furColor" || 
              columnName === "eyeColor" || 
              columnName === "characterTraits" || 
              columnName === "commonHealthProblems") 
          {
            // Split String into Array and cleanup for includes() comparison
            let dogTraits = record[columnName].split(/[ ,]+/).filter(Boolean).map(trait => {
              return trait.charAt(0).toUpperCase() + trait.slice(1);
            });;
            // console.log("Multiple check: dogTraits", dogTraits, value)
            
            const enumMatch = (dogTraits.includes(value));
            if (operator === "OR") {
              result = result || enumMatch;
            } else {
              result = result && enumMatch;
            }
      } else {
        // Columns that can be 1 to 1 Filtering
        let match = (recordValue === value);
        if (operator === "OR") {
          result = result || match;
        } else {
          result = result && match;
        }
      }
    }
    return result;
  }

  // Primary Search Function. Against all dogs. Helper function: applyFilter
  const searchDogs = (searchFilter) => {
    console.log("searchDogs", searchFilter)
    let filteredData = doggoData;
    console.log("App: filterArray", searchFilter, filteredData)

    if (searchFilter && searchFilter.length) {
      filteredData = doggoData.filter(record => applyFilter(record, searchFilter));
    }
    setSearchResults(filteredData);
  };

  return (
    <Container fluid>
      <div className="app">
        <Header/>
        <Row>
          <Col xs={3} className="filterForm">
            <FilterForm enumFields={enumFields} runSearch={searchDogs} />
          </Col>
          <Col xs={9} className="kendo-grid">
            <DogBreedCompactTable nodes={searchResults} />
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default App;
