import Link from 'next/link'
import Layout from '../components/Layout'

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1 className="">About</h1>
    <p className="">This is the about page</p>
    <p  >
      <Link href="/">
        <button className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded">Go home</button>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
