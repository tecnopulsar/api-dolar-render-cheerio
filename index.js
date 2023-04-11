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
        const {data} = await axios.get('https://dolarhoy.com/');

        const $ = cheerio.load(data)
        const selectorDolar = 
        "#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-5 > div > div.values > div.compra > div.val"
        
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
