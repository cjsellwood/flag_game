import { partition } from "./sortByPopulation";
import sortByPopulation from "./sortByPopulation";
import { Country } from "../scripts/data";

const countries: Country[] = [
  {
    name: "bulgaria",
    flag: "./images/100.svg",
    population: 6927288,
    UNCode: "BG",
    ISOCode: "100",
  },
  {
    name: "falkland islands",
    flag: "./images/238.svg",
    population: 2563,
    UNCode: "FK",
    ISOCode: "238",
  },
  {
    name: "syria",
    flag: "./images/760.svg",
    population: 17500657,
    UNCode: "SY",
    ISOCode: "760",
  },
  {
    name: "belarus",
    flag: "./images/112.svg",
    population: 9398861,
    UNCode: "BY",
    ISOCode: "112",
  },
  {
    name: "india",
    flag: "./images/356.svg",
    population: 1380004385,
    UNCode: "IN",
    ISOCode: "356",
  },
  {
    name: "cuba",
    flag: "./images/192.svg",
    population: 11326616,
    UNCode: "CU",
    ISOCode: "192",
  },
  {
    name: "guadeloupe",
    flag: "./images/312.svg",
    population: 400132,
    UNCode: "GP",
    ISOCode: "312",
  },
];

describe("Test partition function", () => {
  test("Values higher than pivot are on left and lower on right", () => {
    const data = [...countries];
    expect(partition(data, 0, data.length - 1)).toEqual(1);
    expect(
      data
        .slice(0, 1)
        .every((country) => country.population < data[1].population)
    ).toEqual(true);
    expect(
      data.slice(2).every((country) => country.population > data[1].population)
    ).toEqual(true);
  });
});
