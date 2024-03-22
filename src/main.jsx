import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignupPage from "./frontend/pages/SignupPage.jsx";
import SigninPage from "./frontend/pages/SigninPage.jsx";
import MainChatPage from "./frontend/pages/MainChatPage.jsx";
import ChatRoomPage from "./frontend/pages/ChatRoomPage.jsx";
import {disableReactDevTools} from "@fvilers/disable-react-devtools";
import dotenv from "dotenv";


if (process.env.NODE_ENV === "production") {
    disableReactDevTools();
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/Signup",
        element: <SignupPage/>,
    },
    {
        path: "/Signin",
        element: <SigninPage/>,
    },
    {
        path: "/MainChat",
        element: <MainChatPage/>,
    },
    {
        path: "/chat/:roomName",
        element: <ChatRoomPage/>,
    }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
