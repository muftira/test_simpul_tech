import React from "react";
import { useRef, useState, useEffect } from "react";

//components
import ChatLeft from "./chatLeft";
import ChatRight from "./chatRight";
import LoadingChat from "./loadingChat";
import { fetchData } from "../../utils/fetch";

export default function chatRoom(props) {
  const { setInboxPage, setExpandMenu, setSelectMenu, room } = props;
  const [showNewMessage, setShowNewMessage] = useState(true);
  const [loading, setLoading] = useState(true);
  const [listChats, setListChats] = useState();
  const scrollRef = useRef(null);

  const scrollToPosition = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const loadChat = async () => {
    const response = await fetchData("GET", `chats?roomId=${room.id}`);
    if (response.success) {
      setLoading(false);
      setListChats(response.data.data);
    }
  };

  useEffect(() => {
    loadChat();
  }, []);

  return (
    <div className="container-base d-flex flex-column">
      <div
        className="d-flex align-content-center "
        style={{
          width: "100%",
          minHeight: "80px",
          borderBottom: "1px solid #828282",
          padding: "24px 32px 24px 32px",
        }}
      >
        <img
          style={{ cursor: "pointer" }}
          width="24px"
          src="/left_arrow.svg"
          onClick={() => setInboxPage(1)}
        />
        <div className="h-100 d-flex flex-column justify-content-center ms-3">
          <p
            className="font-size-16 font-weight-600 mb-0"
            style={{ color: "#2F80ED", width: '610px' }}
          >
            {room.name}
          </p>
          <p className="font-size-12 mb-0">{room.name === "FastVisa Support" ? "" : `${room.participants} Participants`}</p>
        </div>
        <div
          className="position-absolute"
          style={{ right: "32px", cursor: "pointer" }}
          onClick={() => {
            setExpandMenu(true), setSelectMenu("");
          }}
        >
          <img src="close.svg" />
        </div>
      </div>
      <div
        ref={scrollRef}
        style={{
          height: "calc(737px - 160px)",
          overflowY: "scroll",
          padding: "24px 32px 24px 32px",
        }}
      >
        {showNewMessage && (
          <div
            className="position-absolute d-flex"
            style={{
              width: "142px",
              height: "40px",
              color: "#E9F3FF",
              borderRadius: "5px",
              backgroundColor: "#E9F3FF",
              top: "84%",
              left: "37%",
              cursor: "pointer",
            }}
            onClick={() => {
              scrollToPosition(), setShowNewMessage(false);
            }}
          >
            <p
              className="font-size-16 font-weight-600 mb-0 ms-2"
              style={{ color: "#2F80ED", alignSelf: "center" }}
            >
              New Message
            </p>
          </div>
        )}

        {loading && <LoadingChat type="spin" color="#2F80ED" />}
        {listChats &&
          listChats.map((item, index) => {
            const { id, userName, message, date, read, color } = item;
            return (
              <>
                {userName === "You" ? (
                  <ChatRight
                    id={id}
                    message={message}
                    userName={userName}
                    date={date}
                    read={read}
                    color={color}
                  />
                ) : (
                  <ChatLeft
                    id={id}
                    message={message}
                    userName={userName}
                    date={date}
                    read={read}
                    color={color}
                  />
                )}
              </>
            );
          })}
      </div>
      <div
        className="d-flex w-100 justify-content-between "
        style={{
          width: "100%",
          height: "80px",
          padding: "10px 32px 24px 32px",
        }}
      >
        <input type="text" id="typeMessage" placeholder="Type a new message" />
        <img
          style={{ width: "76px", height: "40px", cursor: "pointer" }}
          src="/send.svg"
        />
      </div>
    </div>
  );
}
