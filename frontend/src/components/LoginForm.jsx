import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
        return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <MessageCircle
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Login To Your Account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {props.children}
                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Don't have an account yet? 
                    <Link to={'/signup'}
                        className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                        Click Here To Register                    
                    </Link>
                    </p>
                </div>
                </div>
        </>
    )
}

export default LoginForm;