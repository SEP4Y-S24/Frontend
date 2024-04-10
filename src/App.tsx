import React from "react";
import TextArea from "./components/Form/TextArea";
import "./App.css";
import Button from "./components/Elements/Button";
import Dropdown from "./components/Form/selectForm";

const options = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
];


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </p>
        <Dropdown dropdownLabel="Select an option" options={options} />
        <Button style="primaryColor" text="Submit" onClick={() => alert("Submited")}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
