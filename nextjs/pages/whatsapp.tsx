// import Link from "next/link";
import Button from "../components/Button";
import Layout from "../components/Layout";
import React from "react";

function TickerToolPage() {

  return (
    <Layout title="WhatsApp Msg">
      <h1 className="text">WhatsApp Msg</h1>
      <p className="">Work in progress</p>

      <div className="flex">
        <div className="bg-blue-200 w-1/5 h-96 m-2">
          <p> Side menu</p>
        </div>

        <div className="block bg-amber-200 w-full h-96  m-2">
          <div className="bg-slate-300 m-2">Text</div>
          <Button
            labelText="Send WhatsApp msg"
            onClick={() => {
              // sendWhatsApp();
            }}
            extraClassName="ml-2"
          />

          <div></div>
        </div>
      </div>
    </Layout>
  );
}

export default TickerToolPage;
