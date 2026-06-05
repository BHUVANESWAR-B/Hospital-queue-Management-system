import ReactDOM from "react-dom/client";
import App from "./App";
import Analytics from "./pages/Analytics";
import PatientFlow from "./pages/PatientFlow";
import Staffing from "./pages/Staffing";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/patient" element={<PatientFlow />} />
      <Route path="/staffing" element={<Staffing />} />
    </Routes>
  </BrowserRouter>
);