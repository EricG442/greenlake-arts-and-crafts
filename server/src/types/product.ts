export interface Product {
    id: string;
    name: string;
    description: string | null;
    category: string | null;
    price: number;
    cost: number | null;
    quantity: number;
    status: "active" | "archived";
    created_at: string;
    updated_at: string;
};