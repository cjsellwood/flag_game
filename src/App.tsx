import { ChangeEvent, useState } from "react";
import "./App.css";
import { Trie } from "../scripts/Trie";
import countries from "./countries.json";
import countryTrie from "./countryTrie.json";

const trie = new Trie(countryTrie.root);

function App() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const possibilities = trie.findAllWords(e.target.value);
    setSuggestions(possibilities);
  };
  return (
    <div className="App">
      <img className="flag" src={countries[0].flag} alt="flag" />
      <input className="country-input" onChange={handleInput} />
      <ul>
        {suggestions.map((suggestion) => {
          return <li key={suggestion}>{suggestion}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
