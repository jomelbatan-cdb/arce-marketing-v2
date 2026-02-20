"use client";
import FullscreenLoader from "@/components/Loaders/Loaders";
import Footer from "@/components/MajorElements/Footer";
import NavBar from "@/components/MajorElements/NavBar";
import ProductFull from "@/components/MajorElements/Products/ProductFull";
import Recommended from "@/components/MajorElements/ProductShowcase/Recommended";
import { useGetProduct } from "@/hooks/product/useGetProduct";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const productId = params.productId;
  const {
    product,
    isError: productError,
    isLoading: productLoading,
  } = useGetProduct(productId as string);
  if (!product) {
    return null;
  }
  if (productLoading) {
    return <FullscreenLoader />;
  }
  const categoryId =
    typeof product.category === "string"
      ? product.category
      : product.category._id;
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <header className="w-full h-16 fixed top-0 z-50">
        <NavBar />
      </header>

      <main className="pt-16">
        <ProductFull product={product} />
        <Recommended categoryId={categoryId} productId={product._id} />
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
