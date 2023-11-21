'use client'

import { useDrag, useDrop } from "react-dnd";

const TodoItem = ({ todo, index, moveTodo,handleToggleTodo }) => {
  const [, ref] = useDrag({
    type: 'TODO',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'TODO',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className={`todo-item mb-2 ${todo.completed ? 'line-through' : ''} border p-2 rounded-md cursor-grabbing`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleTodo(todo._id)}
      />
      <span className="ml-2">{todo.text}</span>
    </div>
  );
};

  
  export default TodoItem;
  