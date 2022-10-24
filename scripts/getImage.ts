import fetch from "node-fetch";
import * as fs from "node:fs/promises";
import { Country } from "./data";

const downloadImage = async (country: Country) => {
  const res = await fetch(country.flag);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile("src/images/" + country.UNCode + ".svg", buffer);
};

const downloadAllImages = async (countries: Country[]) => {
  let i = 0;
  const interval = setInterval(() => {
    try {
      downloadImage(countries[i]);
    } catch (err) {
      console.log(err);
      clearInterval(interval);
    }
    i++;
  }, 1000);
};

export {};
