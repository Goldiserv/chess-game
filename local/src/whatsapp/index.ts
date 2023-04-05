import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import QRCode from "qrcode";
import { Client } from "whatsapp-web.js";
import path from "path";
import fs from "fs";

dotenv.config();

const app: Express = express();
const publicFolder = path.join(__dirname, '../public/');
app.use(express.static(publicFolder));

const port = process.env.PORT;

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  // QRcode.generate("test qr", { small: true });

  const absPath = path.join(__dirname, '../public/qr.png');
  
  if (!fs.existsSync(publicFolder)){
      fs.mkdirSync(publicFolder);
  }
  QRCode.toFile(absPath, 'Encode this text in QR code', {
    errorCorrectionLevel: 'H'
  }, function(err) {
    if (err) throw err;
    console.log('QR code saved!');
  });

  res.render("index", {myQr: "qr"})
  // res.send(qr);
  const client = new Client({});

  client.on('qr', (qr) => {
    // Generate and display QR code for user to scan
    console.log('QR Code:', qr);
  });

  // client.on("ready", () => {
  //   console.log("Client is ready!");

  //   // sleep(3000)
  //   // client.logout();
  // });
  // client.initialize();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
