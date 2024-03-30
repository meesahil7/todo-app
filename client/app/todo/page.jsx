"use client";

import React, { useEffect, useState } from "react";
import isAuth from "../../components/Auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const Page = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [todoId, setTodoId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const cookies = new Cookies(null, { path: "/" });
  const router = useRouter();

  const uesrToken = cookies.get("todoAuthToken"); // token to verify the user is authenticated or not

  const getAllTodos = () => {
    axios
      .get("https://lime-dugong-sari.cyclic.app/todo/todos", {
        headers: { Authorization: uesrToken },
      })
      .then((res) => setTodos(res.data.todos))
      .catch((err) => console.log(err));
  };

  const handleAddTodo = () => {
    // add a todo
    if (!modalData.title) {
      alert("user must add a title");
      return;
    } else if (!modalData.category) {
      alert("user must add a category");
      return;
    }
    axios
      .post("https://lime-dugong-sari.cyclic.app/todo/create", modalData, {
        headers: { Authorization: uesrToken },
      })
      .then((res) => getAllTodos())
      .catch((err) => console.log(err));
    setOpenModal(false);
  };

  const handleEdit = () => {
    // edit todo
    if (!todoId) return;
    axios
      .patch(
        `https://lime-dugong-sari.cyclic.app/todo/update/${todoId}`,
        modalData,
        {
          headers: { Authorization: uesrToken },
        }
      )
      .then((res) => getAllTodos())
      .catch((err) => console.log(err));
    setEdit(false);
    setTodoId("");
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    // delete todo
    if (!id) return;
    axios
      .delete(`https://lime-dugong-sari.cyclic.app/todo/delete/${id}`, {
        headers: { Authorization: uesrToken },
      })
      .then((res) => getAllTodos())
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    cookies.remove("todoAuthToken");
    router.push("/");
  };

  useEffect(() => {
    // initial api call to get all the todos accessible by the user
    getAllTodos();
  }, []);

  return (
    <div className="container">
      <h1>Task Management App</h1>
      <button className="addTodo" onClick={handleLogout}>
        Logout
      </button>
      <button className="addTodo" onClick={() => setOpenModal(true)}>
        Add Todo
      </button>

      <div className="todos">
        {todos && todos.length > 0 ? (
          <table className="todoTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todos &&
                todos.length > 0 &&
                todos.map((todo) => {
                  return (
                    <tr key={todo._id}>
                      <td>{todo.title}</td>
                      <td>{todo.priority.toUpperCase()}</td>
                      <td>{todo.category}</td>
                      <td>
                        {todo.status === true ? (
                          <p>Completed</p>
                        ) : (
                          <p>Pending</p>
                        )}
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setEdit(true);
                          setOpenModal(true);
                          setTodoId(todo._id);
                        }}
                      >
                        Edit
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(todo._id)}
                      >
                        Delete
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <h2>No task found... add a new task</h2>
        )}
      </div>

      {openModal && (
        <div className="modal">
          <input
            type="text"
            placeholder="Todo title"
            onChange={(e) =>
              setModalData({ ...modalData, title: e.target.value })
            }
          />

          {/* status of the task */}
          <select
            name=""
            id=""
            placeholder="Status"
            onChange={(e) =>
              setModalData({ ...modalData, status: e.target.value })
            }
          >
            <option value={false}>Pending</option>
            <option value={true}>Completed</option>
          </select>

          {/* category of the task */}
          <select
            name=""
            id=""
            onChange={(e) =>
              setModalData({ ...modalData, category: e.target.value })
            }
          >
            <option value="">--- Select Category ---</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="grocery">Grocery</option>
          </select>

          {/* priority of the task */}
          <select
            name=""
            id=""
            onChange={(e) =>
              setModalData({ ...modalData, priority: e.target.value })
            }
          >
            <option value="">--- Select Priority ---</option>
            <option value="casual">Casual</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
          </select>

          <button
            style={{ cursor: "pointer" }}
            onClick={!edit ? handleAddTodo : handleEdit}
          >
            {edit ? "Update Todo" : "Add Todo"}
          </button>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenModal(false);
              setEdit(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default isAuth(Page);
