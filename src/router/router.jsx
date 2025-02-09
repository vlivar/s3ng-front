import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import ErrorPage from "../pages/ErrorPage"
import HomePage from "../pages/HomePage"
import Transactions from "../pages/Transactions"
import Categories from "../pages/Categories"
import Auth from "../pages/Auth"

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
                element: <Auth/>
            },
            {
                path: "*",
                element: <ErrorPage/>
            }
        ]
    }
])