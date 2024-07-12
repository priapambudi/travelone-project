import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Experience from "../components/Experience";
import Activity from "../components/Activity";
import Promo from "../components/Promo";
import Testimony from "../components/Testimony";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Experience />
      <Category />
      <Activity />
      <Promo />
      <Testimony />
      <Footer />
    </div>
  );
};
export default Home;
