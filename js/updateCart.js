document.addEventListener('DOMContentLoaded', function () {
    function updateCartBadge() {
        const username = localStorage.getItem('username');
        const cartKey = `${username}_cart`;
        const cartBadgeElement = document.querySelector('.cart-badge');

        if (cartBadgeElement) {
            const storedCartItems = localStorage.getItem(cartKey);
            const cartItems = JSON.parse(storedCartItems) || [];
            cartBadgeElement.textContent = cartItems.length.toString();
        }
    }

    // Вызывать функцию при загрузке страницы, чтобы установить начальное значение
    updateCartBadge();
});
