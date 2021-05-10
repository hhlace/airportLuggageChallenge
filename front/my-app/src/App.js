import "./App.css";
import Options from "./Options";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h2 className="App-title">Valijas</h2>
                <button
                    onClick={() => window.location.reload()}
                    className="homeButton"
                >
                    Home
                </button>
                <Options className="App-header" />
                <a
                    className="App-link"
                    href="https://gist.github.com/Plataforma5la/2063a4d6538fb9a3487de8becb15b2b5"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instrucciones Challenge
                </a>
            </header>
        </div>
    );
}

export default App;
