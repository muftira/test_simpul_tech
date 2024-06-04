import { useState } from "react";

export default function chatRight(props) {
  const {
    id,
    userName,
    message,
    date,
    read,
    color,
    handleDeleteChat,
    index,
    handleEditChat,
    room
  } = props;
  const [showOption, setShowOption] = useState(false);
  const [editText, setEditText] = useState(false);

  return (
    <div style={{ marginBottom: "10px" }}>
      {!read && <img src="notif_new_message.svg" />}
      <div className="d-flex flex-column">
        <p
          className="font-base font-weight-600 mb-0 text-end"
          style={{ color: "#9B51E0" }}
        >
          {userName}
        </p>
        <div className="d-flex flex-row justify-content-end">
          <div
            className="position-relative"
            onMouseEnter={() => setShowOption(true)}
            onMouseLeave={() => setShowOption(false)}
          >
            {showOption && (
              <div
                className="d-flex flex-column justify-content-center align-items-center mt-3 position-absolute z-3"
                style={{
                  width: "126px",
                  height: "80px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #BDBDBD",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="font-base w-100 h-100"
                  style={{
                    color: "#2F80ED",
                    borderBottom: "1px solid #BDBDBD",
                    cursor: "pointer",
                    padding: "10px 0px 0px 20px",
                  }}
                  onClick={() => setEditText(true)}
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
                  onClick={() => handleDeleteChat(id, room, index)}
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
            className="d-flex flex-column align-items-start p-2 position-relative"
            style={{
              maxWidth: "518px",
              minWidth: "127.85px",
              minHeight: "53.5px",
              backgroundColor: "#EEDCFF",
              borderRadius: "5px",
            }}
          >
            {editText ? (
              <>
                <textarea
                  style={{
                    width: "500px",
                    minWidth: "127.85px",
                    minHeight: "53.5px",
                  }}
                  value={message}
                  onChange={(e) =>
                    handleEditChat(id, e.target.value, room, index)
                  }
                />
                <img
                  className="position-absolute"
                  style={{ marginTop: "5px", bottom: "5px", right: "10px", cursor: 'pointer' }}
                  src="edit_pen_blue.svg"
                  onClick={() => setEditText(false)}
                />
              </>
            ) : (
              <p className="font-base" style={{ marginBottom: "5px" }}>
                {message}
              </p>
            )}

            <p className="mb-0 font-size-12">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
