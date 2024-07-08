import axios from "axios";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddTask } from "../Redux/Action";

export default function Home() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  function handleAddTask(e) {
    e.preventDefault();

    console.log(task, category);

    const errorMessage = {};

    if (task == "") {
      errorMessage.task = "Please, enter task !";
    } else if (category == "") {
      errorMessage.category = "Please, select category !";
    }

    if (Object.keys(errorMessage).length !== 0) {
      setError(errorMessage);
    } else {
      axios
        .post("http://localhost:8000/todoList", {
          task: task,
          category: category,
          isChecked: false,
        })
        .then((res) => {
          dispatch(AddTask(res.data));
          console.log(res.data);
        });

      console.log("task added");
      setTask("");
      setError("");
    }
  }

  return (
    <>
      {/* header */}
      <Navbar />

      {/* section todo form */}
      <section className="section-todo-form h-screen bg-indigo-400 grid place-items-center">
        <div className="form-item bg-indigo-500 p-4 rounded">
          <div className="form-title text-center mb-2">
            <h2 className="text-xl font-bold text-indigo-900">ADD TODO</h2>
          </div>
          <form onSubmit={handleAddTask}>
            <div className="input-group">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="outline-none my-1 px-2 rounded-sm"
                placeholder="Enter Task"
              />
              <p className="text-red-800">
                {error && error.task ? error.task : ""}
              </p>
            </div>
            <div className="input-group">
              <select
                value="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">--select category--</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Personal">Personal</option>
              </select>

              <p className="text-red-800">
                {error && error.category ? error.category : ""}
              </p>
            </div>
            <div className="submit-btn text-center">
              <button
                className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 mt-3 rounded"
                type="submit"
              >
                ADD
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
