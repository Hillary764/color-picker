import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomeScreen from "./Routes/Home/Home.tsx";

import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./MainLayout.tsx";
import NotFound from "./Routes/404/NotFound.tsx";
import IconsScreen from "./Routes/Icons/Icons.tsx";
import ColorCompareScreen from "./Routes/ColorCompare/ColorCompare.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/icons" element={<IconsScreen />} />
          <Route path="palette-compare" element={<ColorCompareScreen />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
