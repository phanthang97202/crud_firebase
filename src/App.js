import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { onValue, ref, remove, set, update } from "firebase/database";
import { db } from "./firebase";
import { useEffect, useState } from "react";

function App() {
  const [typeTodo, setTypeTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdateTodo, setIdUpdateTodo] = useState("");

  // update todo
  console.log(idUpdateTodo);
  const handleUpdate = (todo) => {
    console.log(idUpdateTodo);
    setTypeTodo(todo.typeTodo);
    setIsUpdate(true);
    setIdUpdateTodo(todo.idTodo);
  };
  const handleSubmitUpdate = () => {
    update(ref(db, `/todos/yourwork-${idUpdateTodo}`), {
      typeTodo,
      idTodo: idUpdateTodo,
    });
    setTypeTodo("");
    setIsUpdate(false);
  };

  // get todos
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      console.log("===data", data);
      if (data.todos) {
        setTodos(Object.values(data.todos));
      }
    });
  }, []);
  // create todolist
  const handleTypeTodo = (e) => {
    setTypeTodo(e.target.value);
  };
  const writeDb = () => {
    const idTodo = uuidv4();
    console.log(idTodo, typeTodo);
    set(ref(db, `/todos/yourwork-${idTodo}`), {
      typeTodo,
      idTodo,
    });
    setTypeTodo("");
  };
  // delete todo
  const handleDeleteTodo = (id) => {
    remove(ref(db, `/todos/yourwork-${id}`));
  };
  return (
    <div className="App">
      <input
        type="text"
        value={typeTodo}
        onChange={handleTypeTodo}
        placeholder="Nhập tên công việc..."
      />
      {isUpdate ? (
        <>
          <button onClick={() => handleSubmitUpdate()}>update</button>
          <button
            onClick={() => {
              setIsUpdate(false);
              setTypeTodo("");
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button onClick={writeDb}>submit</button>
        </>
      )}

      <ul style={{ listStyleType: "none" }}>
        <h1>------------------DANH SÁCH TODOS------------------</h1>
        {todos ? (
          todos.map((todo) => (
            <li key={todo.idTodo}>
              <h1>{todo.typeTodo}</h1> <br />
              <button onClick={() => handleDeleteTodo(todo.idTodo)}>
                Delete
              </button>
              <button
                onClick={() => {
                  handleUpdate(todo);
                }}
              >
                Update
              </button>{" "}
              <br />
              ---------------------------------------
            </li>
          ))
        ) : (
          <h1>Không có công việc</h1>
        )}
      </ul>
    </div>
  );
}

export default App;
