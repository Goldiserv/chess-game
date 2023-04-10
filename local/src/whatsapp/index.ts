import dotenv from "dotenv";
import { Client, LocalAuth } from "whatsapp-web.js";
import path from "path";
import { getBirthdayRows } from "./csv-rw";
import { sanitisePhoneNumber } from "./sanitise-phone";

dotenv.config();

// Node terminal app to send whatsapp
const prompt = require("prompt-sync")({ sigint: true });

const sendMessage = async (number: string, message: string) => {
  const chat = await client.getChatById(number + '@c.us');
  chat.sendMessage(message);
};

const closeApp = (client?: Client) => {
  console.log("\nClose the browser window to exit");
  // client.destroy();
};


const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: false },
});

client.initialize();

client.on("loading_screen", (percent, message) => {
  console.log("LOADING SCREEN", percent, message);
});

client.on("qr", (qr) => {
  // NOTE: This event will not be fired if a session is specified.
  console.log("QR RECEIVED", qr);

  // QRcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("auth_failure", (msg) => {
  // Fired if session restore was unsuccessful
  console.error("AUTHENTICATION FAILURE", msg);
});

client.on("ready", async () => {
  // This variable is used to determine if the app should continue prompting the user for input
  let exitApp = false;
  let validatedQr = false;
  let skipFullMsg = false;

  console.log("READY");
  validatedQr = true;

  // check csv
  const filename = path.join(__dirname, "birthdays.csv");

  async function startProgram() {
    const matchedPeople = await getBirthdayRows(filename);
    const remainingPeople = [...matchedPeople];

    while (!exitApp && validatedQr) {
      // send prompt to confirm msg send
      if (matchedPeople.length === 0) {
        console.log(`\nNobody has a birthday today`);
        exitApp = true;
        closeApp(client);
      } else if (remainingPeople.length === 0) {
        console.log(`\nNo more birthday messages to send`);
        exitApp = true;
        closeApp(client);
      } else if (remainingPeople.length > 0) {
        3;

        if (!skipFullMsg) {
          if (remainingPeople.length === matchedPeople.length) {
            console.log(
              `\nThere are ${matchedPeople.length} message(s) to be sent today.`
            );
          } else {
            console.log(
              `\nThere are ${remainingPeople.length} message(s) left.`
            );
          }

          console.log(`\nThe next msg is:\n`, remainingPeople[0]);

          console.log(`\nSelect an option: 
  1. Send it
  2. Edit before sending
  3. Skip message
  4. Exit program\n`);
        }
        skipFullMsg = false;

        let userInput = prompt(`> `);
        userInput = Number(userInput);

        // Run user options
        if (userInput === 4) {
          console.log("\nExiting");
          exitApp = true;
          closeApp(client);
        } else if (userInput === 1) {
          const ph = sanitisePhoneNumber(remainingPeople[0].phone);
          await sendMessage(ph, remainingPeople[0].message);

          console.log("\nSent!");
          remainingPeople.shift();
        } else if (userInput === 2) {
          //
          console.log("\nFeature is work in progress");
          console.log(`\nPlease select another option.`);
          skipFullMsg = true;
          // console.log(`\nEnter a new message:`);
          // let newMsg = prompt(`> `);
          // //edit csv and re-read?
        } else if (userInput === 3) {
          console.log("\nSkipped!");
          remainingPeople.shift();
        } else {
          console.log("\nPlease enter 1,2,3 or 4");
          skipFullMsg = true;
        }
      } else {
        remainingPeople;
      }
    }
  }

  startProgram();
});

client.on("message", async (msg) => {
  console.log("MESSAGE RECEIVED", msg);

  if (msg.body === "!reaction") {
    msg.react("👍");
  }
});

client.on("message_create", (msg) => {
  // Fired on all message creations, including your own
  if (msg.fromMe) {
    // do stuff here
  }
});

client.on("message_revoke_everyone", async (after, before) => {
  // Fired whenever a message is deleted by anyone (including you)
  console.log(after); // message after it was deleted.
  if (before) {
    console.log(before); // message before it was deleted.
  }
});

client.on("message_revoke_me", async (msg) => {
  // Fired whenever a message is only deleted in your own view.
  console.log(msg.body); // message before it was deleted.
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});

/**
 * RUN CMD
 * ts-node index.ts
 */
