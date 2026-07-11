import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductByID, createProduct, updateProduct, deleteProduct } from "@/services/productServive";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 

type ProductFormData = {
    name: string;
    description: string;
    category: string;
    price: number;
    cost: number;
    quantity: number;
    status: "active" | "archived";
};

export default function ProductForm() {
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        description: "",
        category: "",
        price: 0,
        cost: 0,
        quantity: 0,
        status: "active",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEdit) {
            await updateProduct(id, formData);
        } else {
            await createProduct(formData);
        }
    };

    useEffect(() => {
        if (!id) return;

        const loadProduct = async () => {
            const product = await getProductByID(id);

            setFormData({
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                cost: product.cost,
                quantity: product.quantity,
                status: product.status,
            })
        }

        loadProduct();
    }, [id]);

    return (
        <div className="max-w-2xl">
            <h1 className="mb-6 text-3xl font-bold">Product Form</h1>

            <form 
                onSubmit={handleSubmit}
                className="space-y-6"
            >
            {/* fields go here */}
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={e => {
                            setFormData(prev => ({ ...prev, description: e.target.value }))
                        }}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input 
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input 
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={e => {
                                setFormData(prev => ({ ...prev, price: Number(e.target.value) }))
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cost">Cost</Label>
                        <Input 
                            id="cost"
                            name="cost"
                            value={formData.cost}
                            onChange={e => {
                                setFormData(prev => ({ ...prev, cost: Number(e.target.value) }))
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input 
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={e => {
                                setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    {isEdit && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete this product?")) {
                                    deleteProduct(id);
                                }
                            }}
                        >
                            Delete Product
                        </Button>
                    )}
                    <Button type="submit">
                        {isEdit ? "Update Product" : "Create Product"}
                    </Button>
                </div>
            </form>
        </div>
    );
}