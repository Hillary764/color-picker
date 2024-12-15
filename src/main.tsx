import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomeScreen from "./Routes/Home/Home.tsx";

import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./MainLayout.tsx";
import NotFound from "./Routes/404/NotFound.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
