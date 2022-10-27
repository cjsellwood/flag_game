import { useState } from "react";
import "./App.css";
import { Trie } from "../scripts/Trie";
import countries from "./countries.json";
import countryTrie from "./countryTrie.json";
import Guess from "./components/Guess";

const trie = new Trie(countryTrie.root);

function App() {
  const [currentCountry, setCurrentCountry] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const guessFlag = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrect((correct) => correct + 1);
    } else {
      setWrong((wrong) => wrong + 1);
    }
    setCurrentCountry((c) => c + 1);
  };

  return (
    <div className="App">
      <Guess
        trie={trie}
        country={countries[currentCountry]}
        guessFlag={guessFlag}
        key={countries[currentCountry].ISOCode}
      />
      <footer className="footer">
        <div>Correct: {correct}</div>
        <div>Wrong: {wrong}</div>
      </footer>
    </div>
  );
}

export default App;
