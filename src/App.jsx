import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
    const [selectedProduct, setSelectedProduct] = useState("");

    return (
        <>
            <Header />
            <Hero />
            <About />
            <Menu onOrderClick={setSelectedProduct} />
            <Contact selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
            <Footer />
        </>
    );
}

export default App;