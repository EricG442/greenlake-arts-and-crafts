import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Shop from "@/components/sections/Shop";

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Shop />
                <About />
            </main>
        </>
    );
}