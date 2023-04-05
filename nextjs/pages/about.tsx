import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About | Mini-projects">
    <article className="prose">
      <h2 className="">About</h2>
      <p className="">
        This site holds small projects and/or example solutions to problems.
      </p>
      <p>
        <Link legacyBehavior href="/">
          <button className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded">
            Home
          </button>
        </Link>
      </p>
    </article>
  </Layout>
);

export default AboutPage;
