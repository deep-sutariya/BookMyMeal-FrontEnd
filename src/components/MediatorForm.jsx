import React, { useContext, useState } from 'react';

import Additem from '../assets/Additem.svg'
import axios from 'axios';

import { LoginDetails } from '../contex/Logincontex';

const MediatorForm = () => {

    const { loginuser } = useContext(LoginDetails);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');

    const [formData, setFormData] = useState({
        uage: '',
        ugender: '',
        chef: '',
        type: '',
        city: '',
        area: '',
        year: currentYear,
        month: currentMonth,
        day: currentDay,
        item: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post(`${process.env.REACT_APP_HOST_IP}/medorder`, {
            formData,
            memail: loginuser?.memail
        });
        alert(data?.data?.message);
        if(data?.status===200){
            setFormData({
                uage: '',
                ugender: '',
                chef: '',
                type: '',
                city: '',
                area: '',
                year: currentYear,
                month: currentMonth,
                day: currentDay,
                item: '',
            })
        }
    };

    return (
        <div className="flex justify-center items-center h-[89vh] w-full">
            <div className="contai">
                <img src={Additem} alt="Additemimage" />
            </div>
            <form onSubmit={handleSubmit} className="max-w-lg bg-transparent mx-auto shadow-3xl p-8 border rounded-md">
                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uage">
                            Age
                        </label>
                        <input
                            type="text"
                            id="uage"
                            name="uage"
                            value={formData.uage}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md outline-none focus:border-b-4"
                        />
                    </div>
                    <div className="w-1/2 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ugender">
                            Gender
                        </label>
                        <select
                            id="ugender"
                            name="ugender"
                            value={formData.ugender}
                            onChange={handleChange}
                            className="outline-none focus:border-b-4 w-full p-2 border rounded-md"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="outline-none focus:border-b-4 w-full p-2 border rounded-md"
                        >
                            <option value="">Select Type</option>
                            <option value="pizza">Pizza</option>
                            <option value="burger">Burger</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="w-1/2 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item">
                            Item
                        </label>
                        <select
                            id="item"
                            name="item"
                            value={formData.item}
                            onChange={handleChange}
                            className="outline-none focus:border-b-4 w-full p-2 border rounded-md"
                        >
                            <option value="">Select Item</option>
                            <option value="maxican-pizza">Maxican Pizza</option>
                            <option value="cheese-burger">Cheese Burger</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div>
                <div className="flex mb-4">
                    <div className="w-1/3 mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                            Year
                        </label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="outline-none focus:border-b-4 w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="w-1/3 mx-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="month">
                            Month
                        </label>
                        <input
                            type="text"
                            id="month"
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            className="outline-none focus:border-b-4 w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="w-1/3 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day">
                            Day
                        </label>
                        <input
                            type="text"
                            id="day"
                            name="day"
                            value={formData.day}
                            onChange={handleChange}
                            className="outline-none focus:border-b-4 w-full p-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chef">
                        Chef
                    </label>
                    <select
                        id="chef"
                        name="chef"
                        value={formData.chef}
                        onChange={handleChange}
                        className="outline-none focus:border-b-4 w-full p-2 border rounded-md"
                    >
                        <option value="">Select Chef</option>
                        <option value="chef1">Chef 1</option>
                        <option value="chef2">Chef 2</option>
                        {/* Add more options as needed */}
                    </select>
                </div>


                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="outline-none focus:border-b-4 w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="w-1/2 ml-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">
                            Area
                        </label>
                        <input
                            type="text"
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className="outline-none focus:border-b-4 w-full p-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="mt-6 font-bold tracking-wider">
                    <button
                        type="submit"
                        className="w-full text-white p-3 rounded-md focus:outline-none bg-[#DF7861] hover:bg-[#ECB390]"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MediatorForm;
