//import Link from "next/link";
import Layout from "../components/Layout";
import Chess from "../components/chess-drag-drop/ChessApp";

const AboutPage = () => (
  <Layout title="Chess Example">
    <h1 className="">Chess</h1>
    <p className="">Example chess drag drop</p>
    <Chess />
  </Layout>
);

export default AboutPage;
