import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, Routes } from "react-router";
import Home from "./pages/home";
import { SurrealProvider } from "./contexts/SurrealProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <SurrealProvider
          endpoint={"indxdb://presente"}
          params={{ namespace: "presente", database: "dados" }}
          autoConnect
        >
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </SurrealProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
