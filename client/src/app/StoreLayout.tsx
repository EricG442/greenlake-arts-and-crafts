import { Outlet } from "react-router-dom";

export default function StoreLayout() {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}