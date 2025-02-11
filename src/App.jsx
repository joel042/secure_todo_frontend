import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const App = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axiosInstance
        .get("/todos", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setTodos(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  const register = async () => {
    try {
      await axiosInstance.post("/auth/register", { email, password });
      alert("Registration successful! Please check your email.");
    } catch (error) {
      alert(
        "Error: " + (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  const login = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(email);
    } catch (error) {
      alert(
        "Login failed: " +
          (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  const addTodo = async () => {
    try {
      const res = await axiosInstance.post(
        "/todos",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([...todos, res.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      alert("Error adding todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      alert("Error deleting todo");
    }
  };

  return (
    <div className="container p-5">
      <h1>Todo App</h1>
      {!token ? (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user}</h2>
          <h3>Add a Todo</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
          <h3>Todo List</h3>
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                {todo.title} - {todo.description}
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
