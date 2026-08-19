import { useState, useEffect } from "react";

const PHONE_PREFIX = "+998 ";
const namePattern = /^[a-zA-ZʻʼʹА-Яа-яЁёʼ'’‘\-\s]{2,60}$/u;
const phonePattern = /^\+998 \d{2} \d{3} \d{2} \d{2}$/;
const BACKEND_URL = "https://sam-pink-eta.vercel.app/api/send-order";

function Contact({ selectedProduct, setSelectedProduct }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [status, setStatus] = useState({ text: "", success: false, show: false });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let widgetId;
        if (window.turnstile) {
            widgetId = window.turnstile.render("#turnstile-widget", {
                sitekey: "0x4AAAAAAD2a3zjwxj8Ia8rR",
            });
        }
        return () => {
            if (window.turnstile && widgetId !== undefined) {
                window.turnstile.remove(widgetId);
            }
        };
    }, []);

    const handlePhoneFocus = () => {
        if (!phone) setPhone(PHONE_PREFIX);
    };

    const handlePhoneChange = (e) => {
        let digits = e.target.value.replace(/\D/g, "");
        if (digits.startsWith("998")) digits = digits.slice(3);
        digits = digits.slice(0, 9);

        let formatted = "+998";
        if (digits.length > 0) formatted += " " + digits.slice(0, 2);
        if (digits.length > 2) formatted += " " + digits.slice(2, 5);
        if (digits.length > 5) formatted += " " + digits.slice(5, 7);
        if (digits.length > 7) formatted += " " + digits.slice(7, 9);

        setPhone(formatted);
        setPhoneError("");
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameError("");
        setPhoneError("");
        setStatus({ text: "", success: false, show: false });

        let hasError = false;

        if (!namePattern.test(name.trim())) {
            setNameError("Ism faqat harflardan iborat bo'lishi kerak!");
            hasError = true;
        }
        if (!phonePattern.test(phone.trim())) {
            setPhoneError("Telefon raqami to'liq kiritilmagan (+998 XX XXX XX XX)");
            hasError = true;
        }
        if (!selectedProduct) {
            setStatus({ text: "Iltimos, non turini tanlang!", success: false, show: true });
            hasError = true;
        }

        if (hasError) return;

        setSubmitting(true);

        try {
            const turnstileToken =
                document.querySelector('[name="cf-turnstile-response"]')?.value || "";

            const response = await fetch(BACKEND_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    phone: phone.trim(),
                    product: selectedProduct,
                    website,
                    turnstileToken,
                }),
            });

            const body = await response.json();

            if (response.status === 200 && body.ok) {
                setStatus({
                    text: `Rahmat, ${name}! Buyurtmangiz qabul qilindi va botga yuborildi.`,
                    success: true,
                    show: true,
                });
                setName("");
                setPhone("");
                setSelectedProduct("");
            } else {
                const errMsg = body.error || "Server xatolik qaytardi";
                const lowerMsg = errMsg.toLowerCase();

                if (lowerMsg.includes("ism")) {
                    setNameError(errMsg);
                } else if (lowerMsg.includes("telefon")) {
                    setPhoneError(errMsg);
                } else {
                    setStatus({ text: errMsg, success: false, show: true });
                }
            }
        } catch (error) {
            console.error("Xatolik:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="contact-box">
                    <h2>Issiqqina non buyurtma qiling!</h2>
                    <p>
                        Ismingiz va telefon raqamingizni qoldiring, operatorimiz 5 daqiqada siz
                        bilan bog'lanadi va manzilingizni aniqlashtiradi.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Ismingiz"
                                value={name}
                                onChange={handleNameChange}
                                className={nameError ? "input-error" : ""}
                                required
                            />
                            {nameError && <span className="field-error">{nameError}</span>}
                        </div>

                        <div className="form-group">
                            <input
                                type="tel"
                                placeholder="+998 90 123 45 67"
                                value={phone}
                                onFocus={handlePhoneFocus}
                                onChange={handlePhoneChange}
                                className={phoneError ? "input-error" : ""}
                                required
                            />
                            {phoneError && <span className="field-error">{phoneError}</span>}
                        </div>

                        <div className="form-group">
                            <select
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                <option value="" disabled>Non turini tanlang</option>
                                <option value="Gala-Osiyo noni">An'anaviy Gala-Osiyo Noni</option>
                                <option value="Kunjutli obinon">Premium Kunjutli Obinon</option>
                                <option value="Sariyog'li patir">Uvalanib ketadigan Sariyog'li Patir</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            style={{ position: "absolute", left: "-9999px" }}
                            tabIndex="-1"
                            autoComplete="off"
                        />

                        <div id="turnstile-widget"></div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                            {submitting ? "Yuborilmoqda..." : "Buyurtmani tasdiqlash"}
                        </button>
                    </form>

                    {status.show && (
                        <div className={`status-msg ${status.success ? "status-success" : "status-error"}`}>
                            {status.text}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Contact;