import { supabase } from "../db/supabase.js";
import { Product } from "../types/product.js";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) {
        throw new Error(error.message);
    }
    return data as Product[];
}

export async function getProductByID(id: string): Promise<Product | null> {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) {
        throw new Error(error.message);
    }
    return data as Product | null;
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> {
    const { data, error } = await supabase.from("products").insert([product]).single();
    if (error) {
        throw new Error(error.message);
    }
    return data as Product;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
    const { data, error } = await supabase.from("products").update(product).eq("id", id).single();
    if (error) {
        throw new Error(error.message);
    }
    return data as Product | null;
}

export async function deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
        throw new Error(error.message);
    }
}

export async function uploadProductImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const { data, error } = await supabase.storage.from("product-images").upload(fileName, file.buffer, { contentType: file.mimetype });
    if (error) {
        throw new Error(error.message);
    }
    const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(data.path);
    return publicUrl;
}