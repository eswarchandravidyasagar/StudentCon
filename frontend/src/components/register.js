import React from "react"; 
import { useAuth } from "../AuthContext";
import { register } from "../api"; 



function Register() {

    const { login } = useAuth();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e) => {

        if (username.length < 4) {
            alert("Username must be at least 4 characters long");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }


        //check if username is already taken

        if (username === "admin") {
            alert("Username is already taken");
            return;
        }


        e.preventDefault();

        try {
            const userData = await register(username, password);

            console.log(userData);
            console.log("Registering user... suucessful");


            login(userData);

        } catch (error) {
            console.error(error);
        }
    }



  return (

    <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Register
            </button>
        </form>
    </div>
  )
}

export default Register;