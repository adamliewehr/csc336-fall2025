import { useState } from 'react'
import ListItem from "./ListItem";



function ToDoList() {

    const [items, setItems] = useState([
    { text: "React Basics Assignment", important: false },
    { text: "Swim Practice", important: true },
    { text: "Check Email", important: true },
    { text: "Go to bed", important: false },
    { text: "Annoy my sister", important: true },
  ]);

  const [inputValue, setInputValue] = useState("");

  function handleAdd() {
    if (!(inputValue.trim().length == 0)) {
      setItems([...items, { text: inputValue, important: false }]);
      setInputValue("");
    } else {
      alert("Please enter a valid input");
    }

  };


    return (
        <div>

            <h2>To Do List</h2>

            <input
                type="text"
                value={inputValue} // so that the textbox gets cleared
                onChange={e => setInputValue(e.target.value)}
            />


            <button
                onClick={handleAdd}>
                Add Item
            </button>

            <h3>Items in bold are important!</h3>

            {items.map((item, index) => (
                <ListItem
                    key={index}
                    text={item.text}
                    important={item.important}
                />
            ))}



        </div>
    )
}

export default ToDoList
