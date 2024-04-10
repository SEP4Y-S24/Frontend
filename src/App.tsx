import React from "react";
import "./App.css";
import Button from "./components/Elements/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <Button text="Click me" style={"primaryColor"} onClick={() => console.log("Button clicked")} />
        </p>  
    
      </header>
    </div>
  );
}

export default App;
