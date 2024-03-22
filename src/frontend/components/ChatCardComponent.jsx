import React from "react";

function ChatCardComponent({profilePicture, username, message, date}) {
    return (
        <div className="mt-3 flex w-full justify-center">
            <div className="w-1/2">
                <div className="flex flex-col justify-between rounded-lg border border-gray-400 bg-white p-4">
                    <div className="flex items-center">
                        <img
                            className="mr-4 h-10 w-10 scale-125 transform rounded-full border border-gray-400 object-cover"
                            src={profilePicture}
                            alt="Random avatar"
                        />

                        <div className="text-sm">
                            <p className="leading-none text-orange-500">{username}</p>
                            <p className="text-gray-600">{date}</p>
                        </div>
                    </div>
                    <p className="mt-2 text-base text-gray-700">{message}</p>
                </div>
            </div>
        </div>
    );
}

export default ChatCardComponent;
