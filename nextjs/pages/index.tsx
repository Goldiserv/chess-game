import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    
    <article className="prose">
    <h1>Project ideas</h1>

    <ul className="">
      <li className=""> SMS sender/receiver </li>
      <li>
        AI app
        <ul>
          <li>Watch screen and log inputs</li>
          <li>Sharpen text</li>
          <li>Get dates ready for Excel</li>
          <li>Pixel art generator</li>
        </ul>
      </li>
      <li> TTS </li>
      <li> Lipsync </li>
      <li>
        Video call
        <ul>
          <li>Elder listening service</li>
        </ul>
      </li>
      <li> Stripe payment </li>
      <li> Small game (e.g. pong) </li>
    </ul>
    </article>
  </Layout>
);

export default IndexPage;
