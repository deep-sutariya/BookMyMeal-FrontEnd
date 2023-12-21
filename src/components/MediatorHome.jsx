import React, { useEffect } from 'react'

import { Outlet } from "react-router-dom";

const MediatorHome = ({ setNavType }) => {

    useEffect(() => {
        setNavType("mediator")
    }, [])
    // const [restaurents, setRestaurents] = useState([]);
    // let [loading, setLoading] = useState(true);

    // const getData = async () => {
    //   setLoading(true);
    //   const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/res`);
    //   setRestaurents(data.data);
    //   setLoading(false);
    // };
    // useEffect(() => {
    //   getData();
    // }, []);
    return (
        <>
            <Outlet />

        </>
    );

};

export default MediatorHome