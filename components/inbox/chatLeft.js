import { useState } from "react";

export default function chatLeft() {
  const [showOption, setShowOption] = useState(false);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div className="d-flex flex-column">
        <p
          className="font-size-12 font-weight-600 mb-0"
          style={{ color: "#E5A443" }}
        >
          Marry Hilda
        </p>
        <div className="d-flex flex-row justify-content-start">
          <div
            className="d-flex flex-column align-items-start p-2"
            style={{
              maxWidth: "518px",
              minHeight: "53.5px",
              backgroundColor: "#FCEED3",
              borderRadius: "5px",
            }}
          >
            <p style={{ marginBottom: "5px" }}>
              Just Fill me in for his updates yea?
            </p>
            <p className="mb-0">19:32</p>
          </div>
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
                  height: "40px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #BDBDBD",
                  borderRadius: "5px",
                }}
              >
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
                marginLeft: "5px",
                cursor: "pointer",
              }}
              src="/dots.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
