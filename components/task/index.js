import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetch";

//components
import Form from "react-bootstrap/Form";
import Loading from "./loading";
import ListTask from "../task/listTask";

export default function main() {
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState();
  const [selectSection, setSelectSection] = useState(1);
  const [listTasks, setListTasks] = useState();

  const loadsection = async () => {
    const response = await fetchData("GET", "sectionTasks");

    if (response.success) {
      setLoading(false);
      setSectionData(response.data.data);
    }
  };

  const loadListTask = async () => {
    const response = await fetchData(
      "GET",
      `listTasks?sectionTaskId=${selectSection}`
    );

    if (response.success) {
      setLoading(false);
      setListTasks(response.data.data);
    }
  };

  useEffect(() => {
    loadsection();
  }, []);

  useEffect(() => {
    setLoading(true);
    loadListTask();
  }, [selectSection]);

  const handleAddTask = async () => {
    const data = {
      sectionTaskId: parseInt(selectSection),
      checked: false,
      title: "",
      remainingDays: "",
      date: "",
      description: "",
      notes: []
    };
    const response = await fetchData("POST", "listTasks", data);

    if (response.success) {
      loadListTask();
    }
  };

  const handleDeleteTask = async (id) => {
    const response = await fetchData("DELETE", `listTasks/${id}`);

    if (response.success) {
      loadListTask();
    }
  };

  const handleUpdateTask = async (id, data) => {
    const response = await fetchData("PATCH", `listTasks/${id}`, data);
    if (response.success) {
      loadListTask();
    }
  }

  const handleSelectNotes = async (id, value, key) => {
    // if(key.length === 0){
    //   const response = await fetchData("PATCH", `listTasks/${id}`, {notes: [value]});
    //   if (response.success) {
    //     loadListTask();
    //   }
    // }

    // if(key.length === 2) {
    //   const response = await fetchData("PATCH", `listTasks/${id}`, {notes: [value]});
    //   if (response.success) {
    //     loadListTask();
    //   }
    // }

    if(key.length === 1) {
      let data = key
      data.push(value)
      const response = await fetchData("PATCH", `listTasks/${id}`, {notes: data});
      if (response.success) {
        loadListTask();
      }
    }else{
      const response = await fetchData("PATCH", `listTasks/${id}`, {notes: [value]});
      if (response.success) {
        loadListTask();
      }
    }

  }

  return (
    <div className="container-task">
      <div
        className="w-100 d-flex justify-content-between"
        style={{ height: "40px" }}
      >
        <Form.Select
          className="font-size-14 font-weight-600"
          style={{
            width: "118.55px",
            height: "100%",
            border: "1px solid #4F4F4F",
            marginLeft: "80px",
          }}
          value={selectSection}
          onChange={(e) => setSelectSection(e.target.value)}
        >
          {sectionData &&
            sectionData.map((item) => (
              <option className="font-size-14 font-weight-600" value={item.id}>
                {item.name}
              </option>
            ))}
        </Form.Select>
        <div onClick={() => handleAddTask()}>
          <img style={{ cursor: "pointer" }} src="/new_task.svg" />
        </div>
      </div>
      {loading ? (
        <Loading type="spin" color="#C4C4C4" />
      ) : (
        <div
          style={{
            height: "calc(737px - 120px)",
            overflowY: "scroll",
          }}
        >
          {listTasks &&
            listTasks.map((item) => (
              <ListTask
                key={item.id}
                item={item}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTask={handleUpdateTask}
                handleSelectNotes={handleSelectNotes}
              />
            ))}
        </div>
      )}
    </div>
  );
}
