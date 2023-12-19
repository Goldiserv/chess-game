import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
// import { client } from "@gradio/client";
import util from "util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("CALLING API AT test-3");
  try {
    if (req.method === "GET") {
      console.log("CALLING API AT test-3 GET");
      const apiUrl = "https://jsonplaceholder.typicode.com/todos/1";
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
      };
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
        // body: JSON.stringify(dataObject),
      });

      console.log(
        util.inspect(response, {
          showHidden: false,
          depth: 2,
          colors: true,
        })
      );
      const data = await response.json();

      res.status(200).json({ data });
    }

    if (req.method === "POST") {
      console.log("CALLING API AT test-3 POST");
      const apiUrl = "https://jsonplaceholder.typicode.com/posts";
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
      };
      const bodyObj = JSON.stringify({
        title: 'foo213123',
        body: 'barzx',
        userId: 11231245,
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: bodyObj,
      });

      console.log(
        util.inspect(response, {
          showHidden: false,
          depth: 2,
          colors: true,
        })
      );
      const data = await response.json();
      res.status(200).json({ data });
    }
  } catch (err) {
    console.log("ERROR");
    console.log(
      util.inspect(err.response, {
        showHidden: false,
        depth: 2,
        colors: true,
      })
    );
    res.status(500).json({ err });
  }
}
