import Link from "next/link";
import Layout from "../components/Layout";
import { useState } from "react";

var axios = require("axios").default;

function Index() {
  const [apiRes, setApiRes] = useState({ data: "dummy data" });
  return (
    <div>
      <Layout title="Yahoo Finance">
        <h1 className="">Yahoo Finance</h1>
        <p className="">This calls Yahoo Finance API</p>
        <pre>
          <code>{JSON.stringify(apiRes, null, 5)}</code>
        </pre>
        Ticker symbol:
        <input
          type="text"
          className="border-2"
          id="stock-ticker-input"
          name="stock-ticker-input"
        />

        {/* <button
          className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded"
          onClick={async () => {
            let x = document.getElementById(
              "stock-ticker-input"
            ) as HTMLInputElement;
            console.log({ ticker: x.value });
          }}
        >
          Log ticker value
        </button> */}

        <button
          className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded"
          onClick={async () => {
            let tickerElement = document.getElementById(
              "stock-ticker-input"
            ) as HTMLInputElement;
            let tickerStr = tickerElement.value;

            var options = {
              method: "GET",
              url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${tickerStr}`,
              params: { modules: "defaultKeyStatistics,assetProfile" },
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_YAHOO_FINANCE_KEY,
              },
            };
            const res = await axios.request(options);
            console.log({ res });
            setApiRes(res);
          }}
        >
          Call Yahoo API
        </button>

      </Layout>
    </div>
  );
}

export default Index;
