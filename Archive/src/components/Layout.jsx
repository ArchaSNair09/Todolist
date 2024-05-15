import React from 'react';
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div className="bg-red-500 h-[60px] flex items-center pl-5">
                <div className="text-xl text-white font-bold">Take Home Challenge</div>
            </div>
            <Outlet />
        </>
    );
};

export default Layout;