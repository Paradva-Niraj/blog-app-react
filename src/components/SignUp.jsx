import authService from "../appwrite/auth";
import { Link,useNavigate } from "react-router-dom";
import { login } from "../store/authslice";
import {Button,Input,Logo} from './index'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";

function SignUp() {
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const dispatch = useDispatch()
    const {register,handleSubmit}= useForm()

    const Create = async(data)=>{
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const user = authService.getCurrentUser()
                if(user) dispatch(login(user))
                    navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return ( 
<div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(Create)}>
                    <div className="space-y-5">
                        <Input label="Full Nmae"
                        placeholder="Enter Your Name"
                        {
                            ...register("name",{
                                require:true,
                            })
                        } />
                        <Input label="Email: " placeholder="Enter Your Email" type="email" {...register("email",{
                            required:true,
                        })}/>
                        <Input label="Password: " placeholder="Enter Password" type="password" {...register("password",{
                            required: true,
                        })} />
                        <Button type="submit" className="w-full">create Account</Button>
                    </div>
                </form>
        </div>
    </div>
     );
}

export default SignUp;