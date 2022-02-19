import logo from "./logo.svg";
import "./App.css";

import Editor from "./components/Editor";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Cover Editor</h1>
                <p>
                    Lorem ipsum dolor ... uh I mean create your cover art here
                    bro
                </p>
            </header>
            <Editor />
        </div>
    );
}

export default App;
