
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import './App.css'
import { useLoading } from "./context/LoadingContext";
import FullPageLoader from "./components/FullPageLoader";
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

const App = () => {
  const { loading } = useLoading();

  return (
    <Router>
      <Layout>
        {loading && <FullPageLoader />}

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <FeaturedProducts />
            </>
          } />

          {/* Fallback for any unknown route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
