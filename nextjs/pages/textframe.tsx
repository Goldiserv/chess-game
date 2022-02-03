import Layout from "../components/Layout";
//import { useEffect } from "react"; // useContext, createContext
import Head from "next/head";
import Script from "next/script";

function Index() {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://exporter.textframe.app/wordpress.js";
  //   script.async = true;
  //   //script.preload = "true";
  //   document.head.appendChild(script);
  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  return (
    <div>
      <Head>
        <title>My page title</title>
        {/* <script async src="https://exporter.textframe.app/exporter.js"></script> */}
      </Head>
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
