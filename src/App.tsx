import { Route, Routes } from "react-router";
import Home from "./pages/home";
import { SurrealProvider } from "./contexts/SurrealProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <SurrealProvider endpoint={"indxdb://presente"} autoConnect>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      </SurrealProvider>
    </QueryClientProvider>
  );
}

export default App;
