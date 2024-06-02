import React, { useState } from "react";

//components
import ListChat from "../inbox/listChat";
import ChatRoom from "../inbox/chatRoom";

export default function main(props) {
  const {setExpandMenu, setSelectMenu} = props;
  const [inboxPage, setInboxPage] = useState(1);
  return (
    <>
      {inboxPage === 1 && <ListChat setInboxPage={setInboxPage}  />}
      {inboxPage === 2 && <ChatRoom setInboxPage={setInboxPage} setExpandMenu={setExpandMenu} setSelectMenu={setSelectMenu}/>}
    </>
  );
}
