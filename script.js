document.addEventListener("DOMContentLoaded", () => {

    const orderTriggers = document.querySelectorAll(".order-trigger");
    const productSelect = document.getElementById("productSelect");
    const contactSection = document.getElementById("contact");

    orderTriggers.forEach(button => {
        button.addEventListener("click", (e) => {
            const productName = e.target.getAttribute("data-product");

            if (productSelect) {
                productSelect.value = productName;
            }

            contactSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    const orderForm = document.getElementById("orderForm");
    const statusMessage = document.getElementById("statusMessage");
    const userNameInput = document.getElementById("userName");
    const userPhoneInput = document.getElementById("userPhone");
    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");

    const BACKEND_URL = "https://sam-pink-eta.vercel.app/api/send-order";
    const PHONE_PREFIX = "+998 ";

    const namePattern = /^[a-zA-ZʻʼʹА-Яа-яЁёʼ'’‘\-\s]{2,60}$/u;
    const phonePattern = /^\+998 \d{2} \d{3} \d{2} \d{2}$/;

    function showFieldError(input, errorEl, message) {
        input.classList.add("input-error");
        errorEl.textContent = message;
        errorEl.classList.remove("hidden");
    }

    function clearFieldError(input, errorEl) {
        input.classList.remove("input-error");
        errorEl.textContent = "";
        errorEl.classList.add("hidden");
    }

    userPhoneInput.addEventListener("focus", () => {
        if (!userPhoneInput.value) {
            userPhoneInput.value = PHONE_PREFIX;
        }
    });

    userPhoneInput.addEventListener("input", () => {
        let digits = userPhoneInput.value.replace(/\D/g, "");

        if (digits.startsWith("998")) {
            digits = digits.slice(3);
        }
        digits = digits.slice(0, 9);

        let formatted = "+998";
        if (digits.length > 0) formatted += " " + digits.slice(0, 2);
        if (digits.length > 2) formatted += " " + digits.slice(2, 5);
        if (digits.length > 5) formatted += " " + digits.slice(5, 7);
        if (digits.length > 7) formatted += " " + digits.slice(7, 9);

        userPhoneInput.value = formatted;
        clearFieldError(userPhoneInput, phoneError);
    });

    userNameInput.addEventListener("input", () => {
        clearFieldError(userNameInput, nameError);
    });

    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = userNameInput.value.trim();
            const phone = userPhoneInput.value.trim();
            const selectedProduct = productSelect.value;

            clearFieldError(userNameInput, nameError);
            clearFieldError(userPhoneInput, phoneError);

            let hasError = false;

            if (!namePattern.test(name)) {
                showFieldError(userNameInput, nameError, "Ism faqat harflardan iborat bo'lishi kerak (kamida 2 ta belgi)");
                hasError = true;
            }

            if (!phonePattern.test(phone)) {
                showFieldError(userPhoneInput, phoneError, "Telefon raqami to'liq kiritilmagan (+998 XX XXX XX XX)");
                hasError = true;
            }

            if (!selectedProduct) {
                showStatus("Iltimos, non turini tanlang!", false);
                hasError = true;
            }

            if (hasError) return;

            const submitBtn = orderForm.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            submitBtn.textContent = "Yuborilmoqda...";

            fetch(BACKEND_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    phone,
                    product: selectedProduct,
                    website: document.getElementById("website").value,
                    turnstileToken: document.querySelector('[name="cf-turnstile-response"]')?.value || ""
                })
            })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) => {
                    if (status === 200 && body.ok) {
                        showStatus(`Rahmat, ${name}! Buyurtmangiz qabul qilindi va botga yuborildi.`, true);
                        orderForm.reset();
                        userPhoneInput.value = "";
                    } else {
                        const errMsg = body.error || "Server xatolik qaytardi";
                        const lowerMsg = errMsg.toLowerCase();

                        if (lowerMsg.includes("ism")) {
                            showFieldError(userNameInput, nameError, errMsg);
                        } else if (lowerMsg.includes("telefon")) {
                            showFieldError(userPhoneInput, phoneError, errMsg);
                        } else {
                            showStatus(errMsg, false);
                        }
                        throw new Error(errMsg);
                    }
                })
                .catch(error => {
                    console.error("Xatolik:", error);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Buyurtmani tasdiqlash";
                });
        });
    }

    function showStatus(text, success) {
        statusMessage.textContent = text;
        statusMessage.className = "status-msg " + (success ? "status-success" : "status-error");
        statusMessage.classList.remove("hidden");
    }

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            mainNav.classList.toggle("active");
        });

        document.querySelectorAll("#mainNav a").forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");
            });
        });
    }
}); 