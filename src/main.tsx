import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter.tsx";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback="loading...">
      <AppRouter />
    </Suspense>
  </StrictMode>
);
