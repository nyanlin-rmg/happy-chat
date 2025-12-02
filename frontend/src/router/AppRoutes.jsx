import React, {useEffect} from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Signup from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import ChatPageClone from "../pages/ChatPageClone";
import ChatPage from "../pages/ChatPage";
import NotFoundPage from "../pages/NotFoundPage";
import { useAuthStore } from "../store/useAuthStore";

const AppRoutes = () => {
    const {isAuthenticate} = useAuthStore();
    return (
        <Routes>
            <Route path="/signup" element={isAuthenticate ? <Navigate to={'/chat'}/>:<Signup/>} />
            <Route path="/login" element={isAuthenticate ? <Navigate to={'/chat'}/> : <LoginPage/>}/>
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<HomePage/>} />
                <Route path="/chat" element={<ChatPageClone/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default AppRoutes;