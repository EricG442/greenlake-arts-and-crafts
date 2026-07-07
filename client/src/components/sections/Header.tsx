import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <header className="border-b-2">
                <div className="mx-auto flex h-16 items-center px-4">

                    <div className="w-10" />

                    <div className="flex-1 text-center">
                        <h1 className="text-xl font-bold">Hearts & Crafts</h1>
                    </div>


                    <div className="relative">
                        <Button variant="ghost" size="icon">
                            <ShoppingCart className="h-5 w-5" />
                        </Button>                       
                        
                        <span 
                            className="
                                absolute
                                -right-1
                                -top-1
                                flex
                                h-5
                                w-5
                                items-center
                                justify-center
                                rounded-full
                                bg-primary
                                text-white
                                text-xs
                            "
                        >
                            1
                        </span>
                    </div>
                </div>
        </header>
    );
}