import React, { useState, useEffect, useCallback } from 'react';
import DropDownMenu from './DropDownMenu';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Row, Button } from 'react-bootstrap';

function FilterForm({ enumFields, runSearch }) {
  // console.log("FilterForm enumFields", typeof enumFields, enumFields)
  const [categories, setCategories] = useState(''); // Prep Categories
  const [currentFilterArray, setFilterArray] = useState([]); // Prep Categories

    
  // Initialize Category Values so that User Can Select from an enumerated list from the DropDownMenu
  useEffect(() => {
    let categoryValues = []
    for (let key in enumFields) {
      categoryValues.push({ label: key, value: key })
    }
    categoryValues.sort((a, b) => a.label.localeCompare(b.label));
    setCategories(categoryValues)
  }, [enumFields]);

  /*
  * Functions to manipulate filter object
  */
  const addFilterObject = useCallback((newFilterObject) => {
    // console.log("FilterForm: addFilterObject's currentFilterArray", typeof currentFilterArray, currentFilterArray)
    currentFilterArray.push(newFilterObject)
    setFilterArray(currentFilterArray)
    // console.log("FilterForm: addFilterObject", currentFilterArray)
  }, [currentFilterArray, setFilterArray])

  // Added here instead of up above due to function Initialization
  const [dropdownMenus, setDropdownMenus] = useState([
    <DropDownMenu categories={categories} enumFields={enumFields} addFilterObject={addFilterObject} />
  ]);

  const submitFilterArray = () => {
    runSearch(currentFilterArray)
    console.log("FilterForm: submitFilterArray", currentFilterArray)
  }

  const removeLastFilter = useCallback(() => {
    let filterArray = currentFilterArray
    // let removedFilter = filterArray.pop()
    filterArray.pop()
    setFilterArray(filterArray)
    console.log("FilterForm: removeLastFilter", currentFilterArray)
  }, [currentFilterArray])

  const resetFilterArray = () => {
    setFilterArray([])
    runSearch()
    // console.log("FilterForm: resetFilterArray & reset search")
  }

  /*
  * Functions to manipulate dropdown menu
  */
  const addDropDownMenu = useCallback(() => {
    setDropdownMenus((prevDropdownMenus) => [
      ...prevDropdownMenus,
      <DropDownMenu
        key={prevDropdownMenus.length}
        categories={categories}
        enumFields={enumFields}
        addFilterObject={addFilterObject}
        addDropDownMenu={addDropDownMenu}
        removeDropDownMenu={removeDropDownMenu}
        removeLastFilter={removeLastFilter}
      />,
    ]);
  }, [categories, enumFields, addFilterObject, removeLastFilter]);

  const removeDropDownMenu = (removedMenuId) => {
    setDropdownMenus((prevDropdownMenus) =>
      prevDropdownMenus.filter((menu) => menu.key !== removedMenuId)
    );
    // console.log("removeDropDownMenu", removedMenuId)
  }

  return (
    <Container fluid>
      <div className="filter-form" >
        <Row>
        <div className="d-grid justify-content-center mb-2">
          <Button variant="primary" size='lg' type="submit" className="search-button" onClick={submitFilterArray} style={{ marginBottom: 10, width: "100%" }}>
              Search
          </Button>
          <Button variant="primary" size='lg' type="submit" className="search-button" onClick={resetFilterArray} style={{ marginBottom: 10, width: "100%" }}>
              Reset
          </Button>
        </div>
        </Row>
      <Form>
        <Form.Group controlId="formFilterOptions" className="filter-options">
        {dropdownMenus.map((menu, index) => (
          <DropDownMenu
            key={index}
            categories={categories} 
            enumFields={enumFields} 
            addFilterObject={addFilterObject}
            addDropDownMenu={addDropDownMenu}
            removeDropDownMenu={removeDropDownMenu}
            removeLastFilter={removeLastFilter}
            >
          </DropDownMenu>
        ))}
        </Form.Group>
      </Form>
    </div>
  </Container>

  );
};

export default FilterForm;