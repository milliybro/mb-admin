import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./components/layout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import TeachersStudent from "./pages/TeachersStudent";

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("IS_LOGIN"));
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage setIsLogin={setIsLogin} />} />
        {isLogin ? (
          <Route element={<LayoutAdmin setIsLogin={setIsLogin} />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="teachers" element={<TeacherPage />} />
            <Route path="students" element={<StudentPage />} />
            <Route path="/teachers/:teachersId" element={<TeachersStudent />} />
          </Route>
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
