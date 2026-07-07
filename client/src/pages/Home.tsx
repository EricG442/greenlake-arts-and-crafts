import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Shop from "@/components/sections/Shop";

export default function HomePage() {
    return (
        <>
            <Header />
            <main className="grid grid-cols-1 gap-8 p-4">
                <Hero />
                <Shop />
                <About />
            </main>
        </>
    );
}