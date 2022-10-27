import { Country } from "../../scripts/data";
import "./Message.css";

interface MessageProps {
  country: Country;
  isCorrect: boolean;
  nextCountry: () => void;
}

const Message = ({ country, isCorrect, nextCountry }: MessageProps) => {
  return (
    <div className="message-container" onClick={nextCountry}>
      <div
        className="message"
        style={{ backgroundColor: isCorrect ? "green" : "red" }}
      >
        <h1>{country.name}</h1>
        <p>Population: {country.population.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Message;
