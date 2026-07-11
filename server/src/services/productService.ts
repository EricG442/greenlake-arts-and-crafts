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