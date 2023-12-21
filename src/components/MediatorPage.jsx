import React, { useContext } from 'react'
import { LoginDetails } from '../contex/Logincontex';
import RequestCard from './RequestCard';

import axios from 'axios'

const MediatorPage = () => {
    const { loginrestaurant } = useContext(LoginDetails);
    const mediator = loginrestaurant?.mediator;
    const requests = loginrestaurant?.requests;
    const resid = loginrestaurant?._id

    const removemediator = async () => {
        const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/removemediator`, {
            memail: mediator?.memail, 
            resid
        });
        alert(data?.data?.message);
    }

    return (
        <div>
            {
                mediator?.length > 0 ?
                    <div className=' flex items-center mx-auto flex-col gap-y-6'>
                        <h1 className=' underline text-center mt-16'>Current Mediator Name : <span className=' font-bold'>{mediator[0]?.mname}</span></h1>
                        <h1 className=' underline text-center'>Current Mediator Email : <span className=' font-bold'>{mediator[0]?.memail}</span></h1>
                        <button onClick={removemediator} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Remove Mediator
                        </button>
                    </div>
                    :
                    <>
                        <h1 className=' underline text-center mt-16'>Requests</h1>
                        <div className=' w-5/6 mx-auto mt-20 gap-x-6 grid grid-cols-2'>
                            {
                                requests?.length > 0 ?
                                    requests?.map(({ mname, memail }, index) => (
                                        <RequestCard key={index} mname={mname} memail={memail} resid={resid} />
                                    ))
                                    :
                                    <h1>No Request Found</h1>
                            }
                        </div>
                    </>
            }

        </div>
    )
}

export default MediatorPage