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
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
        <Script
          async
          // preload="true"
          src="https://exporter.textframe.app/wordpress.js"
        />        
      </Head>

      <Layout title="Textframe">
        <h1 className="">Textframe</h1>
        <p className="">Embed component from another app</p>

        <div style={{ display: "none" }} id="id-container">
          1956516571
        </div>
        <div
          style={{ width: "100vw", maxWidth: "initial" }}
          id="textframe-div"
          className="wp-block-create-block-textframe"
        ></div>
      </Layout>
    </div>
  );
}

export default Index;
