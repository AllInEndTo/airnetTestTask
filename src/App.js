import React, {useContext, useEffect, useState} from "react";
import './App.css';
import getMonth from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";

export default function App() {
    const [currentMonth, setCurrentMonth] = useState(getMonth)
    const {monthIndex} = useContext(GlobalContext)
    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])
    return (
        <React.Fragment>
            <div className="h-screen flex flex-col">
                <CalendarHeader />
                <div className="flex flex-1">
                    <Sidebar/>
                    <Month month={currentMonth}/>

                </div>
            </div>
        </React.Fragment>
    );
}
