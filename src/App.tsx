import { useRef, useState } from "react";
import "./App.css";
import { Trie } from "../scripts/Trie";
import countries from "./countries.json";
import countryTrie from "./countryTrie.json";
import Guess from "./components/Guess";
import Message from "./components/Message";

const trie = new Trie(countryTrie.root);
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

function App() {
  const [currentCountry, setCurrentCountry] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef(0);

  const guessFlag = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrect((correct) => correct + 1);
      setIsCorrect(true);
    } else {
      setWrong((wrong) => wrong + 1);
      setIsCorrect(false);
    }
    setShowMessage(true);
    const messageTimer = setTimeout(nextCountry, 300000);
    timerRef.current = Number(messageTimer);
  };

  const nextCountry = () => {
    clearTimeout(timerRef.current);
    setShowMessage(false);
    if (currentCountry + 1 === countries.length) {
      setFinished(true);
      return;
    }
    setCurrentCountry((i) => i + 1);
  };

  return (
    <div className="App">
      {!finished ? (
        <main>
          <Guess
            trie={trie}
            country={countries[currentCountry]}
            guessFlag={guessFlag}
            key={countries[currentCountry].ISOCode}
          />
        </main>
      ) : (
        <h1 className="finished">Finished</h1>
      )}
      {showMessage && (
        <Message
          country={countries[currentCountry]}
          isCorrect={isCorrect}
          nextCountry={nextCountry}
        />
      )}
      <footer className={`footer`}>
        <div>Correct: {correct}</div>
        <div>Wrong: {wrong}</div>
      </footer>
    </div>
  );
}

export default App;
