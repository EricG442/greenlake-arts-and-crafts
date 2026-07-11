import { useEffect, useState } from "react";
import { Link } from "react-router";

import type Product from "@/lib/product";

import { getProducts } from "@/services/productServive";

import InventoryTable from "@/components/admin/InventoryTable";
import { Button } from "@/components/ui/button";

export default function Inventory() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Inventory
                </h1>
                <Button>
                    <Link to="/admin/inventory/new">Add Product +</Link>
                </Button>
            </div>

            <InventoryTable
                products={products}
            />
        </div>
    );
}