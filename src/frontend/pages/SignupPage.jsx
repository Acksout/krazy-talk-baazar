import {useState} from "react";
import axios from "axios";

function SignupPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState("");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {username, password} = formData;

        const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
        const passwordRegex = /^.{6,16}$/;

        const newErrors = {};

        if (!username) {
            newErrors.username = "Username cannot be empty";
        } else if (!usernameRegex.test(username)) {
            newErrors.username =
                "Invalid username. Username must be between 3 to 16 characters.";
        }

        if (!password) {
            newErrors.password = "Password cannot be empty";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Password must be between 6 and 16 characters";
        }

        if (Object.keys(newErrors).length === 0) {
            setFormData((prevData) => ({
                ...prevData,
            }));

            try {

                const response = await axios.post(
                    "http://localhost:8080/api/checkusername",
                    {
                        username,
                    }
                );
                if (response.data.exists) {
                    newErrors.username = "Username already exists";
                    setErrors(newErrors);
                } else {

                    await axios.post("http://localhost:8080/api/signup", {
                        username,
                        password,
                    });
                    setLoginSuccess("User created successfully, You can login now!");
                    console.log("User created successfully");
                }
            } catch (error) {
                console.error(
                    "Error checking username or creating user:",
                    error.response.data
                );
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full max-w-xs">
                <form
                    className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
                    onSubmit={handleSubmit}
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
                        {errors.username && (
                            <p className="text-xs italic text-red-500">{errors.username}</p>
                        )}
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
                        {errors.password && (
                            <p className="text-xs italic text-red-500">{errors.password}</p>
                        )}
                        <div className="text-green-500">
                            <p>{loginSuccess}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700 focus:shadow-outline focus:outline-none"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
