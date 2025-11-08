import { useState } from 'react'
import TodoItem from "./TodoItem"
import ListItem from "./ListItem"


function App() {
  const [x, setX] = useState(10); // useState changes the variables everywhere
  const [name, setName] = useState("Adam");

  const [task, setTask] = useState("");

  

  // const [items, setItems] = useState([
  //   { text: "React Basics Assignment", important: false },
  //   { text: "Swim Practice", important: true },
  //   { text: "Check Email", important: true },
  //   { text: "Go to bed", important: false },
  //   { text: "Annoy my sister", important: true },
  // ]);

  // const [inputValue, setInputValue] = useState("");

  // function handleAdd() {
  //   setItems([...items, { text: inputValue, important: false }]);
  //   setInputValue("");
  // }


  const [todos, setTodos] = useState([
    {
      task: "Eat dinner",
      complete: true,
      id: 1
    },
    {
      task: "Coach Swim",
      complete: false,
      id: 2
    },
    {
      task: "go to bed",
      complete: false,
      id: 3
    }
  ]);



  function addTodo() {
    let newTodo = {
      task: task,
      complete: false,
      id: Date.now()

    };
    setTodos([...todos, newTodo])
    setTask("");
  }


  return (

    <div>
      <input
        type="text"
        onChange={e => setTask(e.target.value)}
      />

      <button
        onClick={addTodo}>
        Add Item
      </button>

    {/* <div>
      <input
        type="text"
        onChange={e => setInputValue(e.target.value)}
      />

      <button
        onClick={handleAdd}>
        Add Item
      </button> */}



      <ul>
        {todos.map((todo) => (<TodoItem todo={todo} key={todo.id} />))}
      </ul>

      {/* {items.map((item, index) => (
        <ListItem
          key={index}
          text={item.text}
          important={item.important}
        />
      ))} */}


    </div>
  )
}

export default App
