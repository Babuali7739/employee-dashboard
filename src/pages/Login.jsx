import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            navigate("/list");
        } else {
            alert("Invalid credentials");
        }
    };
    return (
        <div className="h-screen flex justify-center item-center" >
            <form onSubmit={handleSubmit} className=" p-6 border rounded">
                <h2 className="text-xl mb-4">Login</h2>
                <input 
                placeholder="username"
                className="border p-2 mb-3 w-full"
                onChange={ (e) =>
                    setUsername(e.target.value )
                 }
                 />
                 <input
                 placeholder="password"
                 type="password"
                 className="border p-2 mb-3 w-full"
                 onChange={ (e) =>
                    setPassword(e.target.value )    
                    }

                 />

                    <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
            </form>

                

        </div>
    );
};

export default Login;