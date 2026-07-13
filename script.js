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

    const BACKEND_URL = "https://sam-pink-eta.vercel.app/api/send-order";

    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("userName").value.trim();
            const phone = document.getElementById("userPhone").value.trim();
            const selectedProduct = productSelect.value;

            if (!selectedProduct) {
                showStatus("Iltimos, non turini tanlang!", false);
                return;
            }

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
                    product: selectedProduct
                })
            })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) => {
                    if (status === 200 && body.ok) {
                        showStatus(`Rahmat, ${name}! Buyurtmangiz qabul qilindi va botga yuborildi.`, true);
                        orderForm.reset();
                    } else {
                        throw new Error(body.error || "Server xatolik qaytardi");
                    }
                })
                .catch(error => {
                    console.error("Xatolik:", error);
                    showStatus("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring yoki internetingizni tekshiring.", false);
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
});