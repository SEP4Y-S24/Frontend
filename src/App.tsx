import React from "react";
import TextArea from "./components/Form/TextArea";

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

      </header>
      <Dropdown dropdownLabel="Select an option" options={options} />
      <TextArea id="message" rows={5} />
      <Button text="Click me" onClick={() => console.log("Button clicked")} color="primaryColor" />
    </div>
  );
}

export default App;
