import React, { useEffect } from 'react'

import { Outlet } from "react-router-dom";

const MediatorHome = ({ setNavType }) => {

    useEffect(() => {
        setNavType("mediator")
    }, [])

    return (
        <>
            <Outlet />
        </>
    );

};

export default MediatorHome