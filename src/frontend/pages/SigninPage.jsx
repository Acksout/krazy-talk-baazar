import {useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import {useNavigate} from "react-router-dom";

function SigninPage() {
    const [formData, setFormData] = useState({username: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setError("");
    };

    const handleSignIn = async () => {
        const {username, password} = formData;

        // Input validation
        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/login",
                {
                    username,
                    password,
                },
                {
                    timeout: 10000,
                }
            );

            const token = uuidv4();


            localStorage.setItem("token", token);


            localStorage.setItem("username", username);


            const tokenExpiry = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            localStorage.setItem("tokenExpiry", tokenExpiry.toString());


            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("tokenExpiry");
            }, 24 * 60 * 60 * 1000);


            console.log(token);
            console.log("Login successful");

            navigate("/mainchat");
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setError("Username not found");
                } else if (error.response.status === 401) {
                    setError("Invalid password");
                } else {
                    setError("An error occurred. Please try again later.");
                }
                if (error.code === "ECONNABORTED") {
                    setError("A timeout occurred. Please try again.");
                }
            } else {
                setError("An error occurred. Please check your network connection.");
                console.error(error);
            }
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-xs">
                <form
                    className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSignIn();
                    }}
                >
                    <div className="mb-4">
                        <label
                            className="mb-2 block text-sm font-bold text-gray-700"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-outline focus:outline-none"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="mb-2 block text-sm font-bold text-gray-700"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:shadow-outline focus:outline-none"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {error && <p className="text-xs italic text-red-500">{error}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleSignIn}
                            className="rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700 focus:shadow-outline focus:outline-none"
                            type="submit"
                        >
                            Sign In
                        </button>
                        {/* <a
              className="inline-block align-baseline text-sm font-bold text-orange-500 hover:text-orange-800"
              href="#"
            >
              Forgot Password?
            </a> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SigninPage;
