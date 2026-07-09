import { supabase } from "../db/supabase.js";
import { Product } from "../types/product.js";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) {
        throw new Error(error.message);
    }
    return data as Product[];
}