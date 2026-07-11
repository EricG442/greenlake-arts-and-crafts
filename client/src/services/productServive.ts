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

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> {
    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error("Failed to create product");
    }
    return response.json() as Promise<Product>;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error(`Failed to update product with ID ${id}`);
    }
    return response.json() as Promise<Product>;
}

export async function deleteProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to delete product with ID ${id}`);
    }
    return response.json() as Promise<Product>;
}

export async function uploadProductImage(imageFile: File): Promise<any> {
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await fetch(`${API_URL}/products/image`, {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        throw new Error("Failed to upload image for product");
    }
    return response.json();
}
