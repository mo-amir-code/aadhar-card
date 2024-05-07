import { ReactNode, createContext, useContext, useState } from "react";

const myContextInitialState = {
    isUserLoggedIn: false,
    userInfo: null,
    handleSignup: () => {},
    handleSignin: () => {},
    setIsUserLoggedIn: () => {},
    isLoading: false
}

interface MyContextType {
    isUserLoggedIn: boolean,
    userInfo: UserInfoType | null,
    handleSignup: Function,
    handleSignin: Function,
    setIsUserLoggedIn: Function,
    isLoading: boolean
}

interface UserInfoType {
    uid: string,
    name: string,
    dob: string,
    address: string,
    phone: number,
}

const MyContext = createContext<MyContextType>(myContextInitialState);


export interface SignupDataType{
    name:string,
    phone: number,
    password: string,
    email:string,
    dob:string,
    address: string
}

export interface SigninDataType {
    email:string,
    password: string
}

const MyContextProvider = ({children}:{children:ReactNode}) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);


    const handleSignup = async (data:SignupDataType) => {
        try {
            setIsLoading(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const resData = await res.json();

            if(resData.success){
                setUserInfo(resData.data);
                setIsUserLoggedIn(true);
            }

            if(resData.success === false){
                alert(resData.message)
            }

            setIsLoading(false);

        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
            setIsLoading(false);
        }
    }

    const handleSignin = async (data:SigninDataType) => {   
        try {
            setIsLoading(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const resData = await res.json();

            if(resData.success){
                setUserInfo(resData.data);
                setIsUserLoggedIn(true);
            }

            if(resData.success === false){
                alert(resData.message)
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
            setIsLoading(false);
        }
    }



    return (
        <MyContext.Provider value={{isUserLoggedIn, userInfo, handleSignup, handleSignin, setIsUserLoggedIn, isLoading}} >
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => useContext(MyContext);

export default MyContextProvider;