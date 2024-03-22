// Sidebar component
import React, {useState} from "react";
import plusSvg from "../assets/plus-square-svgrepo-com.svg";
import ChatRoomComponent from "./ChatRoomComponent.jsx";
import {useNavigate} from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    const [currentChatRoom, setCurrentChatRoom] = useState("Random");


    const handleRoomSelect = (roomName) => {
        setCurrentChatRoom(roomName);
        navigate(`/chat/${roomName}`);
    };


    const roomNames = ["Random", "Tech", "Shop", "Chat", "Music", "Health", "Gaming"];
    return (
        <aside
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full overflow-y-auto bg-gray-800 px-3 py-4">
                <h1 className="mb-4 rounded border border-solid border-stone-50 bg-orange-500 p-2 text-center text-2xl font-black text-white">
                    Social Clubs
                </h1>

                <ul className="font-medium space-y-2">
                    {roomNames.map(room => (
                        <ChatRoomComponent
                            key={room}
                            roomName={room}
                            onSelect={handleRoomSelect}
                            isActive={currentChatRoom === room}
                        />
                    ))}

                    <li>

                        <a

                            className="flex items-center justify-center rounded-lg p-2 text-white group hover:bg-gray-700"
                        >
                            <img
                                src={plusSvg}
                                className="h-8 w-8 text-white transition duration-75"
                                alt="Add new category"
                            />
                        </a>
                    </li>
                </ul>
            </div>

        </aside>
    );
}

export default Sidebar;
