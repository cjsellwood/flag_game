import { Country } from "./data";
import * as fs from "node:fs/promises";

const downloadImage = async (country: Country) => {
  const res = await fetch(country.flag);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile("src/images/" + country.UNCode + ".svg", buffer);
};

const downloadAllImages = async (countries: Country[]) => {
  await fs.mkdir("src/images");
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
