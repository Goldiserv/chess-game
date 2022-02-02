// import Link from "next/link";
import Layout from "../components/Layout";
import React from "react";

const TickerToolPage = () => (
  <Layout title="Ticker Tool">
    <h1 className="text">Ticker Tool</h1>
    <p className="">Work in progress</p>

    <div className="flex">
      <div className="bg-blue-200 w-1/5 h-96 m-2">
        <p> Preset options / side menu</p>
        <p>e.g. all ASX vanguard</p>
        <p>- Will need some filters</p>
      </div>

      <div className="block bg-amber-200 w-full h-96  m-2">
        <div className="bg-slate-300 m-2">Config data source (e.g. Yahoo, interactivebrokers, or other) once off</div>
        <div className="bg-slate-300 m-2">Pick ticker symbols</div>
        <div className="bg-slate-300 m-2">Show tabbed data</div>
        <div className="bg-slate-300 m-2">Define actions</div>
        <div className="bg-slate-300 m-2">
          Notification destination (sms / email)
        </div>

        <div></div>
      </div>
    </div>

    {/* <Link href="/">
        <button className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded">Home</button>
      </Link> */}
  </Layout>
);

export default TickerToolPage;
