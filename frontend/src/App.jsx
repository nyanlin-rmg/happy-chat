import React, { useEffect, useState } from "react";
import AppRoutes from "./router/AppRoutes";
import { useAuthStore } from "./store/useAuthStore";
import Loading from "./components/Loading";

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
      checkAuth();
  }, [checkAuth]);
  
  return (
    isCheckingAuth ? <Loading/> : <AppRoutes/>    
  )
}

export default App;