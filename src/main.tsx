import './index.css';
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/AppContext";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </AppProvider>
  </StrictMode>
);