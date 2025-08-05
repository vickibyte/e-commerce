import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import './App.css'
import { useLoading } from "./context/LoadingContext";
import FullPageLoader from "./components/FullPageLoader";
import Footer from './components/Footer';

const App = () => {
  const { loading } = useLoading();

  return (
    <>
      <Header />
      <Hero />
       {loading && <FullPageLoader />}
      <FeaturedProducts />

      <Footer />
    </>
  )
}

export default App
