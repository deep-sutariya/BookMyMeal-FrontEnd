import React from 'react';
import axios from 'axios'

const RequestCard = ({ memail, mname, resid }) => {

    const handleaccept = async () => {
        const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/acceptrequest`, {
            memail, mname, resid
        });
        alert(data?.data?.message);
    }

    const handledecline = async () => {
        const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/declinerequest`, {
            memail, mname, resid
        });
        alert(data?.data?.message);
    }

    return (
        <div className=" w-full bg-transparent mx-auto shadow-3xl rounded overflow-hidden p-6 mb-6">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <p className="text-gray-900">{memail}</p>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <p className="text-gray-900">{mname}</p>
            </div>

            <div className="flex justify-between">
                <button onClick={handleaccept} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Accept
                </button>

                <button onClick={handledecline} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Decline
                </button>
            </div>
        </div>
    );
};

export default RequestCard;
