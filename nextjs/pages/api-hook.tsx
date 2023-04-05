import Link from "next/link";
import Layout from "../components/Layout";
import { useState } from "react";

var axios = require("axios").default;

function Index() {
  const [apiRes, setApiRes] = useState({});
  // useEffect(() => {
  //   //alert("a")
  // }, [apiRes]);

  return (
    <div>
      <Layout title="API + Hook">
        <h1 className="">API + Hook</h1>
        <p className="">Example: Call API and save to react hook</p>
        <p>
          API result is:
          <pre>
            <code>{JSON.stringify(apiRes, null, 4)}</code>
          </pre>
        </p>
        <p>
          <Link legacyBehavior href="/">
            <button className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded">
              Home
            </button>
          </Link>
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded"
            onClick={async () => {
              const res = await axios.request(
                "https://api.agify.io/?name=bella"
              );
              console.log({ res });
              setApiRes(res.data);
              //console.log({res});
            }}
          >
            Get data
          </button>

          <button
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded"
            onClick={() => {
              console.log({ apiRes });
            }}
          >
            Log hook value
          </button>
        </p>
      </Layout>
    </div>
  );
}

export default Index;
