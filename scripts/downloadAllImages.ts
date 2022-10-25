import { Country } from "./data";
import * as fs from "node:fs/promises";
import fetch from "node-fetch";

const downloadImage = async (country: Country) => {
  const res = await fetch(country.flag);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile("public/images/" + country.ISOCode + ".svg", buffer);
};

const downloadAllImages = async (countries: Country[]) => {
  await fs.mkdir("public/images");
  let i = 0;
  const interval = setInterval(() => {
    try {
      console.log("DOWNLOAD", countries[i].name);
      downloadImage(countries[i]);
    } catch (err) {
      console.log(err);
      clearInterval(interval);
    }
    i++;
  }, 1000);
};

export default downloadAllImages;
