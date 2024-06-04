import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetch";

//components
import Loading from "./loading";

export default function listChat(porps) {
  const { setInboxPage, setRoom } = porps;
  const [loading, setLoading] = useState(true);
  const [listRooms, setListRooms] = useState(true);
  const [words, setWords] = useState("");

  const loadRooms = async () => {
    const response = await fetchData("GET", "rooms");
    if (response.success) {
      setLoading(false);
      setListRooms(response.data.data);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleSearch = async (value, key, press) => {
    if (value) {
      const response = await fetchData("GET", "rooms");
      const data = response.data.data.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      setListRooms(data);
    } else {
      loadRooms();
    }
  };

  const handleUpdate = async (id, name, participants, data) => {
    const response = await fetchData("PATCH", `rooms/${id}`, data);
    if (response.success) {
      setRoom({
        id,
        name,
        participants,
      });
      setInboxPage(2);
    }
  };

  return (
    <div className="container-inbox">
      <input
        type="text"
        id="inboxSearch"
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e.target.value, "input"), setWords(e.target.value);
        }}
      />
      {loading ? (
        <Loading type="spin" color="#C4C4C4" />
      ) : (
        listRooms &&
        listRooms.map((item) => {
          const {
            id,
            picture,
            name,
            date,
            userName,
            lastChat,
            read,
            participants,
          } = item;
          return (
            <div
              className="w-100 d-flex flex-row position-relative "
              style={{
                borderBottom: "1px solid #828282",
                padding: "22px 0px 22px 0px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleUpdate(id, name, participants, { read: true })
              }
            >
              {!read && (
                <div
                  className="position-absolute"
                  style={{ right: "0px", bottom: "30px" }}
                >
                  <img src="icon_new_message.svg" />
                </div>
              )}
              <div
                className="text-center"
                style={{ marginRight: "22px", width: "50px" }}
              >
                <img
                  src={picture === 2 ? "icon_visa.svg" : "/profile_picture.svg"}
                />
              </div>
              <div>
                <div className="d-flex flex-row">
                  <p
                    className="mb-0 font-size-16 font-weight-600"
                    style={{ color: "#2F80ED", maxWidth: "460px" }}
                  >
                    {name}
                  </p>
                  <p
                    className="font-size-12 mb-0"
                    style={{ marginLeft: "22px", marginTop: "5px" }}
                  >
                    {date}
                  </p>
                </div>
                <div>
                  <p className="mb-0 font-size-14 font-weight-600">
                    {picture === 2 ? "" : `${userName} :`}
                  </p>
                  <p className="font-size-12 mb-0">{lastChat}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
