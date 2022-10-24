import fetch from "node-fetch";

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

const countries = fetchCountries();

export default countries;
