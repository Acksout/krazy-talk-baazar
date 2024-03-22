import React from "react";
import hashSvg from "../assets/hash-svgrepo-com.svg";


export default function ChatRoomComponent({roomName, onSelect, isActive}) {


    const activeClass = isActive ? "bg-blue-500" : "hover:bg-gray-700";


    return (
        <li
            onClick={() => onSelect(roomName)}
            className={`cursor-pointer p-2 rounded-lg text-white ${activeClass}`}>
            <a
                className="flex items-center rounded-lg text-white group"
            >
                <img
                    src={hashSvg}
                    className="h-5 w-5 text-gray-400 transition duration-75 group-hover:text-white"
                    alt=""
                />
                <span
                    className="font-bold ml-3">{roomName}</span>
            </a>
        </li>


    );
}
