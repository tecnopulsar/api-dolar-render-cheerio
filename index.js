import express from "express";
import axios from 'axios'
import cors from 'cors'
import * as cheerio from 'cheerio';

const app = express();

// var corsOptions = {
//     origin: 'http://localhost:5173',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

const PORT = process.env.PORT || 5000;

app.get("/", cors(), async (req, res) => {
    try {
        const {data} = await axios.get('https://www.bcentral.cl/inicio');

        const $ = cheerio.load(data)
        const selectorDolar = 
        "#market-scrll-2 > tbody > tr:nth-child(2) > td.buy > a > div > div.buy-valueDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(3) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2"
  
        const objetoValores = {
            fecha : new Date().toLocaleDateString(),
            dolar: $(selectorDolar).text().split(' ')[0].trim() || "sin datos"
        }
        res.json(objetoValores);
        
    } catch (error) {
        res.json(console.error(error))
    }
});

app.listen(5000, () => console.log("Server on 🙄: ",PORT));
