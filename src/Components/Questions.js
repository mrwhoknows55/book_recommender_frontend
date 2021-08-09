import React from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import "../CSS/Questions.css";
export const Questions = () => {
  const options = [
    { label: "Adventure", value: 1 },
    { label: "Fiction", value: 2 },
    { label: "Fiction", value: 3 },
    { label: "Fiction", value: 4 },
    { label: "Fiction", value: 5 },
    { label: "Fiction", value: 6 },
    { label: "Fiction", value: 7 },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 10,
    }),
  };

  return (
    <div className="question">
      <div className="questions">
        <h3 className="que-head">QUESTIONS</h3>
        <p className="que-body">
          1. Which book <strong>GENRE</strong> do you prefer ?
        </p>
        <div className="options">
          <ReactMultiSelectCheckboxes styles={customStyles} options={options} />
        </div>
        <div className="buttons">
          <button className="next">Next</button>
          <button className="skip">Skip</button>
        </div>
      </div>
    </div>
  );
};
