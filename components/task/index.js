import React, { useEffect, useState } from "react";

//components
import Form from "react-bootstrap/Form";
import Loading from "./loading";
import ListTask from "../task/listTask";
import NewTask from "../task/newTask";

export default function main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div className="container-task">
      <div
        className="w-100 d-flex justify-content-between"
        style={{ height: "40px" }}
      >
        <Form.Select
          className="font-size-12 font-weight-600"
          style={{ width: "118.55px", height: "100%", border: '1px solid #4F4F4F', marginLeft: "80px" }}
        >
          <option value="Personal Errands">Personal Errands</option>
        </Form.Select>
        <div>
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
          <ListTask/>
          <NewTask/>
        </div>
      )}
    </div>
  );
}
