import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import MapPage from "./pages/MapPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 12, fontSize: 12, opacity: 0.7 }}>App mounted ✅</div>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/spot/:id" element={<DetailPage />} />
        <Route path="/spot/:id/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}
