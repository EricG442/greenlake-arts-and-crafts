import { createBrowserRouter } from "react-router-dom";
import StoreLayout from "@/app/StoreLayout";
import AdminLayout from "@/app/AdminLayout";
import Home from "@/pages/Home";
import Inventory from "@/pages/admin/Inventory";
import Dashboard from "@/pages/admin/Dashboard";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <StoreLayout />,
            children: [
                {
                    index: true,
                    element: <Home />
                }
            ]
        },
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: "inventory",
                    element: <Inventory />
                }
            ]
        }
    ]
)