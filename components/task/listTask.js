import { useState, useEffect } from "react";
import moment from "moment";

export default function listTask(props) {
  const { item, handleDeleteTask, handleUpdateTask } = props;
  const { id, checked, title, remainingDays, date, description } = item;
  const [expand, setExpand] = useState(!checked);
  const [showOption, setShowOption] = useState(false);
  const [editTilte, setEdittitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const formatDate = (value) => {
    if (date) {
      const _date = moment(value, "YYYY-MM-DD").format("D/MM/YYYY");
      return _date;
    }
    return "";
  };

  useEffect(() => {
    setExpand(!checked);
  }, [checked]);

  const handlePress = (e, value) => {
    if (value === "title") {
      if (e.key === "Enter") {
        setEdittitle(true);
      }
    }
    if (value === "description") {
      if (e.key === "Enter") {
        setEditDescription(true);
      }
    }
  };

  useEffect(() => {
    if (title) setEdittitle(true);
  }, [editTilte]);

  return (
    <div
      style={{
        borderBottom: "1px solid #828282",
        padding: "22px 0px 22px 0px",
      }}
    >
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row">
          <input
            id="checkboxTask"
            type="checkbox"
            checked={checked}
            onChange={(e) => handleUpdateTask(id, { checked: !checked })}
          />
          {title && editTilte ? (
            <p
              className="mb-0 font-size-14 font-weight-600 ms-3"
              style={
                checked
                  ? {
                      textDecoration: "line-through",
                      width: "350px",
                      color: "#828282",
                    }
                  : { textDecoration: "none", width: "350px" }
              }
            >
              {title}
            </p>
          ) : (
            <input
              className="mb-0 font-size-14 ms-3 p-2"
              style={{
                borderRadius: "5px",
                border: "1px solid #BDBDBD",
                width: "350px",
              }}
              placeholder="Type Task Title"
              value={title}
              onChange={(e) => handleUpdateTask(id, { title: e.target.value })}
              onKeyDown={(e) => handlePress(e, "title")}
            />
          )}
        </div>
        <div className="d-flex flex-row me-3 row " style={{ width: "250px" }}>
          <p
            className="mb-0 font-size-14 col-5 p-0 text-center"
            style={{ color: "#EB5757" }}
          >
            {remainingDays}
          </p>
          <p className="mb-0 font-size-14 col-5 p-0 text-center">
            {formatDate(date)}
          </p>
          <img
            className="col p-0 mt-2 me-2"
            src={expand ? "/arrow_up.svg" : "/arrow_down.svg"}
            onClick={() => setExpand(!expand)}
            style={{ height: "10px", alignSelf: "start" }}
          />
          <div
            className="col p-0 position-relative"
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
          >
            <img className="" src="/dots.svg" style={{ height: "20px" }} />
            {showOption && (
              <div
                className="d-flex flex-column justify-content-center align-items-center mt-2 position-absolute"
                style={{
                  width: "126px",
                  height: "40px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #BDBDBD",
                  borderRadius: "5px",
                  right: "0px",
                  top: "15px",
                }}
                onClick={() => handleDeleteTask(id)}
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
            <img
              style={{ marginLeft: "32px"}}
              src={date ? "date_picker_blue.svg" : "date_picker_black.svg"}
            />
            <input
              style={{
                width: "193px",
                borderRadius: "5px",
                border: "1px solid #BDBDBD",
                padding: "5px 15px",
                cursor: "pointer" 
              }}
              className="ms-4 "
              type="date"
              value={date}
              onChange={(e) => handleUpdateTask(id, { date: e.target.value })}
            />
          </div>
          <div className="d-flex flex-row mt-2">
            <img
              style={{
                marginLeft: "32px",
                alignSelf: "self-start",
                marginTop: "3px",
                cursor: "pointer",
              }}
              src={description ? "edit_pen_blue.svg" : "edit_pen_black.svg"}
              onClick={() => setEditDescription(!editDescription)}
            />
            {editDescription ? (
              <textarea
                className="font-size-14"
                style={{ marginLeft: "30px", width: "503px", height: "67px" }}
                onChange={(e) =>
                  handleUpdateTask(id, { description: e.target.value })
                }
              >
                {description ? description : ""}
              </textarea>
            ) : (
              <p
                className="font-size-14 mb-0"
                style={{
                  marginLeft: "30px",
                  width: "503px",
                  cursor: "pointer",
                }}
                onClick={() => setEditDescription(true)}
              >
                {description ? description : "No Description"}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
