import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from "./App"
import Aadhar from "./page/Aadhar"
import Signin from "./components/auth/signin/Signin"


const Router = () => {
    const router = createBrowserRouter([
        {
            path:"/",
            element: <App />
        },
        {
            path:"/signin",
            element: <Signin />
        },
        {
            path:"/aadhar",
            element: <Aadhar />
        }
    ])

    return <RouterProvider router={router} />
    
}

export default Router
