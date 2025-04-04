import { login as authLogin } from '../store/authslice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { matchPath, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userdata = await authService.getCurrentUser()
                if (userdata) dispatch(authLogin(userdata))
                navigate("/all-post")
            }
            else {

            }
        } catch (error) {
            setError(error.message)
        }

    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-500 text-center mt-6'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input label="Email: " placeholder="Enter Your Email" type="email" {...register("email",{
                            required:true,
                        })}/>
                        <Input label="Password: " placeholder="Enter Password" type="password" {...register("password",{
                            required: true,
                        })} />
                        <Button type="submit" className="w-full">Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;