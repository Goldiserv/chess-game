import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Home | Mini-projects">
    <article className="prose">
      <h2>Live projects</h2>

      <ul>
        <b>Programming patterns / features</b>
        <li>
          <Link legacyBehavior href="/users">
            <a>Users List</a>
          </Link>
        </li>
        <li>
          <a href="/api/users">Users API</a>
        </li>
        <li>
          <Link legacyBehavior href="/chess-drag-drop">
            <a>Chess drag drop</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/getStaticProps">
            <a>getStaticProps</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/api-hook">
            <a>api-hook</a>
          </Link>
        </li>
        <b>Ticker Tools</b>
        <li>
          <Link legacyBehavior href="/ticker-tool">
            <a>Ticker Tool</a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="/yahoo-finance">
            <a>yahoo-finance</a>
          </Link>
        </li>
        <b>3rd party integrations</b>
        <li>
          <Link legacyBehavior href="/twilio">
            <a>Twilio</a>
          </Link>
        </li>
        <li>
          <Link href="/stripe">Stripe</Link>
        </li>
        <li>
          <Link href="/whatsapp">WhatsApp</Link>
        </li>
        <b>Other</b>
        <li>
          <Link href="/nodeflow">nodeflow</Link>
        </li>
        <li>
          <Link href="/api-tests">Api Tests</Link>
        </li>
      </ul>
    </article>
  </Layout>
);

export default IndexPage;
