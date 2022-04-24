import { useEffect } from "react";
import "./App.css";

import Editor from "./components/Editor";

function App() {
    const colors = [
        "#eecd9d", //beige
        "#433126", //brown
        "#ff0042", //pink
        "#62bdcb", //blue
        "#82ff7f", //green
    ];

    useEffect(setRandomColors, []);

    function setRandomColors() {
        console.log(
            ...colors.splice(Math.floor(Math.random() * colors.length), 1)
        );
        document
            .querySelector(":root")
            .style.setProperty(
                "--bg-color",
                ...colors.splice(Math.floor(Math.random() * colors.length), 1)
            );
        document
            .querySelector(":root")
            .style.setProperty(
                "--text-color",
                ...colors.splice(Math.floor(Math.random() * colors.length), 1)
            );
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Cover Editor</h1>
                <p>
                    This is our cover editor. If you want to share your
                    interpretations of our songs with a suiting visual you can
                    use this editor to create yourself a sample of our covers
                    that you can re-upload with your song on the upload page.
                </p>
            </header>
            <Editor />
        </div>
    );
}

export default App;
