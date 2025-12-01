// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import AllPokemons from "./pages/AllPokemons";

function App() {
  return (
    <BrowserRouter>
      <header
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          background: "white",
          padding: "15px 20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          zIndex: 1000,
        }}
      >
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link to="/">Home</Link>
          <Link to="/all">All Pokemons</Link> {/* new */}
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <div style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<AllPokemons />} /> {/* new */}
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;