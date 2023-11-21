'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TodoItem from "./TodoItem";


const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [texttodo, setTexttodo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api');
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  const handleToDo = async (text) => {
    try {
      const newTodo = {
        text,
        completed: false,
        position: todos?.length,
      };
      const response = await axios.post(`/api`, newTodo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTexttodo('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      await axios.put(`/api/todoupdate/${id}`, { completed: updatedTodos.find((todo) => todo._id === id).completed });
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const moveTodo = (fromIndex, toIndex) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      const [movedTodo] = updatedTodos.splice(fromIndex, 1);
      updatedTodos.splice(toIndex, 0, movedTodo);

      // Update positions and save to the database
      const updatedPositions = updatedTodos.map((todo, index) => ({ id: todo._id, position: index }));
      axios.put('/api/updatePosition', updatedPositions);

      return updatedTodos;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col max-w-lg my-10 mx-auto ">
        <div className="flex flex-row">
          <input
            type='text'
            placeholder="Add your todo"
            className="border p-2 mr-2"
            value={texttodo}
            onChange={(e) => setTexttodo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleToDo(texttodo);
                setTexttodo('')
              }
            }}
          />
          <button onClick={() => { handleToDo(newTodoText); setNewTodoText(''); }} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Todo
          </button>
        </div>
        <div className="flex flex-col  mt-4">
          {todos.map((todo, index) => (
            <TodoItem key={todo._id} todo={todo} index={index} moveTodo={moveTodo} handleToggleTodo={handleToggleTodo} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
