[09.06.2026 11:41] ㅤㅤㅤALㅤ: let products = [
    {id:1, name:"Полуниця в молочному шоколаді", price:890, img:"https://picsum.photos/id/292/600/400", weight:"250г"},
    {id:2, name:"Полуниця в темному шоколаді", price:950, img:"https://picsum.photos/id/431/600/400", weight:"250г"},
    {id:3, name:"Ягідний мікс преміум", price:1250, img:"https://picsum.photos/id/870/600/400", weight:"300г"},
    {id:4, name:"Великий ягідний букет", price:1850, img:"https://picsum.photos/id/201/600/400", weight:"450г"},
    {id:5, name:"Екзотична колекція", price:1490, img:"https://picsum.photos/id/669/600/400", weight:"350г"},
    {id:6, name:"Коробка-серце", price:1350, img:"https://picsum.photos/id/1015/600/400", weight:"280г"},
    {id:7, name:"Корпоративний бокс", price:2450, img:"https://picsum.photos/id/133/600/400", weight:"1.2 кг"},
    {id:8, name:"Шоколадні літери", price:890, img:"https://picsum.photos/id/201/600/400", weight:"150г"},
    {id:9, name:"Набір «Зроби сам»", price:750, img:"https://picsum.photos/id/292/600/400", weight:"Комплект"},
    {id:10, name:"Букет полуниця + малина", price:1680, img:"https://picsum.photos/id/431/600/400", weight:"400г"},
    {id:11, name:"Міні-набір для пари", price:650, img:"https://picsum.photos/id/870/600/400", weight:"150г"},
    {id:12, name:"Екзотичний торт", price:2190, img:"https://picsum.photos/id/669/600/400", weight:"800г"},
];

let cart = [];

function renderProducts(filteredProducts = products) {
    const container = document.getElementById('products');
    container.innerHTML = filteredProducts.map(p => 
        <div class="product-card bg-white rounded-3xl overflow-hidden shadow-sm">
            <img src="\( {p.img}" class="w-full h-64 object-cover" alt=" \){p.name}">
            <div class="p-6">
                <h3 class="font-medium text-lg mb-2">${p.name}</h3>
                <p class="text-sm text-gray-500 mb-4">${p.weight}</p>
                <div class="flex justify-between items-center">
                    <span class="text-3xl font-semibold text-[#8b5a2b]">${p.price} грн</span>
                    <button onclick="addToCart(${p.id})" 
                            class="bg-[#8b5a2b] text-white px-6 py-3 rounded-2xl hover:bg-[#5c3314] transition">
                        В кошик
                    </button>
                </div>
            </div>
        </div>
    ).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    updateCartCount();

    const toast = document.createElement('div');
    toast.className = "fixed bottom-6 right-6 bg-[#8b5a2b] text-white px-6 py-4 rounded-2xl shadow-xl z-50";
    toast.textContent = ${product.name} додано ✓;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.getElementById('cart-count').textContent = count;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    let total = 0;

    container.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * (item.quantity || 1);
        total += itemTotal;
        return `
            <div class="flex gap-4 border-b pb-6">
                <img src="${item.img}" class="w-20 h-20 object-cover rounded-2xl">
                <div class="flex-1">
                    <h4 class="font-medium">${item.name}</h4>
[09.06.2026 11:41] ㅤㅤㅤALㅤ: <p class="text-sm text-gray-500">${item.weight} × ${item.quantity || 1}</p>
                    <p class="font-semibold mt-1">${itemTotal} грн</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">✕</button>
            </div>
        `;
    }).join('');

    document.getElementById('cart-total').textContent = total + " грн";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) return alert("Кошик порожній!");
    alert("✅ Дякуємо! Замовлення оформлено (демо версія).");
    cart = [];
    updateCartCount();
    toggleCart();
}

function sortProducts() {
    const type = document.getElementById('sort').value;
    let sorted = [...products];

    if (type === 'price-low') sorted.sort((a, b) => a.price - b.price);
    else if (type === 'price-high') sorted.sort((a, b) => b.price - a.price);

    renderProducts(sorted);
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});
