import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import ErrorPage from "../pages/ErrorPage"
import HomePage from "../pages/HomePage"
import Transactions from "../pages/Transactions"
import LoginPage from "../pages/LoginPage"
import Categories from "../pages/Categories"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "categories",
                element: <Categories/>
            },
            {
                path: "transactions",
                element: <Transactions/>
            },
            {
                path: "auth",
                element: <LoginPage/>
            },
            {
                path: "*",
                element: <ErrorPage/>
            }
        ]
    }
])