import { Link } from "react-router-dom";
import Couch from "@/data/images/couch.png";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { posts } from "@/data/posts";
import CarouselCard from "@/components/products/CarouselCard";
import BlogCard from "@/components/blogs/BlogCard";
import ProductCard from "@/components/products/ProductCard";
import api from "@/api";

const samplePosts = posts.slice(0, 3);
const sampleProducts = products.slice(0, 4);

function Home() {
  const Title = ({
    title,
    href,
    sideText,
  }: {
    title: string;
    href: string;
    sideText: string;
  }) => (
    <div className="mb-10 mt-28 flex flex-col px-4 md:flex-row md:justify-between md:px-0">
      <h2 className="mb-4 text-2xl font-bold md:mb-0">{title}</h2>
      <Link to={href} className="font-semibold text-muted-foreground underline">
        {sideText}
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto mt-0 lg:mt-16">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Text Section */}
        <div className="my-8 mt-48 text-center lg:mb-0 lg:mt-16 lg:w-2/5 lg:text-left">
          <h1 className="mb-4 mt-0 text-4xl font-extrabold text-own lg:mb-8 lg:mt-16 lg:text-6xl">
            Modern Interior Design Studio
          </h1>
          <p className="mb-6 text-own lg:mb-8">
            Furniture is an essential component of any living space, providing
            functionality, comfort, and aesthetic appeal.
          </p>
          <div>
            <Button
              asChild
              className="mr-2 rounded-full bg-orange-300 px-8 py-6 text-base font-bold"
            >
              <Link to="#">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-bold text-own"
            >
              <Link to="#">Explore</Link>
            </Button>
          </div>
        </div>
        {/* Image Section */}
        <img src={Couch} alt="Couch" className="w-full lg:w-3/5" />
      </div>
      <CarouselCard products={products} />
      <Title
        title="Featured Products"
        href="/products"
        sideText="View All Products"
      />
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-4">
        {sampleProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <Title title="Recent Blog" href="/blogs" sideText="View All Posts" />
      <BlogCard posts={samplePosts} />
    </div>
  );
}

export default Home;

export const homeLoader = async () => {
  try {
    const response = await api.get("/users/products");
    return response.data;
  } catch (error) {
    console.log("home loader: ", error);
    throw error;
  }
};
