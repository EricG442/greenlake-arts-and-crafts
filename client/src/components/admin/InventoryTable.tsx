import type Product from "@/lib/product";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface InventoryTableProps {
    products: Product[];
}

export default function InventoryTable({ products }: InventoryTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                            {product.quantity <= 3 ? (
                                <Badge variant="destructive">
                                    {product.quantity}
                                </Badge>
                            ) : (
                                <Badge variant="default">
                                    {product.quantity}
                                </Badge>
                            )}
                        </TableCell>
                        <TableCell>
                            <Badge variant={product.status === "active" ? "default" : "destructive"}>
                                {product.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                                <Link to={`/admin/inventory/${product.id}/edit`}>
                                    Edit
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}