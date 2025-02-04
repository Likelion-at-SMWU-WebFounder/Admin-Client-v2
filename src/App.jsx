import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ApplicationStatusPage from "./pages/recruit/ApplicationStatusPage";
import PassedApplicantsPage from "./pages/recruit/PassedApplicantsPage";
import DocumentItemsPage from "./pages/recruit/DocumentItemsPage";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import GlobalStyle from "./style/GlobalStyle";
import DocumentItemsEditPage from "./pages/recruit/DocumentItemsEditPage";
import DocumentDetailPage from "./pages/recruit/DocumentDetailPage";
import InterviewTimePage from "./pages/recruit/InterviewTimePage";
import PassFinalPage from "./pages/recruit/PassFinalPage";
import InitApplicantPage from "./pages/recruit/InitApplicantPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router basename="/sooklion-admin">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/apply"
            element={
              <PrivateRoute>
                <ApplicationStatusPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pass"
            element={
              <PrivateRoute>
                <PassedApplicantsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/document"
            element={
              <PrivateRoute>
                <DocumentItemsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editdocument"
            element={
              <PrivateRoute>
                <DocumentItemsEditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/apply/:joinerId"
            element={
              <PrivateRoute>
                <DocumentDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/interview"
            element={
              <PrivateRoute>
                <InterviewTimePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pass-final"
            element={
              <PrivateRoute>
                <PassFinalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/init-applicant"
            element={
              <PrivateRoute>
                <InitApplicantPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
