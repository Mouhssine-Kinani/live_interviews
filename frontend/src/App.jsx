import { Routes, Route, Navigate, useParams } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemPage from "./pages/ProblemPage";
import SessionPage from "./pages/SessionPage";

function ProblemPageWrapper() {
  const { id } = useParams();
  const { isSignedIn } = useUser();
  if (!isSignedIn) return <Navigate to="/" />;
  return <ProblemPage key={id} />;
}

function App() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
        />
        <Route path="/problem/:id" element={<ProblemPageWrapper />} />
        <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </>
  );
}

export default App;
