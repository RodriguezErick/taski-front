import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

export default function AppRouter(){
    return(
        <Routes>
            <Route path="/" element={<LoginPage />} /> 
            <Route path="/verify" element={<VerifyEmailPage />} /> 
            <Route path="/reset-password" element={<ResetPasswordPage />} /> 
            {/* Default route if do not find any route */}
            <Route path="*" element={<Navigate to="/" />} /> 

        </Routes>
    );
}