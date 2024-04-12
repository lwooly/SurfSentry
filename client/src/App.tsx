import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Layout from "./components/global/Layout/Layout";
import Callback from "./pages/Callback/Callback";
import { useAuth0 } from "@auth0/auth0-react";
import NotFoundPage from "./pages/NotFound";

function App() {

  const {isLoading} = useAuth0()

  if (isLoading) {
    return (
      <div>
        <h2>Page loading....</h2>
      </div>
    )
  }

  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/callback" element={<Callback />} />
          <Route path="/" index element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
