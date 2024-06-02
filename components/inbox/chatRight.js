import { useState } from "react";

export default function chatRight() {
  const [showOption, setShowOption] = useState(false);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div className="d-flex flex-column">
        <p
          className="font-size-12 font-weight-600 mb-0 text-end"
          style={{ color: "#9B51E0" }}
        >
          You
        </p>
        <div className="d-flex flex-row justify-content-end">
          <div
            className="position-relative"
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
          >
            {showOption && (
              <div
                className="d-flex flex-column justify-content-center align-items-center mt-3 position-absolute"
                style={{
                  width: "126px",
                  height: "80px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #BDBDBD",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="font-size-12 w-100 h-100"
                  style={{
                    color: "#2F80ED",
                    borderBottom: "1px solid #BDBDBD",
                    cursor: "pointer",
                    padding: "10px 0px 0px 20px",
                  }}
                >
                  Edit
                </div>
                <div
                  className="font-base w-100 h-100"
                  style={{
                    color: "#EB5757",
                    cursor: "pointer",
                    padding: "5px 0px 0px 20px",
                  }}
                >
                  Delete
                </div>
              </div>
            )}
            <img
              style={{
                verticalAlign: "text-top",
                marginTop: "-5px",
                marginRight: "5px",
              }}
              src="/dots.svg"
            />
          </div>
          <div
            className="d-flex flex-column align-items-end p-2"
            style={{
              maxWidth: "518px",
              minHeight: "53.5px",
              backgroundColor: "#EEDCFF",
              borderRadius: "5px",
            }}
          >
            <p style={{ marginBottom: "5px" }}>
              No worries. It will be completed ASAP. I’ve asked him yesterday.
            </p>
            <p className="mb-0">19:32</p>
          </div>
        </div>
      </div>
    </div>
  );
}
