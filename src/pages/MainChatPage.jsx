import {useEffect, useState} from "react";
import ChatCardComponent from "../components/ChatCardComponent";
import Sidebar from "../components/Sidebar";
import {useNavigate, useParams} from "react-router-dom";
import userData from "../data/hashedUserData.json";
import axios from "axios";
import {format} from 'date-fns';

function MainChatPage() {
    const navigate = useNavigate();
    const {roomName} = useParams();
    const username = localStorage.getItem("username");
    const currentUserData = userData.find((user) => user.username === username);
    const randomProfileImg = "https://thispersondoesnotexist.com/";
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [checkingToken, setCheckingToken] = useState(false);


    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("token");
            if (!token) {

                navigate("/signin");
            }
        };

        checkToken();


        fetchMessages();


        setCheckingToken(true);
    }, [navigate, roomName]);

    useEffect(() => {
        if (checkingToken) {

            const intervalId = setInterval(() => {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/signin");
                }
            }, 5 * 60 * 1000);

           
            return () => clearInterval(intervalId);
        }
    }, [checkingToken, navigate]);

    const fetchMessages = () => {
        axios
            .get(`http://localhost:5020/apimsg/messages/${roomName}`)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setMessages(response.data);
                } else {
                    console.warn("Warning: Expected 'response.data' to be an array but received type " + typeof response.data);
                }
            })
            .catch((error) => console.error("Error fetching messages for room: ", roomName, error));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    const sendMessage = () => {
        axios
            .post("http://localhost:5020/apimsg/messages", {user: username, message: newMessage})
            .then(() => {
                fetchMessages();
            })
            .catch((error) => console.error("Error sending message:", error));

        setNewMessage("");
    };

    return (
        <div>
            <Sidebar/>

            <nav className="mb-4 flex items-center justify-between px-4 py-2">
                <h1 className="font-serif text-6xl">Chat</h1>
                <ul className="flex">
                    <a
                        onClick={handleLogout}
                        className="ml-4 rounded bg-orange-500 px-4 py-2 font-bold tracking-wide text-white hover:bg-orange-700"
                    >
                        Logout
                    </a>
                    {/* Other menu items */}
                </ul>
            </nav>

            {messages.map((message) => (
                <ChatCardComponent
                    key={message._id}
                    profilePicture={randomProfileImg}
                    username={message.user}
                    message={message.message}
                    date={format(new Date(message.date), 'HH:mm dd.MM.yyyy')}
                />
            ))}

            <div className="flex items-center justify-center">
        <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="mt-4 w-2/5 rounded bg-gray-800 px-4 py-3 font-medium text-gray-100"
        />
                <button
                    onClick={sendMessage}
                    type="button"
                    className="mt-3 ml-2 h-12 w-24 rounded bg-blue-500 font-bold text-white hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default MainChatPage;
