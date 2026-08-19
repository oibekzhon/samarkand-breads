import heroImage from "../assets/Samarkand Bread.jpg";

function Hero() {
    return (
        <section id="home" className="hero">
            <div className="container hero-container">
                <div className="hero-text">
                    <span className="hero-subtitle">An'anaviy va unutilmas ta'm</span>
                    <h1>Asl Samarqand nonlarining sehrli lazzati!</h1>
                    <p>
                        Ko'p asrlik an'analar va maxsus retseptlar asosida tayyorlangan,
                        tandirdan yangi uzilgan issiqqina nonlarni uyingizga yetkazib beramiz.
                    </p>
                    <div className="hero-buttons">
                        <a href="#menu" className="btn btn-primary">Katalogga o'tish</a>
                        <a href="#about" className="btn btn-secondary">Batafsil ma'lumot</a>
                    </div>
                </div>
                <div className="hero-image-wrap">
                    <img src={heroImage} alt="Samarkand Bread" className="hero-featured-image" />
                </div>
            </div>
        </section>
    );
}

export default Hero;