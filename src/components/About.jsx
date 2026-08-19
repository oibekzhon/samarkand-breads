function About() {
    return (
        <section id="about" className="about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-content">
                        <h2>Nega aynan bizning nonlar?</h2>
                        <p>
                            Samarqand noni o'zining betakror ko'rinishi, zichligi va uzoq vaqt
                            davomida qotmasdan, o'z ta'mini saqlab qolishi bilan mashhur. Biz har
                            bir nonni sevgi va an'analarga sodiqlik bilan yopamiz.
                        </p>
                        <ul className="about-list">
                            <li>✨ Faqat tabiiy va yuqori sifatli masalliqlar</li>
                            <li>🔥 Haqiqiy o'tin tandirda pishiriladi</li>
                            <li>🌾 Qadimiy va sirlari saqlangan retsept</li>
                        </ul>
                    </div>
                    <div className="about-stats">
                        <div className="stat-card">
                            <h3>100%</h3>
                            <p>Tabiiy mahsulot</p>
                        </div>
                        <div className="stat-card">
                            <h3>24/7</h3>
                            <p>Tezkor yetkazib berish</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;