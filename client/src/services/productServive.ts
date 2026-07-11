import type Product from "@/lib/product";

const API_URL = import.meta.env.VITE_API_URL as string || "http://localhost:5000/api";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json() as Promise<Product[]>;
}

export async function getProductByID(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product with ID ${id}`);
    }
    return response.json() as Promise<Product>;
}