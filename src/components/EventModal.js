import React, {useContext, useState} from 'react';
import GlobalContext from "../context/GlobalContext";

const labelClasses = ['teal', 'gray', 'green', 'blue', 'red', 'purple']

export default function EventModal() {
    const {setShowEventModal, daySelected, dispatchCalEvent, selectedEvent} = useContext(GlobalContext)
    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : "")
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : "")
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelClasses.find((lbl) => lbl === selectedEvent.label)
            : labelClasses[0])

    function handleSubmit(e) {
        e.preventDefault()
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        if (selectedEvent) {
            dispatchCalEvent({type: 'update', payload: calendarEvent})
        } else {
            dispatchCalEvent({type: 'push', payload: calendarEvent})
        }
        setShowEventModal(false)
    }

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-white rounded-lg shadow-2xl w-1/4">
                <header className="bg-grey-100 px-4 py-2 flex justify-between items-center">
                    <span className="text-gray-400">
                        {" "}
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={() => {
                                    dispatchCalEvent({type: 'delete', payload: selectedEvent})
                                    setShowEventModal(false)
                                }}
                                className="text-red-300 cursor-pointer mr-5">
                                Удалить
                            </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <span className="text-gray-400">
                                {"X"}
                            </span>
                        </button>
                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1 items-end gap-y-3">
                        <div></div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Заголовок"
                            value={title}
                            required
                            className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setTitle(e.target.value)}/>
                        <input
                            type="text"
                            name="description"
                            placeholder="Описание"
                            value={description}
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}/>
                        <div className="flex gap-x-2">
                            {labelClasses.map((lblClass, i) => (
                                <span key={i}
                                      onClick={() => setSelectedLabel(lblClass)}
                                      className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}>
                                    {selectedLabel === lblClass && <span className="text-black text-sm">
                                        {"•"}
                                    </span>}
                                </span>
                            ))}
                        </div>
                        <p className="text-center">{daySelected.locale('ru').format("dddd, MMMM, DD")}</p>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
                        Добавить
                    </button>
                </footer>
            </form>
        </div>
    );
};