import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import { useHistory } from "react-router-dom";
import "../CSS/Questions.css";
import swal from "sweetalert";
export const Questions = () => {
  const history = useHistory();

  const [options, setOptions] = useState([
    { label: "Art", value: "1" },
    { label: "Biography", value: "1" },
    { label: "Comics", value: "1" },
    { label: "Fiction", value: "1" },
    { label: "History", value: "1" },
    { label: "Nonfiction", value: "1" },
    { label: "Philosophy", value: "1" },
    { label: "Psychology", value: "1" },
    { label: "Science", value: "1" },
    { label: "Business", value: "1" },
    { label: "Christian", value: "1" },
    { label: "Classics", value: "1" },
    { label: "Contemporary", value: "1" },
    { label: "Memoir", value: "1" },
    { label: "Music", value: "1" },
    { label: "Spirituality", value: "1" },
    { label: "Travel", value: "1" },
    { label: "Religion", value: "1" },
    { label: "Ebooks", value: "1" },
    { label: "Horror", value: "1" },
    { label: "Mystery", value: "1" },
    { label: "Poetry", value: "1" },
    { label: "Crime", value: "1" },
    { label: "Cookbooks", value: "1" },
    { label: "Suspense", value: "1" },
    { label: "Thriller", value: "1" },
    { label: "Sports", value: "1" },
    { label: "Manga", value: "1" },
  ]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [defaultValues, setDefaultValues] = useState([]);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
  };
  const onRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
  };

  return (
    <div className="question">
      <div className="questions">
        <h3 className="que-head">QUESTIONS</h3>
        <p className="que-body">
          1. Which book <strong>GENRE</strong> do you prefer ?
        </p>

        <div className="options">
          <Multiselect
            options={options} // Options to display in the dropdown
            selectedValues={defaultValues} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="label" // Property name to display in the dropdown options
            style={{
              multiselectContainer: {
                // To change css for multiselect (Width,height,etc..)
              },
              searchBox: {
                // To change search box element look
                border: " 1px solid #C8D8EA",
                fontSize: "10px",
                minHeight: "50px",
              },
              inputField: {
                // To change input field position or margin
                margin: "5px",
                padding: "15px",
                background: "rgba(99, 115, 174, 0.4)",
              },
              chips: {
                // To change css chips(Selected options)
                background: "#12232E",
                fontSize: "20px",
                padding: "10px",
              },
              optionContainer: {
                // To change css for option container
                border: "2px solid #c8d8ea",
              },
              option: {
                // To change css for dropdown options
                color: "#12232E",
              },
              groupHeading: {
                // To chanage group heading style
              },
            }}
          />
        </div>
        <div className="buttons">
          <button
            className="next"
            onClick={(e) => {
              console.log(selectedValues);
              if (selectedValues.length !== 0) {
                history.replace("/questions2");
              } else {
                swal("Alert", "Please select a genre", "error");
              }
            }}
          >
            Next
          </button>
          <button
            className="skip"
            onClick={(e) => {
              history.replace("/questions2");
            }}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};
