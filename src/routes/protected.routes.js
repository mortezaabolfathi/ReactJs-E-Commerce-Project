import React, { useEffect } from 'react';
import { Navigate , Outlet, useLocation } from 'react-router-dom';
import { PATHS } from 'configs/routes.config';
import { CheckUserExpired, removeAllUserData } from 'utils/functions.util';

// Protected Pages Just For Logged In Users
const useAuth = () => 
{
    if(localStorage.hasOwnProperty('IS_LOGGED_IN')) {
        return JSON.parse(localStorage.getItem('IS_LOGGED_IN'));
    } else {
        return false;
    }
}

export const ProtectedRtoutes = () => {

    const location = useLocation();
    useEffect(() => {
        CheckUserExpired("Protected");
    },[location]);

    const isAuth = useAuth();
    if(isAuth == true || isAuth == "true") {
        return <Outlet/>;
    } else {
        removeAllUserData();
        return <Navigate to= {PATHS.LOGIN} />;
    }
};

// Protected Pages Just For Admin Users
const useAdminAuth = () => 
{
    if(localStorage.hasOwnProperty('userData')) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        return userData.role;
    } else {
        return false;
    }
}

export const ProtectedForAdminRtoutes = () => {

    const location = useLocation();
    useEffect(() => {
        CheckUserExpired("ProtectedForAdmin");
    },[location]);

    const isAuth = useAuth();
    const isAdminAuth = useAdminAuth();
    return isAuth && isAdminAuth == "admin" ? <Outlet/> : <Navigate to= {PATHS.DASHBOARD} />;
};