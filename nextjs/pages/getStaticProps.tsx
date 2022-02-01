import Link from "next/link";
import Layout from "../components/Layout";

function Index({ stars }) {
  return (
    <div>
      <Layout title="GetStaticProps">
        <h1 className="">GetStaticProps</h1>
        <p className="">
          This page uses getStaticProps to return async api call result before page load
        </p>
        <p>Next.js has {stars} ⭐️ {"<--"} no. stars generated via static props</p>
        <p>
          <Link href="/">
            <button className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded">
              Home
            </button>
          </Link>
        </p>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();

  return {
    props: {
      stars: json.stargazers_count,
    },
  };
}

export default Index;
