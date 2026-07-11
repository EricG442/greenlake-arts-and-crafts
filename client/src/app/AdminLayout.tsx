import { Outlet } from "react-router-dom";

import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner"

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout() {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="flex-1 w-full">
                <SidebarTrigger />
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
            <Toaster />
        </SidebarProvider>
    )
}