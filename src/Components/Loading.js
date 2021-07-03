import React from "react";
import "../CSS/Loading.css"

export default function Loading() {
  return (
    <p className="loader">
      Loading...
      <i className="fas fa-circle-notch fa-spin text-xl text-yellow-400 "></i>
    </p>
  );
}
