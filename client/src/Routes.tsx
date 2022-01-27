// import {CSSProperties, useMemo} from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "./Home";
import Chess from "./chess-drag-drop/Chess";

function Layout() {
  return (
    <div>
      <h1>Misc apps</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="chess">Chess</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default function Routes_() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chess" element={<Chess />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
