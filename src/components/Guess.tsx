import { useState, ChangeEvent } from "react";
import { Country } from "../../scripts/data";
import { Trie } from "../../scripts/Trie";

interface GuessProps {
  trie: Trie;
  country: Country;
  guessFlag: (isCorrect: boolean) => void;
}

const Guess = ({ trie, country, guessFlag }: GuessProps) => {
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

  const submitAnswer = () => {
    console.log(country.name, countryInput);
    guessFlag(country.name === countryInput);
  };
  return (
    <>
      <div
        className="flag-container"
        style={{
          backgroundImage: `url(${country.flag})`,
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
    </>
  );
};

export default Guess;
