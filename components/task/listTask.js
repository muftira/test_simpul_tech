import { useState } from "react";

export default function listTask() {
  const [expand, setExpand] = useState(true);
  const [showOption, setShowOption] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #828282",
        padding: "22px 0px 22px 0px",
        cursor: "pointer",
      }}
    >
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row">
          <input id="checkboxTask" type="checkbox" />
          <p className="mb-0 font-size-12 font-weight-600 ms-3" style={{ textDecoration: 'none' }}>
            Cross-reference with Jeanne for Case #192813
          </p>
        </div>
        <div className="d-flex flex-row me-3">
          <p className="mb-0 font-size-12" style={{ color: "#EB5757" }}>
            2 Days Left
          </p>
          <p className="mb-0 font-size-12 ms-3">12/06/2021</p>
          <img
            className="ms-3"
            src={expand ? "/arrow_up.svg" : "/arrow_down.svg"}
            onClick={() => setExpand(!expand)}
          />
          <div onMouseEnter={() => setShowOption(true)} onMouseLeave={() => setShowOption(false)} >
            <img className="ms-3" src="/dots.svg" />
            {showOption && (
              <div
                className="d-flex flex-column justify-content-center align-items-center mt-2 position-absolute"
                style={{
                  width: "126px",
                  height: "40px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #BDBDBD",
                  borderRadius: "5px",
                  right: "40px",
                  top: "100px",
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
          </div>
        </div>
      </div>
      {expand && (
        <>
          <div className="d-flex flex-row mt-2">
            <img style={{ marginLeft: "32px" }} src="date_picker_blue.svg" />
            <input style={{width: '193px', borderRadius: '5px', border: '1px solid #BDBDBD', padding: '5px 15px'}} className="ms-4 " type="date" placeholder="Set Date" />
          </div>
          <div className="d-flex flex-row mt-2">
            <img
              style={{ marginLeft: "32px", alignSelf: "self-start", marginTop: "3px" }}
              src="edit_pen_black.svg"
            />
            <p
              className="font-size-12 mb-0"
              style={{ marginLeft: "30px", maxWidth: "543px" }}
            >
              No Description
            </p>
          </div>
        </>
      )}
    </div>
  );
}
