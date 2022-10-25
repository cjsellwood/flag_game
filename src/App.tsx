import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { Trie } from "../scripts/Trie";
import countries from "./countries.json";
import countryTrie from "./countryTrie.json";

const trie = new Trie(countryTrie.root);

function App() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [countryInput, setCountryInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryInput(e.target.value);
    if (e.target.value === "") {
      setSuggestions([]);
      return;
    }
    setShowSuggestions(true);
    const possibilities = trie.findAllWords(e.target.value.toLowerCase());
    setSuggestions(possibilities);
  };

  const selectCountry = (suggestion: string) => {
    setCountryInput(suggestion);
    setShowSuggestions(false);
  };

  const submitAnswer = () => {};
  return (
    <div className="App">
      <div
        className="flag-container"
        style={{
          backgroundImage: `url(${
            countries[Math.floor(Math.random() * 250)].flag
          })`,
        }}
      ></div>
      <div className="input-container">
        <input
          className="country-input"
          onChange={handleInput}
          value={countryInput}
        />
        {showSuggestions && (
          <ul className="suggestion-list">
            {suggestions.map((suggestion) => {
              return (
                <li key={suggestion} onClick={() => selectCountry(suggestion)}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {countryInput !== "" && !showSuggestions && (
        <button className="submit-button" onClick={submitAnswer}>
          Submit
        </button>
      )}
    </div>
  );
}

export default App;
