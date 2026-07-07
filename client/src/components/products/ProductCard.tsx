import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function ProductCard() {
    return (
        <Card 
            className="
                overflow-hidden
                border-0
                shadow-none
                transition-transform
                duration-300
                hover:-translate-y-1
            "
        >
            <AspectRatio ratio={4 / 5}>
                <img
                    src="/placeholder.svg"
                    alt="Product Image"
                    className="object-cover w-full h-full"
                />
            </AspectRatio>

            <div className="pt-3">
                <h3 className="font-medium">Product Name</h3>
                <p className="text-muted-foreground">Price</p>
            </div>
        </Card>
    )
}