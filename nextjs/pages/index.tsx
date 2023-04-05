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
          <Link href="/stripe">
            Stripe
          </Link>
        </li>
        <li>
          <Link href="/whatsapp">
            WhatsApp
          </Link>
        </li>
      </ul>

      <h2>Project ideas</h2>
      <ul>
        <li> SMS sender/receiver </li>
        <li>
          AI / automation
          <ul>
            <li>Watch screen and log inputs to automate tasks</li>
            <li>Sharpen a paragraph of text</li>
            <li>Get dates ready for Excel</li>
            <li>Pixel art generator</li>
            <li>Voice transformation</li>
          </ul>
        </li>
        <li>
          Speech
          <ul>
            <li>TTS</li>
            <li>Animated lip-sync</li>
          </ul>
        </li>
        <li>
          Video call
          <ul>
            <li>Elder listening service</li>
            <li>
              Omegle but with rules to help w long term relationship building
            </li>
          </ul>
        </li>
        <li> Stripe payment </li>
        <li>
          Auth
          <ul>
            <li>Sign in w Google</li>
          </ul>
        </li>
        <li>
          Games
          <ul>
            <li>Pong</li>
          </ul>
        </li>
        <li>
          Finance
          <ul>
            <li>Managed fund lookup</li>
            <li>Read financial statement</li>
          </ul>
        </li>
      </ul>
    </article>
  </Layout>
);

export default IndexPage;
