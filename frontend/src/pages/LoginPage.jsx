import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const LoginPage = () => {

    const {login} = useAuthStore();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = (value) => (event) => {
        setValues({...values, [value]: event.target.value});
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const isLoginSuccess = await login(values.email, values.password);
        if (isLoginSuccess) {
            navigate('/chat');
        } else {
            setValues({...values, password: ''})
        }
    };
    
    return (
        <Layout>
            <LoginForm>
                <form className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                        <div className="mt-2">
                            <input id="email" type="email" name="email" required autoComplete="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                            className="block text-sm/6 font-medium text-gray-100">Password</label>
                        </div>
                        <div className="mt-3">
                            <input id="password" type="password" 
                            name="password" required autocomplete="current-password"
                            onChange={handleChange('password')}
                            value={values.password}
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>
                    <div className="mt-5">
                        <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Login</button>
                    </div>
                </form>
            </LoginForm>
        </Layout>
    )
}

export default LoginPage;