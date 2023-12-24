import Header from "./components/Layout/Header/Header";
import Policy from "./components/Layout/Policy/Policy";
import Footer from "./components/Layout/Footer/Footer";
import Sliders from "./components/Slider/Sliders";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Sliders />
      <Categories />
      <Products />
      <Policy />
      <Footer />
    </>
  );
}

export default App;
