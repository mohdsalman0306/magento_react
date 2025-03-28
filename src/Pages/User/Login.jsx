import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

const Login = () => {
const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    // username: "mor_2314",
    // password: "83r5^_",
    username: "roni_cost@example.com",
    password: "roni_cost3@example.com",
  });
  const dispatch = useDispatch();
  const {loading, error, token} = useSelector((state) => state.auth)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    const result = dispatch(loginUser(credentials))
    if (result.payload) {
        navigate('/customer/account');
    }
  };

    return (
        <>
            <div className="bg-slate-50">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img alt="Your Company" src="https://sanipexgroup.com/media/athlete2/default/SANIPEX_LOGO_NEW.webp?color=indigo&shade=600" className="mx-auto h-10 w-auto"/>
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            {token && <p style={{ color: "green" }}>Login Successful!</p>}
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                                    <div className="mt-2">
                                        <input id="email" 
                                            name="email" 
                                            type="text"
                                            value={credentials.username}
                                            required
                                            autoComplete="email"
                                            onChange={(e) => setCredentials({...credentials, username: e.target.value,})}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label 
                                            htmlFor="password" 
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >Password</label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input 
                                            id="password" 
                                            name="password" 
                                            type="password" 
                                            value={credentials.password}
                                            required
                                            autoComplete="current-password"
                                            onChange={(e) => setCredentials({...credentials, password: e.target.value,})}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                    </div>
                                </div>
                                <div>
                                    {error && <div className="error">{error}</div>}
                                    <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        {loading ? "Logging in..." : "Sign in"}
                                    </button>
                                </div>
                            </form>
                            <p className="mt-10 text-center text-sm/6 text-gray-500">Not a member?{" "}
                                <Link 
                                    to={"#"}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Start a 14 day free trial
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
