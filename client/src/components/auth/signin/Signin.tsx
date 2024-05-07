import { useEffect, useState } from "react";
import InputField from "../inputfield/InputField";
import { ErrorType, TargetValueType } from "../signup/Signup";
import { SigninDataType, useMyContext } from "../../../context/contextAPI";
import { Link, useNavigate } from "react-router-dom";


const Signin = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const { isLoading, handleSignin, isUserLoggedIn } = useMyContext();
    const [error, setError] = useState<ErrorType | null>(null);
    const navigate = useNavigate();

    const handleTargetValues = (target:TargetValueType) => {
        const value = target.value as string;
        switch(target.title){
            case "email":
                setEmail(value);
                return;
            case "password":
                setPassword(value);
                return;
            default: 
             console.log("Something went wrong!");
        }
    }

    const handleOnSubmit = async () => {
        if(!email){
            setError({
                title: "email",
                msg: "Email is required"
            });
            return;
        }
        else if(!password || password.toString().length < 4){
            setError({
                title: "password",
                msg: "Password is required"
            });
            return;
        }

        setError(null);

        const apiData:SigninDataType = {
            email,
            password
        }

        await handleSignin(apiData)
    }

    useEffect(() => {
        if(isUserLoggedIn){
            navigate("/aadhar")
        }
    }, [isUserLoggedIn, isLoading]);

  return (
    <div className="min-h-screen form-max-width mx-auto flex items-center" >
    <form onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
    }} className="py-4 px-4 mx-4 w-full flex flex-col round-lg shadow-md" >
        <h1 className="font-semibold text-xl" >Login your account</h1>
        <InputField
        identity="email"
        type="email"
        title="Email"
        placeholder="Enter email address"
        handle={handleTargetValues}
        error={error || undefined}
         />
         <InputField
         identity="password"
        type="password"
        title="Password"
        placeholder="Enter password"
        handle={handleTargetValues}
        error={error || undefined}
         />
         <Link to={"/"} className="text-xs pb-1" >Don't have an account</Link>
         <button disabled={isLoading} type="submit" style={{borderColor: "transparent", backgroundColor: isLoading ? "black" : ""}} className="px-3 cursor-pointer py-2 bg-color text-color outline-none round-md" >
            Log in
         </button>
    </form>
    </div>
  )
}

export default Signin
