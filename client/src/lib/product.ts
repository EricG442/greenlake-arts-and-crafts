export default interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    cost: number;
    quantity: number;
    status: "active" | "archived";
    created_at: string;
    updated_at: string;
}