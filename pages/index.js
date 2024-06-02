import { useState } from "react";
import Head from "next/head";

//components
import Inbox from "../components/inbox";
import Task from "../components/task";

export default function Home() {
  const [expandMenu, setExpandMenu] = useState(false);
  const [selectMenu, setSelectMenu] = useState("");
  return (
    <div className="home-container">
      <Head>
        <title>Quicks</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="d-flex justify-content-center">
        <div
          className="home-sidebar"
          onClick={() => {
            setExpandMenu(false), setSelectMenu("");
          }}
        ></div>
        <div
          className="home-content"
          onClick={() => {
            setExpandMenu(false), setSelectMenu("");
          }}
        >
          <input id="homeInput" type="text" />
        </div>
      </div>
      <div
        className="position-absolute end-0 bottom-0"
        style={{ margin: "0px 20px 20px 0px" }}
      >
        <div className="d-flex" style={{ cursor: "pointer", color: "white" }}>
          {expandMenu && (
            <>
              <div>
                <p
                  className="text-center font-base"
                  style={selectMenu ? { opacity: "0" } : { opacity: "100" }}
                >
                  Task
                </p>
                <img
                  src="/task.svg"
                  onClick={() => {
                    setSelectMenu("task"), setExpandMenu(false);
                  }}
                />
              </div>
              <div>
                <p
                  className="text-center font-base"
                  style={selectMenu ? { opacity: "0" } : { opacity: "100" }}
                >
                  Inbox
                </p>
                <img
                  src="/inbox.svg"
                  style={
                    selectMenu === "task"
                      ? { marginLeft: "1.5rem" }
                      : { margin: "0rem 1rem 0rem 1rem" }
                  }
                  onClick={() => {
                    setSelectMenu("inbox"), setExpandMenu(false);
                  }}
                />
              </div>
            </>
          )}
          {selectMenu === "task" && (
            <div className="d-flex flex-row me-3">
              <img
                src="/inbox.svg"
                className="me-2"
                onClick={() => {
                  setSelectMenu("inbox"), setExpandMenu(false);
                }}
              />
              <div
                onClick={() => {
                  setExpandMenu(true), setSelectMenu("");
                }}
              >
                <img
                  className="position-absolute ms-2"
                  src="/task_open.svg"
                  style={{ width: "68px" }}
                />
                <img
                  className="mb-2"
                  style={{ width: "61px" }}
                  src="/ellipse.svg"
                />
              </div>
            </div>
          )}
          {selectMenu === "inbox" && (
            <div className="d-flex flex-row me-3">
              <img
                src="/task.svg"
                className="me-2"
                onClick={() => {
                  setSelectMenu("task"), setExpandMenu(false);
                }}
              />
              <div
                onClick={() => {
                  setExpandMenu(true), setSelectMenu("");
                }}
              >
                <img
                  className="position-absolute "
                  src="/inbox_open.svg"
                  style={{ width: "61px", marginLeft: "0.7rem" }}
                />
                <img
                  className="mb-2"
                  style={{ width: "61px" }}
                  src="/ellipse.svg"
                />
              </div>
            </div>
          )}

          <div className={`${selectMenu ? "d-none" : "d-inline"}`}>
            <p className="text-center" style={{ opacity: "0" }}>
              Inbox
            </p>
            {!selectMenu && (
              <img
                style={{ width: "68px" }}
                src="/menu.svg"
                onClick={() => setExpandMenu(!expandMenu)}
              />
            )}
          </div>
        </div>
      </div>
      {selectMenu === "inbox" && (
        <div
          className="position-absolute end-0 bottom-0"
          style={{ margin: "0px 30px 120px 0px" }}
        >
          <Inbox setExpandMenu={setExpandMenu} setSelectMenu={setSelectMenu} />
        </div>
      )}
      {selectMenu === "task" && (
        <div
          className="position-absolute end-0 bottom-0"
          style={{ margin: "0px 30px 120px 0px" }}
        >
          <Task />
        </div>
      )}
    </div>
  );
}
