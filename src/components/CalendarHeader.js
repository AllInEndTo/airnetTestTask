import React, {useContext} from 'react';
import logo from '../assets/airnet.png'
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export default function CalendarHeader () {
    const {monthIndex, setMonthIndex} = useContext(GlobalContext)
    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1)
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1)
    }
    function handleReset() {
        setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month())
    }

    return (
        <header className="px-4 py-2 flex items-center">
            <img src={logo} alt="airnet calendar" className="mr-2 w-26 h-12"/>
            <h1 className="mr-10 text-xl text-gray-500 fond-bold">Календарь</h1>
            <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
                Сегодня
            </button>
            <button onClick={handlePrevMonth}>
                <span className="cursor-pointer text-gray-600 mx-2">
                    {"<"}
                </span>
            </button>
            <button onClick={handleNextMonth}>
                <span className="cursor-pointer text-gray-600 mx-2">
                    {">"}
                </span>
            </button>
            <h2 className="ml-4 text-xl text-gray-500 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).locale('ru').format("MMMM YYYY")}
            </h2>
        </header>
    );
};
