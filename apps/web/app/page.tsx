import Product from "@/components/MajorElements/ProductShowcase/DailyDiscover";
import Categories from "../components/Main/Categories";
import Carousel from "../components/MajorElements/Carousel";
import NavBar from "../components/MajorElements/NavBar";
import { carouselImages } from "../constant/data";
import Footer from "@/components/MajorElements/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <header className="w-full h-16">
        <NavBar />
      </header>

      <main className="pt-16">
        <Carousel images={carouselImages} />

        <Categories />
        <Product />
        <div className="h-screen"></div>
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
