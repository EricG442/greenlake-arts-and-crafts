import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductByID, createProduct, updateProduct, deleteProduct } from "@/services/productServive";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function ProductForm() {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const DRAFT_KEY = "product-draft";

    type ProductFormData = {
        name: string;
        description: string;
        category: string;
        price: number;
        cost: number;
        quantity: number;
        status: "active" | "archived";
    };

    const initialFormData: ProductFormData = {
        name: "",
        description: "",
        category: "",
        price: 0,
        cost: 0,
        quantity: 0,
        status: "active",
    };

    const [formData, setFormData] = useState<ProductFormData>(() => {
        if (isEdit) return initialFormData;
        const draft = localStorage.getItem(DRAFT_KEY);
        return draft ? (JSON.parse(draft) as ProductFormData) : initialFormData;
    });

    const isFormEmpty = Object.values(formData).some(value => !value);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value } as ProductFormData));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormEmpty) {
            alert("Please fill in all fields");
            return;
        }
        if (isEdit) {
            await updateProduct(id, formData);
        } else {
            await createProduct(formData);
            localStorage.removeItem(DRAFT_KEY);
        }
        toast(isEdit ? "Product updated successfully!" : "Product created successfully!", {position: "top-center"});
        navigate("/admin/inventory");
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

    useEffect(() => {
        if (isEdit) return;
        const savedDraft = localStorage.getItem(DRAFT_KEY);
        if (savedDraft) setFormData(JSON.parse(savedDraft));
    }, [isEdit]);

    useEffect(() => {
        if (!isEdit) {
            localStorage.setItem(
                DRAFT_KEY,
                JSON.stringify(formData)
            )
        }
    }, [formData,isEdit])

    return (
        <div className="max-w-2xl">
            <form 
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                            <div className="flex flex-row gap-4 items-end">
                                <div className="space-y-2 w-3/4">
                                    <Label htmlFor="name">Name</Label>
                                    <Input 
                                        className="bg-muted"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <Select id="category" value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value ?? "" }))}>
                                    <SelectTrigger className="bg-muted">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            <SelectItem value="Group 1">Group 1</SelectItem>
                                            <SelectItem value="Group 2">Group 2</SelectItem>
                                            <SelectItem value="Group 3">Group 3</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>                                                             
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea 
                                    id="description"
                                    name="description"
                                    className="bg-muted min-h-[10rem]"
                                    value={formData.description}
                                    onChange={e => {
                                        setFormData(prev => ({ ...prev, description: e.target.value }))
                                    }}
                                />
                            </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                className="bg-muted"
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={e => {
                                    setFormData(prev => ({ ...prev, price: Number(e.target.value) }))
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cost">Cost</Label>
                            <Input
                                className="bg-muted"
                                id="cost"
                                name="cost"
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.cost}
                                onChange={e => {
                                    setFormData(prev => ({ ...prev, cost: Number(e.target.value) }))
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input 
                                className="bg-muted"
                                id="quantity"
                                name="quantity"
                                type="number"
                                min="0"
                                step="1"
                                value={formData.quantity}
                                onChange={e => {
                                    setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-3">

                </div>

                <div className="flex justify-end gap-2">
                    {isEdit && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete this product?")) {
                                    deleteProduct(id);
                                    navigate("/admin/inventory");
                                } 
                                toast("Product deleted successfully!", {position: "top-center"});
                            }}
                        >
                            Delete Product
                        </Button>
                    )}
                    <Button 
                        type="submit" 
                        disabled={isFormEmpty && !isEdit}
                    >
                        {isEdit ? "Update Product" : "Create Product"}
                    </Button>
                </div>
            </form>
        </div>
    );
}