import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { addToDo, removeToDo, editToDo, toggleToDo } from "../redux/todoSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export default function ToDoForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [taskTitle, setTaskTitle] = useState("");
  const taskList = useSelector((state) => state.todo);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  const getCurrentDateTime = () => {
    return moment().format("h:mm:ss a, MMMM Do YYYY");
  };

  const handleInputChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (editingTaskId) {
      dispatch(editToDo({ id: editingTaskId, title: taskTitle }));
      toast.success("Saved changes");
      setEditingTaskId(null);
      setEditingTaskTitle("");
    } else {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
      };

      dispatch(addToDo(newTask));
      toast.success("Added task");
    }
    setTaskTitle("");
    handleClose();
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeToDo(taskId));
    toast.success("Deleted task");
  };

  const handleEditTask = (taskId, taskTitle) => {
    setEditingTaskId(taskId);
    setEditingTaskTitle(taskTitle);
    handleShow();
  };

  const handleToggleTask = (taskId) => {
    dispatch(toggleToDo(taskId));
  };

  return (
    <div>
      <h1 style={{ color: "#64667F", textAlign: "center" }}>TO DO LIST</h1>

      <div
        style={{
          width: "500px",
          height: "40px",
          margin: "50px auto",
          backgroundColor: " #02225D",
        }}
      >
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ backgroundColor: "#666FE8", marginLeft: "50px" }}
        >
          Add Task
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#62647D" }}>
              {editingTaskId ? "Edit Task" : "Add Task"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 style={{ color: "#9394A7" }}>Title: </h6>
            <input
              type="text"
              style={{ width: "100%" }}
              value={taskTitle}
              onChange={handleInputChange}
            ></input>
            <h6 style={{ color: "#9394A7" }}>Status: </h6>
            <select style={{ width: "100%" }}>
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              style={{ backgroundColor: "#666FE8" }}
              onClick={() => handleAddTask()}
            >
              {editingTaskId ? "Save Changes" : "Add Task"}
            </Button>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ backgroundColor: "#CCCDDD", color: "#9091A6" }}
            >
              Cancle
            </Button>
          </Modal.Footer>
        </Modal>
        <span>
          <select style={{ width: "150px", marginLeft: "150px" }}>
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </span>

        {taskList.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul style={{ marginTop: "50px", listStyle: "none" }}>
            {taskList.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  style={{ marginRight: "15px" }}
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                />

                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>

                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                    style={{ marginLeft: "16px" }}
                    onClick={() => handleEditTask(task.id, task.title)}
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </span>

                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                    style={{ marginLeft: "16px" }}
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                  </svg>
                </span>

                <p>{getCurrentDateTime()}</p>
              </li>
            ))}
          </ul>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}
