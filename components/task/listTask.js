import { useState, useEffect } from "react";
import moment from "moment";

export default function listTask(props) {
  const { item, handleDeleteTask, handleUpdateTask, handleSelectNotes, } = props;
  const {
    id,
    checked,
    title,
    remainingDays,
    date,
    description,
    notes,
  } = item;
  const [expand, setExpand] = useState(!checked);
  const [showOption, setShowOption] = useState(false);
  const [shownotes, setShowNotes] = useState(false);
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

  const listNotes = [
    {
      value: 1,
      label: "Important ASAP",
    },
    {
      value: 2,
      label: "Offline Meeting",
    },
    {
      value: 3,
      label: "Virtual Meeting",
    },
    {
      value: 4,
      label: "ASAP",
    },
    {
      value: 5,
      label: "Client Related",
    },
    {
      value: 6,
      label: "Self Task",
    },
    {
      value: 7,
      label: "Appointments",
    },
    {
      value: 8,
      label: "Court Related",
    },
  ];

  const notesColor = (value) => {
    switch (value) {
      case 1:
        return {
          color: "#E5F1FF",
          label: "Important ASAP",
        };
      case 2:
        return {
          color: "#FDCFA4",
          label: "Offline Meeting",
        };
      case 3:
        return {
          color: "#F9E9C3",
          label: "Virtual Meeting",
        };
      case 4:
        return {
          color: "#AFEBDB",
          label: "ASAP",
        };
      case 5:
        return {
          color: "#CBF1C2",
          label: "Client Related",
        };
      case 6:
        return {
          color: "#CFCEF9",
          label: "Self Task",
        };
      case 7:
        return {
          color: "#F9E0FD",
          label: "Appointments",
        };
      case 8:
        return {
          color: "#9DD0ED",
          label: "Court Related",
        };
      default:
        return;
    }
  };

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
              style={{ marginLeft: "32px" }}
              src={date ? "date_picker_blue.svg" : "date_picker_black.svg"}
            />
            <input
              style={{
                width: "193px",
                borderRadius: "5px",
                border: "1px solid #BDBDBD",
                padding: "5px 15px",
                cursor: "pointer",
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
          <div className="d-flex flex-row mt-2 position-relative">
            <div onClick={() => setShowNotes(!shownotes)}>
              {shownotes && (
                <div
                  className="position-absolute p-3 z-3"
                  style={{
                    width: "277px",
                    height: "323px",
                    borderRadius: "5px",
                    border: "1px solid #4F4F4F",
                    backgroundColor: "#FFFFFF",
                    top: "40px",
                    left: "35px",
                  }}
                  onMouseLeave={() => setShowNotes(false)}
                >
                  {listNotes.map((item) => {
                    const { value, label } = item;
                    return (
                      <div
                        className="d-flex align-content-center ps-3"
                        style={{
                          width: "246px",
                          height: "28px",
                          backgroundColor: notesColor(value).color,
                          borderRadius: "5px",
                          marginBottom: "9px",
                          cursor: "pointer",
                          border: notes.includes(value) ? "1.5px solid #2F80ED" : "0px solid #2F80ED"
                        }}
                        onClick={() => handleSelectNotes(id, value, notes)}
                      >
                        <p
                          className="font-size-14 font-weight-600 mb-0"
                          style={{ alignSelf: "center" }}
                        >
                          {label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              <img
                style={{
                  marginLeft: "32px",
                  alignSelf: "self-start",
                  marginTop: "3px",
                  cursor: "pointer",
                  marginRight: "25px",
                }}
                src={notes.length > 0 ? "notes_blue.svg" : "notes_black.svg"}
              />
            </div>
            {notes.map((item) => (
              <div
                className="d-flex justify-content-center align-content-center me-2"
                style={{
                  width: "122.45px",
                  height: "28.91px",
                  backgroundColor: notesColor(item).color,
                  borderRadius: "5px",
                }}
              >
                <p
                  className="font-size-14 font-weight-600 mb-0"
                  style={{ alignSelf: "center" }}
                >
                  {notesColor(item).label}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
