import Layout from "../components/Layout";
//import { useEffect } from "react"; // useContext, createContext
import Script from "next/script";

function Index() {

  return (
    <div>
      <Script
        src="https://exporter.textframe.app/exporter.js"
        strategy={"beforeInteractive"}
      />
      <Layout title="Textframe">
        <h1 className="">Textframe</h1>
        <p className="">Embed component from another app</p>
        <div
          style={{
            marginLeft: "40px",
            marginRight: "40px",
          }}
        >
          <div style={{ display: "none" }} id="textframe-container">
            1956516571
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Index;
