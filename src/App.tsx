import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageErrorFallback } from "./components/lib";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
