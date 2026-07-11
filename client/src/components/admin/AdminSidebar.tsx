import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar";

import {
    LayoutDashboard,
    Package,
    ShoppingCart
} from "lucide-react";

import { Link } from "react-router-dom";

const items = [
    {
        title: "Dashboard",
        url: "/admin/",
        icon: LayoutDashboard
    },
    {
        title: "Inventory",
        url: "/admin/inventory",
        icon: Package
    },
    {
        title: "Orders",
        url: "/admin/orders",
        icon: ShoppingCart
    }
];

export default function AdminSidebar() {
    const { isMobile, setOpenMobile, setOpen } = useSidebar();
    const handleLinkClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        } else {
            setOpen(false);
        }
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Hearts & Crafts
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map( item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton>
                                        <Link to={item.url} onClick={handleLinkClick}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}