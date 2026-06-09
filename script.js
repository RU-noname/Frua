let products = [
    {id:1, name:"Полуниця в молочному шоколаді", price:890, img:"https://picsum.photos/id/292/600/400", weight:"250г (12 шт)"},
    {id:2, name:"Полуниця в темному шоколаді", price:950, img:"https://picsum.photos/id/431/600/400", weight:"250г (12 шт)"},
    {id:3, name:"Полуниця в білому шоколаді", price:920, img:"https://picsum.photos/id/870/600/400", weight:"250г"},
    {id:4, name:"Ягідний мікс преміум", price:1250, img:"https://picsum.photos/id/201/600/400", weight:"300г"},
    {id:5, name:"Великий ягідний букет", price:1850, img:"https://picsum.photos/id/133/600/400", weight:"450г"},
    {id:6, name:"Букет «Романтика»", price:1990, img:"https://picsum.photos/id/1015/600/400", weight:"420г"},
    {id:7, name:"Екзотична колекція", price:1490, img:"https://picsum.photos/id/669/600/400", weight:"350г"},
    {id:8, name:"Коробка-серце велика", price:1350, img:"https://picsum.photos/id/292/600/400", weight:"280г"},
    {id:9, name:"Коробка-серце преміум", price:1750, img:"https://picsum.photos/id/431/600/400", weight:"350г"},
    {id:10, name:"Корпоративний бокс mini", price:2450, img:"https://picsum.photos/id/870/600/400", weight:"1.2 кг"},
    {id:11, name:"Корпоративний бокс великий", price:3890, img:"https://picsum.photos/id/201/600/400", weight:"2 кг"},
    {id:12, name:"Шоколадні літери «Love»", price:890, img:"https://picsum.photos/id/133/600/400", weight:"150г"},
    {id:13, name:"Шоколадні фігурки тварин", price:720, img:"https://picsum.photos/id/1015/600/400", weight:"120г"},
    {id:14, name:"Набір «Зроби сам» mini", price:750, img:"https://picsum.photos/id/669/600/400", weight:"12 шт"},
    {id:15, name:"Набір «Зроби сам» великий", price:1250, img:"https://picsum.photos/id/292/600/400", weight:"24 шт"},
    {id:16, name:"Міні-набір для пари", price:650, img:"https://picsum.photos/id/431/600/400", weight:"150г"},
    {id:17, name:"Сезонний мікс (полуниця + вишня)", price:980, img:"https://picsum.photos/id/870/600/400", weight:"280г"},
    {id:18, name:"Екзотичний фруктовий торт", price:2190, img:"https://picsum.photos/id/201/600/400", weight:"800г"},
    {id:19, name:"Букет з ківі та манго", price:1680, img:"https://picsum.photos/id/133/600/400", weight:"400г"},
    {id:20, name:"Преміум набір «Luxury»", price:2890, img:"https://picsum.photos/id/1015/600/400", weight:"500г"}
];

let cart = [];

// Рендер товарів
function renderProducts(filteredProducts = products) {
    const container = document.getElementById('products');
    container.innerHTML = filteredProducts.map(p => 
        <div class="product-card bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all">
            <img src="\( {p.img}" class="w-full h-64 object-cover" alt=" \){p.name}">
            <div class="p-6">
                <h3 class="font-medium text-lg leading-tight mb-2">${p.name}</h3>
                <p class="text-sm text-gray-500 mb-4">${p.weight}</p>
                <div class="flex justify-between items-center">
                    <span class="text-3xl font-semibold text-[#8b5a2b]">${p.price} грн</span>
                    <button onclick="addToCart(${p.id})" 
                            class="bg-[#8b5a2b] hover:bg-[#5c3314] text-white px-6 py-3 rounded-2xl text-sm font-medium transition">
                        В кошик
                    </button>
                </div>
            </div>
        </div>
    ).join('');
}

// Додавання в кошик
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCartCount();
    
    // Toast повідомлення
    const toast = document.createElement('div');
    toast.className = "fixed bottom-6 right-6 bg-[#8b5a2b] text-white px-6 py-4 rounded-2xl shadow-xl z-50";
    toast.textContent = ${product.name} додано ✓;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
}
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.textContent = count;
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
        return 
            <div class="flex gap-4 border-b pb-6 last:border-none">
                <img src="${item.img}" class="w-20 h-20 object-cover rounded-2xl">
                <div class="flex-1">
                    <h4 class="font-medium">${item.name}</h4>
                    <p class="text-sm text-gray-500">${item.weight} × ${item.quantity || 1}</p>
                    <p class="font-semibold">${itemTotal} грн</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 text-xl">✕</button>
            </div>
        ;
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
    alert("✅ Дякуємо за замовлення! (Це демо-версія)");
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
