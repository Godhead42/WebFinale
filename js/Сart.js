document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    const cartKey = `${username}_cart`;
    let cartDisplayElement = document.getElementById('cartDisplay');
    let cartItems = [];

    try {
        cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch (error) {
        console.error('Ошибка разбора корзины пользователя:', error);
    }

    function renderCart() {
        let cartDisplayHTML = '';

        if (cartItems.length > 0) {
            cartItems.forEach(item => {
                cartDisplayHTML += `
                    <div class="book">
                        <div class="book-cover">
                            <img src="${item.cover}" alt="${item.title} Cover">
                        </div>
                        <div class="book-details">
                            <p>${item.title}</p>
                            <p>Price: $${item.price}</p>
                            <div class="quantity-controls">
                                ${item.quantity > 1 ?
                                    `<button class="btn btn-info btn-sm changeQuantityButton" data-title="${item.title}" data-action="decrease">-</button>` :
                                    `<i class="fa-solid fa-trash changeQuantityButton" data-title="${item.title}" data-action="remove"></i>`
                                }
                                <span class="quantity">${item.quantity}</span>
                                <button class="btn btn-success btn-sm changeQuantityButton" data-title="${item.title}" data-action="increase">+</button>
                            </div>
                            <br>
                        </div>
                        <br>
                        <br>
                    </div>
                    <hr>
                `;
            });
        } else {
            cartDisplayHTML = 'Корзина пользователя пуста';
        }

        cartDisplayElement.innerHTML = cartDisplayHTML;
    }

    function updateCart(action, title) {
        let existingItemIndex = cartItems.findIndex(item => item.title === title);
    
        switch (action) {
            case 'increase':
                if (existingItemIndex !== -1) {
                    cartItems[existingItemIndex].quantity++;
                } else {
                    // Если книги нет в корзине, добавляем с начальным количеством 1
                    cartItems.push({ title, quantity: 1 });
                }
                break;
            case 'decrease':
                if (existingItemIndex !== -1) {
                    cartItems[existingItemIndex].quantity = Math.max(1, cartItems[existingItemIndex].quantity - 1);
                }
                break;
            case 'remove':
                cartItems = cartItems.filter(item => item.title !== title);
                break;
            default:
                break;
        }
    
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
        renderCart();
        updateCartBadge();
    }
    
    function updateCartBadge() {
        const cartBadgeElement = document.querySelector('.cart-badge');
        if (cartBadgeElement) {
            cartBadgeElement.textContent = cartItems.reduce((total, item) => total + item.quantity, 0).toString();
        }
    }

    cartDisplayElement.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('changeQuantityButton')) {
            const title = target.getAttribute('data-title');
            const action = target.getAttribute('data-action');
            updateCart(action, title);
        }
    });

    function addToCart(title, price, cover) {
        // Получение текущей корзины пользователя из Local Storage
        const username = localStorage.getItem('username');
        const cartKey = `${username}_cart`;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
        // Проверка, есть ли уже такая книга в корзине
        const existingItem = cart.find(item => item.title === title);
    
        if (existingItem) {
            // Если книга уже есть в корзине, увеличиваем количество
            existingItem.quantity++;
        } else {
            // Если книги нет в корзине, добавляем с начальным количеством 1
            cart.push({ title, price, cover, quantity: 1 });
        }
    
        // Сохранение обновленной корзины в Local Storage
        localStorage.setItem(cartKey, JSON.stringify(cart));
    
        alert('Book added to cart.');
        return true;
    }
    

    const addToCartButtons = document.querySelectorAll('.addToCartButton');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bookDetails = button.closest('.book-details');
            const title = bookDetails.querySelector('p:nth-child(1)').textContent.trim();
            const price = parseFloat(bookDetails.querySelector('p:nth-child(2)').textContent.replace('Price: $', ''));
            const cover = bookDetails.previousElementSibling.querySelector('img').src;

            updateCart('increase', title);
            alert('Book added to cart.');
        });
    });

    // Опционально: вызвать функцию при загрузке страницы, чтобы установить начальное значение
    renderCart();
    addToCart(title, price, cover);

});
