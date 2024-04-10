import React from "react";
import "./App.css";
import Dropdown from "./components/Form/selectForm"


const options = [
  { id: 1, name: 'Clock1' },
  { id: 2, name: 'Clock 2' },
  { id: 3, name: 'Clock 3' }
];


function App() {
  return (
    <div className="App">
      <Dropdown dropdownLabel ="Select a Clock" options ={options}/>
    </div>
  );
}

export default App;
