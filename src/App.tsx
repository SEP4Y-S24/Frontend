import React from "react";
import TextArea from "./components/Form/TextArea";
import "./App.css";
import Button from "./components/Elements/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <TextArea id="message" rows={5} />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <p>
          <Button text="Click me!" style="red" onClick={() => alert("Hello!")} />
        </p>  
    
      </header>
    </div>
  );
}

export default App;
