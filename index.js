import express from "express";
import axios from "axios";
import cors from "cors";
import * as cheerio from "cheerio";

const app = express();

app.use(cors());

// var corsOptions = {
//     origin: 'http://localhost',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  try {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
      method: "GET",
      url: "https://quiniela.loteriadelaciudad.gob.ar/resultadosQuiniela/descarga.php?sorteo=2023/04/QNL51N20230415.xml",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });

    // parsing the HTML source of the target web page with Cheerio
    if (axiosResponse.data) {
      const $ = cheerio.load(axiosResponse.data);
      // initializing the data structures
      // that will contain the scraped data
      const scrapedQuiniela = {
        fecha: $("FechaSorteo").text(),
        sorteo: $("Sorteo").text(),
        suerte: {
          N01: $("Suerte").find("N01").text(),
          N02: $("Suerte").find("N02").text(),
          N03: $("Suerte").find("N03").text(),
          N04: $("Suerte").find("N04").text(),
          N05: $("Suerte").find("N05").text(),
          N06: $("Suerte").find("N06").text(),
          N07: $("Suerte").find("N07").text(),
          N08: $("Suerte").find("N08").text(),
          N09: $("Suerte").find("N09").text(),
          N10: $("Suerte").find("N10").text(),
          N11: $("Suerte").find("N11").text(),
          N12: $("Suerte").find("N12").text(),
          N13: $("Suerte").find("N13").text(),
          N14: $("Suerte").find("N14").text(),
          N15: $("Suerte").find("N15").text(),
          N16: $("Suerte").find("N16").text(),
          N17: $("Suerte").find("N17").text(),
          N18: $("Suerte").find("N18").text(),
          N19: $("Suerte").find("N19").text(),
          N20: $("Suerte").find("N20").text(),
        },
        letras: $("Suerte").find("letras").text(),
      };
      // converting the scraped data object to JSON
      const scrapedDataJSON = JSON.stringify(scrapedQuiniela);
      console.log(scrapedDataJSON);
      // storing scrapedDataJSON in a database via an API call...
    } else console.log("No existe el sorteo soliciado");
  } catch (error) {
    res.json(console.error(error));
  }
});

app.listen(5000, () => console.log("Server on 🙄: ", PORT));
