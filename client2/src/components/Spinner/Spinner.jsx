import React from "react";
import "./Spinner.css";

const SpinnerPage = () => {
  return (
    <>
      <div className="spinner-border text-info" role="status" id="spinner">
        <span className="sr-only">Test</span>
      </div>
    </>
  );
}

export default SpinnerPage;