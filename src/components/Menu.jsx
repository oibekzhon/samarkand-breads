import galaOsiyo from "../assets/Gala-Osiyo noni.jpg";
import kunjutli from "../assets/Kunjutli obinon.jpg";
import sariyogli from "../assets/Sariyog'li patir.jpg";

const products = [
    {
        id: "Gala-Osiyo noni",
        name: "An'anaviy Gala-Osiyo Noni",
        description: "O'zining og'irligi va betakror yaltiroq tilla korchkasi bilan mashhur bo'lgan afsonaviy non.",
        price: "15 000 so'm",
        image: galaOsiyo,
    },
    {
        id: "Kunjutli obinon",
        name: "Premium Kunjutli Obinon",
        description: "Yuzasiga mo'l-ko'l kunjut va sedana sepilgan, xushbo'y va yumshoq kundalik non.",
        price: "12 000 so'm",
        image: kunjutli,
    },
    {
        id: "Sariyog'li patir",
        name: "Uvalanib ketadigan Sariyog'li Patir",
        description: "Sariyog' va sut qo'shib qorilgan xamirdan tayyorlangan, bayramona shirin patir non.",
        price: "20 000 so'm",
        image: sariyogli,
    },
];

function Menu({ onOrderClick }) {
    const handleOrderClick = (productId) => {
        onOrderClick(productId);
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="menu" className="menu">
            <div className="container">
                <h2 className="section-title">Bizning mahsulotlarimiz</h2>
                <p className="section-subtitle">Dasturxoningiz ko'rki bo'ladigan issiq va mazali non turlari</p>

                <div className="menu-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <div className="product-img-box">
                                <img src={product.image} alt={product.id} />
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <div className="product-price-row">
                                    <span className="price">{product.price}</span>
                                    <button
                                        className="btn btn-sm order-trigger"
                                        onClick={() => handleOrderClick(product.id)}
                                    >
                                        Sotib olish
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Menu;