import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <div
    className="d-flex align-items-center ps-3 position-absolute"
    style={{
      width: "670px",
      height: "54.41px",
      backgroundColor: "#E9F3FF",
      borderRadius: "5px",
      top: "82%",
      left: "4%",
    }}
  >
    <ReactLoading type={type} color={color} height={34.41} width={34.41} />
    <p className="font-size-12 font-weight-600 mt-3 ms-3">
      Please wait while we connect you with one of our team ...
    </p>
  </div>
);

export default Loading;
