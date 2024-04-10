import React from "react";
import Information from "examples/Icons/Information";
import Modal from "./Modal";

function Stats({ key, classType, classification, width, height, area, confidence }) {
  // Convert the decimal to a percentage using Intl.NumberFormat
  function createNumberFormatter(style) {
    return new Intl.NumberFormat("en-US", {
      style: style,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Example usage:
  const decimalFormatter = createNumberFormatter("decimal");
  const percentFormatter = createNumberFormatter("percent");

  const confidencePercentage = percentFormatter.format(confidence);

  // Function to handle image selection
  const confidence_indicator = (confidence) => {
    if (parseFloat(confidence) < 75) {
      return "text-[#DC3545]";
    } else if (parseFloat(confidence) < 80) {
      return "text-colorISMyellow";
    } else {
      return "text-themeGreen4";
    }
  };

  //open icon stats
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div key={key} className="bg-[#f8f9fa] w-full rounded-md shadow-md p-3 flex-col my-3">
        <span className="font-themeHeader">{classType} Measurements</span>
        <br />
        <span className="font-themeHeader">
          Category: <b className="text-themeGreen4">{classification}</b>
        </span>
        <div className="ml-5 w-full">
          <span className="text-black font-themeContent">
            Width&ensp;: <b>{decimalFormatter.format(width)} px</b>
            <br />
            Height : <b>{decimalFormatter.format(height)} px</b>
            <br />
            Area &ensp; : <b>{decimalFormatter.format(area)} px</b>
            <br />
            Confidence&ensp;:{" "}
            <b className={confidence_indicator(confidencePercentage)}>{confidencePercentage}</b>
          </span>
          {/* Detection Rate */}
          <div className="mt-1"></div>
        </div>
      </div>
    </>
  );
}

export default Stats;
