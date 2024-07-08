import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTask, GetTask } from "../Redux/Action";

export default function TaskList() {
  const todoList = useSelector((store) => store.tasklist);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [filterCategory, setFilterCategory] = useState("");
  let no = 1;

  console.log(todoList)

  useEffect(() => {
    axios
      .get(`http://localhost:8000/todoList/?q=${search}&_limit=5&_page=${page}`)
      .then((res) => {
        dispatch(GetTask(res.data));
        console.log(res);
        setTotal(Math.ceil(res.headers["x-total-count"] / 5));
      });
  }, [page, search]);

  function handleChecked(id, isChecked) {
    const updateList = todoList.map((v) => {
      if (v.id === id) {
        return { ...v, isChecked: isChecked };
      } else {
        return { ...v };
      }
    });

    dispatch(GetTask(updateList));

    // update in api
    axios.patch(`http://localhost:8000/todoList/${id}`, {
      isChecked: isChecked,
    });
  }

  // DELETE
  function handleDelete(id) {
    axios.delete(`http://localhost:8000/todoList/${id}`);
    dispatch(DeleteTask(id));
  }

  const filteredData = filterCategory
    ? todoList.filter((v) => v.category === filterCategory)
    : todoList;



  return (
    <>
      {/* header */}
      <Navbar />

      {/* section tasklist */}

      <section className="section-tasklist h-screen bg-indigo-400 pt-20">
        <div className="search-bar text-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 mb-5 rounded-sm outline-none"
            style={{ width: "400px" }}
            onChange={(e) => {
              setSearch(e.target.value), setPage(1);
            }}
          />
        </div>

        <div className="category-btn flex justify-around mb-10">
          <button
            className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 rounded m-1"
            type="button"
            value={""}
            onClick={(e) => setFilterCategory(e.target.value)}
          >
            All
          </button>
          <button
            className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 rounded m-1"
            type="button"
            value={"Public"}
            onClick={(e) => setFilterCategory(e.target.value)}
          >
            Public
          </button>
          <button
            className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 rounded m-1"
            type="button"
            value={"Private"}
            onClick={(e) => setFilterCategory(e.target.value)}
          >
            Private
          </button>
          <button
            className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 rounded m-1"
            type="button"
            value={"Personal"}
            onClick={(e) => setFilterCategory(e.target.value)}
          >
            Personal
          </button>
        </div>

        <table
          className="table-fixed border border-indigo-600 text-indigo-800"
          border={1}
          cellPadding={3}
          cellSpacing={0}
          width={"100%"}
        >
          <thead>
            <tr className="border border-indigo-600">
              <th className="border border-indigo-600">Sr.no</th>
              <th className="border border-indigo-600">Task</th>
              <th className="border border-indigo-600">Category</th>
              <th className="border border-indigo-600">Status</th>
              <th className="border border-indigo-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((v, i) => {
              return (
                <>
                  {i % 2 === 0 ? (
                    <tr className="border border-indigo-600 text-center">
                      <td className="border border-indigo-600 bg-indigo-300">
                        {no++}
                      </td>
                      <td className="border border-indigo-600 bg-indigo-200">
                        {v.isChecked ? (
                          <s className="text-green-600"> {v.task}</s>
                        ) : (
                          v.task
                        )}
                      </td>
                      <td className="border border-indigo-600 bg-indigo-300">
                        {v.category}
                      </td>
                      <td className="border border-indigo-600 bg-indigo-200">
                        <input
                          type="checkbox"
                          checked={v.isChecked}
                          onClick={(e) => handleChecked(v.id, e.target.checked)}
                        />
                      </td>
                      <td className="border border-indigo-600 bg-indigo-300">
                        <button
                          className="text-sm bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-2 m-1 rounded"
                          type="button"
                          onClick={() => handleDelete(v.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="text-sm bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-2  rounded"
                          type="button"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr className="border border-indigo-600 text-center">
                      <td className="border border-indigo-600 bg-indigo-200">
                        {no++}
                      </td>
                      <td className="border border-indigo-600 bg-indigo-300">
                        {v.isChecked ? (
                          <s className="text-green-600"> {v.task}</s>
                        ) : (
                          v.task
                        )}
                      </td>
                      <td className="border border-indigo-600 bg-indigo-300">
                        {v.category}
                      </td>
                      <td className="border border-indigo-600 bg-indigo-300">
                        <input
                          type="checkbox"
                          checked={v.isChecked}
                          onClick={(e) => handleChecked(v.id, e.target.checked)}
                        />
                      </td>
                      <td className="border border-indigo-600 bg-indigo-200">
                        <button
                          className="text-sm bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-2 m-1 rounded"
                          type="button"
                          onClick={() => handleDelete(v.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="text-sm bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-2 rounded"
                          type="button"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
          <tfoot align="center">
            <tr>
              <td colSpan={5}>
                {/* prev button */}
                {page > 1 && (
                  <button
                    className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 rounded m-1"
                    type="button"
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </button>
                )}

                {/* current page */}
                <button
                  className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 rounded m-1"
                  type="button"
                >
                  {page}
                </button>

                {/* next page */}
                {page < total && (
                  <button
                    className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 rounded m-1"
                    type="button"
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </>
  );
}
