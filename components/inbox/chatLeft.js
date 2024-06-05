import { useState } from "react";

export default function chatLeft(props) {
  const {
    id,
    userName,
    message,
    date,
    read,
    color,
    index,
    room,
    setIsReply,
    setReplyText,
  } = props;
  const [showOption, setShowOption] = useState(false);
  return (
    <div style={{ marginBottom: "10px" }}>
      {index === 2 && <img src="icon_date.svg" />}
      {!read && <img src="notif_new_message.svg" />}
      <div className="d-flex flex-column">
        <p
          className="font-base font-weight-600 mb-0"
          style={{
            color:
              color === 1 ? "#E5A443" : color === 2 ? "#43B78D" : "#2F80ED",
          }}
        >
          {userName}
        </p>
        <div className="d-flex flex-row justify-content-start">
          <div
            className="d-flex flex-column align-items-start p-2"
            style={{
              maxWidth: "518px",
              minWidth: "127.85px",
              minHeight: "53.5px",
              backgroundColor:
                color === 1 ? "#FCEED3" : color === 2 ? "#D2F2EA" : "#F8F8F8",
              borderRadius: "5px",
            }}
          >
            <p className="font-base" style={{ marginBottom: "5px" }}>
              {message}
            </p>
            <p className="mb-0 font-size-12">{date}</p>
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
                    cursor: "pointer",
                    borderBottom: "1px solid #BDBDBD",
                    padding: "5px 0px 0px 20px",
                  }}
                >
                  Share
                </div>
                <div
                  className="font-base w-100 h-100"
                  style={{
                    color: "#2F80ED",
                    cursor: "pointer",
                    padding: "5px 0px 0px 20px",
                  }}
                  onClick={() => {
                    setIsReply(true), setReplyText({userName, message}, setShowOption(false));
                  }}
                >
                  Reply
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
