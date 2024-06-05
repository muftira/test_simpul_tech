import React from "react";
import { useRef, useState, useEffect } from "react";
import { fetchData } from "../../utils/fetch";

//components
import ChatLeft from "./chatLeft";
import ChatRight from "./chatRight";
import LoadingChat from "./loadingChat";

export default function chatRoom(props) {
  const { setInboxPage, setExpandMenu, setSelectMenu, room } = props;
  const [showNewMessage, setShowNewMessage] = useState(true);
  const [loading, setLoading] = useState(true);
  const [listChats, setListChats] = useState();
  const [inputText, setInputText] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [replyText, setReplyText] = useState({ userName: "", message: "" });
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
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const loadChat = async () => {
    const response = await fetchData("GET", `chats?roomId=${room.id}`);
    if (response.success) {
      const data = response.data.data.map((item) => {
        return { read: item.read };
      });
      const read = data && data.every((item) => item.read == true);
      // setLoading(false);
      setListChats(response.data.data);
      setShowNewMessage(!read);
    }
  };

  useEffect(() => {
    loadChat();
  }, []);

  const handleSendChat = async (value) => {
    if (inputText.length > 0) {
      const data = {
        roomId: room.id,
        userName: "You",
        message: inputText,
        date: "19:32",
        read: true,
        color: "",
        reply: value?.message ? value.message : "",
      };

      const chats = listChats.find((item) => item.read == false);

      if (chats) {
        const update = await fetchData("PATCH", `chats/${chats.id}`, {
          read: !chats.read,
        });
      }

      const response = await fetchData("POST", "chats", data);
      if (response.success) {
        const response = await fetchData("PATCH", `rooms/${room.id}`, {
          userName: "You",
          lastChat: inputText,
        });
        setIsReply(false);
        loadChat();
        setInputText("");
      }
    }
  };

  const handleDeleteChat = async (id, room, index) => {
    const response = await fetchData("DELETE", `chats/${id}`);
    if (response.success) {
      if (index + 1 === listChats.length) {
        const data = listChats[index - 1];
        const response = await fetchData("PATCH", `rooms/${room.id}`, {
          userName: data.userName,
          lastChat: data.message,
        });
        loadChat();
      } else {
        const data = listChats[listChats.length - 1];
        const response = await fetchData("PATCH", `rooms/${room.id}`, {
          userName: data.userName,
          lastChat: data.message,
        });
        loadChat();
      }
    }
  };

  const handleUpdateChat = async () => {
    const chats = listChats.find((item) => item.read == false);

    if (chats) {
      const update = await fetchData("PATCH", `chats/${chats.id}`, {
        read: !chats.read,
      });
    }
  };

  const handleEditChat = async (id, value, room, index) => {
    const response = await fetchData("PATCH", `chats/${id}`, {
      message: value,
    });
    if (response.success) {
      if (index + 1 === listChats.length) {
        const response = await fetchData("PATCH", `rooms/${room.id}`, {
          lastChat: value,
        });
        loadChat();
      } else {
        const data = listChats[listChats.length - 1];
        const response = await fetchData("PATCH", `rooms/${room.id}`, {
          userName: data.userName,
          lastChat: data.message,
        });
        loadChat();
      }
    }
  };

  useEffect(() => {
    scrollToPosition();
  }, [listChats?.length]);

  const handleScroll = async () => {
    const response = await fetchData("GET", `chats?roomId=${room.id}`);
    const data = response.data.data.map((item) => {
      return { read: item.read };
    });
    const read = data && data.every((item) => item.read == true);
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setShowNewMessage(false);
    } else {
      read ? setShowNewMessage(false) : setShowNewMessage(true);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
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
          onClick={() => {
            handleUpdateChat(), setInboxPage(1);
          }}
        />
        <div className="h-100 d-flex flex-column justify-content-center ms-3">
          <p
            className="font-size-16 font-weight-600 mb-0"
            style={{ color: "#2F80ED", width: "610px" }}
          >
            {room.name}
          </p>
          <p className="font-size-12 mb-0">
            {room.name === "FastVisa Support"
              ? ""
              : `${room.participants} Participants`}
          </p>
        </div>
        <div
          className="position-absolute"
          style={{ right: "32px", cursor: "pointer" }}
          onClick={() => {
            setExpandMenu(true), setSelectMenu(""), handleUpdateChat();
          }}
        >
          <img src="close.svg" />
        </div>
      </div>
      <div
        ref={scrollRef}
        style={{
          height: "calc(100vh - 160px)",
          overflowY: "scroll",
          padding: "24px 32px 24px 32px",
        }}
      >
        {showNewMessage && (
          <div
            className="position-absolute d-flex z-1"
            style={{
              width: "142px",
              height: "40px",
              color: "#E9F3FF",
              borderRadius: "5px",
              backgroundColor: "#E9F3FF",
              top: "78.5%",
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

        {room.name === "FastVisa Support" && loading ? (
          <LoadingChat type="spin" color="#2F80ED" />
        ) : (
          ""
        )}
        {listChats &&
          listChats.map((item, index) => {
            const { id, userName, message, date, read, color, reply } = item;
            return (
              <div key={id}>
                {userName === "You" ? (
                  <ChatRight
                    id={id}
                    message={message}
                    userName={userName}
                    date={date}
                    read={read}
                    color={color}
                    handleDeleteChat={handleDeleteChat}
                    index={index}
                    handleEditChat={handleEditChat}
                    room={room}
                    reply={reply}
                  />
                ) : (
                  <ChatLeft
                    id={id}
                    message={message}
                    userName={userName}
                    date={date}
                    read={read}
                    color={color}
                    index={index}
                    room={room}
                    setIsReply={setIsReply}
                    setReplyText={setReplyText}
                  />
                )}
              </div>
            );
          })}
      </div>
      <div className="position-relative">
        {isReply && (
          <div
            className="d-flex flex-column position-absolute z-3"
            style={{
              width: "580px",
              padding: "5px 15px",
              backgroundColor: "#F2F2F2",
              border: "1px solid #4F4F4F",
              borderRadius: "5px 5px 0px 0px",
              bottom: "66px",
              left: "32px",
            }}
          >
            <div className="d-flex justify-content-between">
              <p
                className=" font-base font-weight-600 mb-0"
                style={{ color: "#4F4F4F" }}
              >{`Replying to ${replyText.userName}`}</p>
              <img
                style={{
                  height: "12px",
                  alignSelf: "center",
                  cursor: "pointer",
                }}
                src="close.svg"
                onClick={() => [
                  setIsReply(false),
                  setReplyText({ userName: "", message: "" }),
                ]}
              />
            </div>
            <p className="font-base mb-0">{replyText.message}</p>
          </div>
        )}

        <div
          className="d-flex w-100 justify-content-between "
          style={{
            width: "100%",
            height: "80px",
            padding: "10px 32px 24px 32px",
          }}
        >
          <input
            type="text"
            id="typeMessage"
            placeholder="Type a new message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <img
            style={{ width: "76px", height: "40px", cursor: "pointer" }}
            src="/send.svg"
            onClick={() => handleSendChat(replyText)}
          />
        </div>
      </div>
    </div>
  );
}
