import { useEffect, useState } from "react"
import InputField from "../inputfield/InputField"
import { SignupDataType, useMyContext } from "../../../context/contextAPI"
import { Link, useNavigate } from "react-router-dom"

export type TargetValueType = {
    title: string,
    value: string | number
}

export type ErrorType = {
    title: string | null,
    msg: string | null
}

const Signup = () => {
    const [name, setName] = useState<string | null>(null);
    const [phone, setPhone] = useState<number | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [dob, setDob] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [error, setError] = useState<ErrorType | null>(null);
    const { handleSignup, isUserLoggedIn, isLoading } = useMyContext();
    const navigate = useNavigate();
    

    
    const handleOnSubmit = async () => {
        if(!name || name.length < 4){
            setError({
                title: "name",
                msg: "Enter full name"
            });
            return;
        }
        else if(!phone || phone.toString().length < 10){
            setError({
                title: "phone",
                msg: "Enter mobile number"
            });
            return;
        }
        else if(!email){
            setError({
                title: "email",
                msg: "Enter email address"
            });
            return;
        }
        else if(!dob){
            setError({
                title: "dob",
                msg: "Select date of birth"
            });
            return;
        }
        else if(!address){
            setError({
                title: "address",
                msg: "Enter address"
            });
            return;
        }
        else if(!password || password.length < 4){
            setError({
                title: "password",
                msg: "Set a password"
            });
            return;
        }

        setError(null);

        const apiData:SignupDataType = {
            name,
            address,
            dob,
            email,
            phone,
            password
        }

        await handleSignup(apiData)
    }


    const handleTargetValues = (target:TargetValueType) => {
        const value = target.value as string;
        switch(target.title){
            case "name":
                setName(value);
                return;
            case "phone":
                setPhone(target.value as number);
                return;
            case "email":
                setEmail(value);
                return;
            case "dob":
                setDob(value);
                return;
            case "address":
                setAddress(value);
                return;
            case "password":
                setPassword(value);
                return;
            default: 
             console.log("Something went wrong!");
        }
    }

    useEffect(() => {
        if(isUserLoggedIn){
            navigate("/aadhar")
        }
    }, [isUserLoggedIn, isLoading]);

  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
    }} className="py-4 px-4 mx-4 w-full flex flex-col round-lg shadow-md" >
        <h1 className="font-semibold text-xl" >Aadhar Card Registration</h1>
        <InputField
        identity="name"
        type="text"
        title="Full Name"
        placeholder="Enter your full name"
        handle={handleTargetValues}
        error={error || undefined}
         />
         <InputField
         identity="phone"
        type="number"
        title="Mobile Number"
        placeholder="Enter your active mobile number"
        handle={handleTargetValues}
        error={error || undefined}
         />
        <InputField
        identity="email"
        type="email"
        title="Email ID"
        placeholder="Enter Email ID"
        handle={handleTargetValues}
        error={error || undefined}
         />
        <InputField
        identity="dob"
        type="date"
        title="Date of Birth"
        placeholder="Select DOB"
        handle={handleTargetValues}
        error={error || undefined}
         />
        <InputField
        identity="address"
        type="text"
        title="Address"
        placeholder="Enter your residential address"
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

         <Link to={"/signin"} className="text-xs pb-1" >Have an account already</Link>

         <button disabled={isLoading} type="submit" style={{borderColor: "transparent", backgroundColor: isLoading ? "black" : ""}} className="px-3 cursor-pointer py-2 bg-color text-color outline-none round-md" >
            Create Aadhar
         </button>
    </form>
  )
}

export default Signup
