import fetch from "node-fetch";
import * as fs from "node:fs/promises";
import { Trie } from "./Trie.js";
import downloadAllImages from "./downloadAllImages.js";
import sortByPopulation from "./sortByPopulation.js";

export type Country = {
  name: string;
  flag: string;
  population: number;
  UNCode: string;
  ISOCode: string;
};

const fetchCountries = async () => {
  const countryResponse = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca2,ccn3,flags,population"
  );
  const countryData: any = await countryResponse.json();

  const data: Country[] = [];
  for (let country of countryData) {
    data.push({
      name: country.name.common,
      flag: country.flags.svg,
      population: country.population,
      UNCode: country.cca2,
      ISOCode: country.ccn3,
    });
  }
  return data;
};

const countries = await fetchCountries();

// downloadAllImages(countries);

const generateData = async (countries: Country[]) => {
  const chars: { [char: string]: string } = {
    Å: "A",
    ç: "c",
    é: "e",
    ã: "a",
    í: "i",
  };
  const editedCountries = countries
    .map((country) => {
      if (country.name === "kosovo") {
        return {
          ...country,
          name: country.name.replace(/[Åçéãí]/g, (m) => chars[m]).toLowerCase(),
          flag: "./images/9999.svg",
        };
      }
      return {
        ...country,
        name: country.name.replace(/[Åçéãí]/g, (m) => chars[m]).toLowerCase(),
        flag: "./images/" + country.ISOCode + ".svg",
      };
    })
    .filter(
      (country) =>
        !["074", "334", "581", "663", "744"].includes(country.ISOCode)
    );
  
  const sorted = [...editedCountries];
  sortByPopulation(sorted);

  await fs.writeFile("src/countries.json", JSON.stringify(sorted));
  return JSON.stringify(editedCountries);
};

const finalData = JSON.parse(await generateData(countries));

const countryTrie = new Trie();
for (let country of finalData) {
  countryTrie.insert(country.name);
}
await fs.writeFile("src/countryTrie.json", JSON.stringify(countryTrie));

export default countries;
