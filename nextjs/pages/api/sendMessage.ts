import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

export default function sendMessage(req: NextApiRequest, res: NextApiResponse) {
  const accountSid = <string>process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
  const token = <string>process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
  const fromNumber = <string>process.env.NEXT_PUBLIC_TWILIO_FROM_NUMBER;
  const client = twilio(accountSid, token);
  const { phone, message } = req.body;
  // console.log(phone, message);
  client.messages
    .create({
      body: message,
      from: `+${fromNumber}`,
      to: phone,
    })
    .then((message) => {
      console.log({ message });
      res.json({
        success: true,
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
}
