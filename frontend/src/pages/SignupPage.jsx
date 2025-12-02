import { useState } from "react";
import SignupForm from "../components/SignupForm";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Signup = () => {
    const {signup} = useAuthStore();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    console.log(values);

    const handleChange = value => event => {
        setValues({...values, [value]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (values.password !== values.confirmPassword) {
            return toast.error('Check your password again');
        }
        const resData = await signup(values);

        if (resData) {
            console.log("Res Data in SignupPage: ", resData)
            navigate('/login');            
        }
    }

    return (
        <Layout>
            <SignupForm>
                <form action="#" method="POST" className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">Name</label>
                        <div className="mt-2">
                        <input id="name" type="text" name="name"
                        value={values.name}
                        required autoComplete="name"
                        onChange={handleChange('name')}
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
                        <div className="mt-2">
                            <input id="email" type="email" name="email" required autoComplete="email"
                            onChange={handleChange('email')}
                            value={values.email}
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                            className="block text-sm/6 font-medium text-gray-100">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" type="password" name="password" required autoComplete="current-password"
                            onChange={handleChange('password')}
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirm-password" 
                            className="block text-sm/6 font-medium text-gray-100">Confirm Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="confirm-password" type="password" name="confirm-password" required autoComplete="current-password"
                            onChange={handleChange('confirmPassword')}
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign Up</button>
                    </div>
                </form>
            </SignupForm>
        </Layout>
    )
}

export default Signup;