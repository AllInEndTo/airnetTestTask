import React, {useContext} from 'react';
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton(){
    const {setShowEventModal} = useContext(GlobalContext)
    return (
        <button onClick={() => setShowEventModal(true)} className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl">
            <span className="pl-3 pr-4">Создать</span>
        </button>
    );
};