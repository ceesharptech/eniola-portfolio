import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Portfolio from "./Portfolio";
import Guestbook from "./pages/Guestbook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/guestbook" element={<Guestbook />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
