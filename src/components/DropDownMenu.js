import React, { useState } from 'react';
import Select from 'react-select';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames';

const DropDownMenu = ({ menuId, categories, enumFields, addFilterObject, addDropDownMenu, removeDropDownMenu, removeLastFilter}) => {
  // console.log("DropDownMenu categories", categories)
  // console.log("DropDownMenu enumFields", enumFields)
    const [category, setCategory] = useState('');
    const [categoryValues, setCategoryValues] = useState([]);
    const [selectedCategoryValue, setSelectedCategoryValue] = useState('');
    // const [filterObject, setFilterObject] = useState();
    const [searchOperator, setSearchOperator] = useState('AND');

    const customStyles = {
      menu: provided => ({
        ...provided,
        backgroundColor: '#fff',
      }),
    };

    /*
    * Functions to Handle FilterForm Inputs
    */
    const handleColumnSelect = (opt) => {
      if (!opt) {
        console.log("handleColumnSelect: Cleared")
        // Clear Dependencies
        setCategory();
        setCategoryValues([]);
        setSelectedCategoryValue('');
        return;
      }
      let value = opt.value;
      setCategory(value)
      console.log("handleColumnSelect", category)
        // console.log("value", value)
        
        // Set Category Values for 2nd Drop Down
        // console.log("categoryValues", typeof enumFields[value], enumFields[value])
        // Check if null, esp after a clear
        let tempCategoryValuesArray = [];
        enumFields[value].forEach(key => {
            tempCategoryValuesArray.push({ label: key, value: key })
          });
          // categoryValues = categoryValues.sort((a, b) => b.label- a.label);
          tempCategoryValuesArray.sort((a, b) => a.label.localeCompare(b.label));
          // console.log("categoryValues", typeof categoryValues, categoryValues)
          setCategoryValues(tempCategoryValuesArray)
    };

    const handleColumnValueSelect = (opt) => {
      // If a value is deselected, add FilterObject and push in FilterForm
      if (!opt) {
        console.log("handleColumnValueSelect: Cleared")
        setSelectedCategoryValue('');
        removeLastFilter()
        console.log("Cleared Filter")
        // console.log("handleColumnValueSelect", selectedCategoryValue)
        return;
      }
      let value = opt.value;
      setSelectedCategoryValue(value)
      // console.log("handleColumnValueSelect", value, selectedCategoryValue)
      
      // WIP to optimize potentially reduce buttons and workflow: 
      // Once a value is selected, add FilterObject and push in FilterForm
      
      // confirmFilterObject()
      // if (!category || !value) {
      //   console.log("Dropdown Add Rule: confirmFilterObject is Incomplete", category, value, searchOperator)
      //   return;
      // }
      // let filterObject = {
      //   column: category,
      //   value: value,
      //   operator: searchOperator ? searchOperator : "AND", // AND or OR; default
      //   // nested:
      // };
      // console.log("Dropdown Add Rule: confirmFilterObject", filterObject)
      // // Pass back to parent state
      // addFilterObject(filterObject)
    };


    const handleOperatorChange = (e) => {
      console.log("handleOperatorChange", e)
      // setSearchOperator(e.target.value);
      setSearchOperator(e);
    };

    const confirmFilterObject = () => {
      // console.log("confirmFilterObject Kicked off", )
      if (!category || !selectedCategoryValue) {
        console.log("Dropdown Add Rule: confirmFilterObject is Incomplete", category, selectedCategoryValue, searchOperator)
        return;
      }
      let filterObject = {
        column: category,
        value: selectedCategoryValue,
        operator: searchOperator ? searchOperator : "AND", // AND or OR; default
        // nested:
      };
      console.log("Dropdown Add Rule: confirmFilterObject", filterObject)
      // Pass back to parent state
      addFilterObject(filterObject)
    }

    const clearFilterState = () => {
      setCategory();
      setCategoryValues([]);
      setSelectedCategoryValue('');
      handleColumnSelect(null)
      handleColumnValueSelect(null)
      removeLastFilter();
      // console.log(category, selectedCategoryValue, filterObject)
    }

    return (
      <Container style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '10px'
      }}>
        <Row>
          <Col xs={12} style={{ marginBottom: 10 }}>
            <Select
              options={categories}
              onChange={opt => handleColumnSelect(opt)}
              styles={customStyles}
              isClearable="true"
            />
          </Col>
          <Col xs={12} style={{ marginBottom: 10 }}>
            <Select
              options={categoryValues}
              onChange={opt => handleColumnValueSelect(opt)}
              styles={customStyles}
              isClearable="true"
            />
          </Col>
          <Col xs={12} style={{ marginBottom: 10 }}>
            <Button 
              variant="info" 
              type="button" 
              className={classNames('other-menu-buttons', searchOperator === "AND" ? "selected" : "")} 
              onClick={() => handleOperatorChange("AND")}
              style={{ marginRight: '5px' }}
              >
              AND
          </Button>
          <Button 
              variant="info" 
              type="button" 
              className={classNames('other-menu-buttons', searchOperator === "OR" ? "selected" : "")} 
              onClick={() => handleOperatorChange("OR")}>
              OR
          </Button>
          </Col>
          <hr className="my-2" style={{ width: "100%" }}/>
          <Col xs={12} style={{ marginBottom: 5, marginRight: 5 }}>
          <Button variant="primary" type="button" className="other-menu-buttons" onClick={confirmFilterObject}>
              Confirm Rule
          </Button>
          </Col>
          <Col xs={12} style={{ marginBottom: 5, marginRight: 5 }}>
          <Button variant="primary" type="button" className="other-menu-buttons" onClick={clearFilterState} style={{ marginBottom: 10 }}>
              Unconfirm / Clear Rule
          </Button>
          </Col>
          <hr className="my-2" style={{ width: "100%" }}/>
          <Col xs={12} style={{ marginBottom: 5, marginRight: 5 }}>
          <Button variant="primary" type="button" className="other-menu-buttons" onClick={addDropDownMenu}>
              Add New Rule
          </Button>
          </Col>
          <Col xs={12} style={{ marginBottom: 5, marginRight: 5 }}>
          <Button variant="primary" type="button" className="other-menu-buttons" onClick={removeDropDownMenu}>
              Delete Rule
          </Button>
          </Col>
        </Row>
      </Container>
  )
};
 
export default DropDownMenu;