import { Routes, Route, Navigate, useParams } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemPage from "./pages/ProblemPage";

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
        <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" /> : <HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
        />
        <Route path="/problem/:id" element={<ProblemPageWrapper />} />
      </Routes>
    </>
  );
}

export default App
