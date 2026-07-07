import ProductCard from "../products/ProductCard";

export default function Shop() {
    return (
        <div className="border-2 border-gray-300 rounded-lg p-4">
            <h2>Shop Our Products</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    );
}