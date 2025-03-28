import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import ShopTrends from "../../components/ShopTrends";
import FeaturedCollections from "../../components/FeaturedCollections";
import CustomerReviews from "../../components/CustomerReviews";
import InstagramFeed from "../../components/InstagramFeed";

const Home = () => {
  return (
    <>
      <Hero/>
      <Categories />
      <ShopTrends />
      <FeaturedCollections />
      <CustomerReviews />
      <InstagramFeed />
    </>
  );
};

export default Home;
