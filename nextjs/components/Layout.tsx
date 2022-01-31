import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{" "}
        |{" "}
        <Link href="/about">
          <a>About</a>
        </Link>{" "}
        |{" "}
        <Link href="/users">
          <a>Users List</a>
        </Link>{" "}
        | <a href="/api/users">Users API</a> |{" "}
        <Link href="/chess-drag-drop">
          <a>Chess</a>
        </Link>{" "}
        |{" "}
        <Link href="/ticker-tool">
          <a>Ticker Tool</a>
        </Link>{" "}
        |{" "}
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>Footer</span>
    </footer>
  </div>
);

export default Layout;
