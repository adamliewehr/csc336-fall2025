import { useState } from "react";
import ListItem from "./ListItem";
import Quote from "./Quote";


function App() {

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

  const [apiContents, setApiContents] = useState([

  ]);

  async function apiCall() {
    try {

      const response = await fetch("https://meowfacts.herokuapp.com/");
      const data = await response.json();

      return data.data[0]

    } catch (e) {

      console.log('Something went wrong!')
    }
  }


  // I had to ask gemini becuase I couldn't get it to work :(

  async function addToQuoteList() {
    const newQuoteText = await apiCall();

    setApiContents(prevContents => [
      ...prevContents,
      { text: newQuoteText }
    ]);
  }


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




      <button
        onClick={addToQuoteList}>
        Generate Cat Fact
      </button>

      {apiContents.map((item, index) => (
        <Quote
          key={index}
          text={item.text}
        />
      ))}



    </div>
  );
}

export default App;