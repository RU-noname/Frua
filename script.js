const products = [
  {
    id: 1,
    name: "Полуниця в молочному шоколаді",
    price: 890,
    img: "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=800",
    weight: "250г"
  },
  {
    id: 2,
    name: "Полуниця в білому шоколаді",
    price: 920,
    img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800",
    weight: "250г"
  },
  {
    id: 3,
    name: "Полуниця в темному шоколаді",
    price: 950,
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=800",
    weight: "250г"
  },
  {
    id: 4,
    name: "Ягідний мікс Premium",
    price: 1250,
    img: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?w=800",
    weight: "300г"
  },
  {
    id: 5,
    name: "Luxury Box",
    price: 1490,
    img: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=800",
    weight: "350г"
  },
  {
    id: 6,
    name: "Романтичний набір",
    price: 1750,
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    weight: "400г"
  },
  {
    id: 7,
    name: "Подарункова коробка",
    price: 1190,
    img: "https://images.unsplash.com/photo-1514996937319-344454492b37?w=800",
    weight: "280г"
  },
  {
    id: 8,
    name: "Фруктовий букет",
    price: 1890,
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800",
    weight: "450г"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(list = products) {
  const container = document.getElementById("products");

  container.innerHTML = list.map(product => `
    <div class="product-card">
      <img src="${product.img}" alt="${product.name}">
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">
          ${product.name}
        </h3>
        <p class="text-gray-500 mb-4">
          ${product.weight}
        </p>
        <div class="flex justify-between items-center mb-4">
          <span class="text-2xl font-bold text-[#8b5a2b]">
            ${product.price} грн
          </span>
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex items-center border border-[#8b5a2b] rounded-lg">
            <button
              onclick="decrementQty(${product.id})"
              class="px-3 py-1 text-[#8b5a2b] font-bold hover:bg-[#f8f5f2]">
              −
            </button>
            <span id="qty-${product.id}" class="px-3 py-1 min-w-[40px] text-center">1</span>
            <button
              onclick="incrementQty(${product.id})"
              class="px-3 py-1 text-[#8b5a2b] font-bold hover:bg-[#f8f5f2]">
              +
            </button>
          </div>
          <button
            onclick="addToCartWithQty(${product.id})"
            class="flex-1 bg-[#8b5a2b] text-white px-4 py-2 rounded-xl hover:bg-[#6d4410]">
            В кошик
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

let productQuantities = {};

function incrementQty(id) {
  if (!productQuantities[id]) productQuantities[id] = 1;
  productQuantities[id]++;
  document.getElementById(`qty-${id}`).textContent = productQuantities[id];
}

function decrementQty(id) {
  if (!productQuantities[id]) productQuantities[id] = 1;
  if (productQuantities[id] > 1) {
    productQuantities[id]--;
    document.getElementById(`qty-${id}`).textContent = productQuantities[id];
  }
}

function addToCartWithQty(id) {
  const quantity = productQuantities[id] || 1;
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity
    });
  }

  saveCart();
  showToast(product.name, quantity);
  productQuantities[id] = 1;
  document.getElementById(`qty-${id}`).textContent = 1;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  showToast(product.name);
}

function showToast(name, qty = 1) {
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-6 right-6 bg-[#8b5a2b] text-white px-6 py-4 rounded-2xl shadow-xl z-50";
  toast.textContent = `${name} (${qty} шт.) додано в кошик`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function updateCartCount() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  document.getElementById("cart-count").textContent = count;
}

function toggleCart() {
  const modal = document.getElementById("cart-modal");
  modal.classList.toggle("hidden");
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  let total = 0;

  container.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    return `
      <div class="flex gap-4 border-b pb-4 mb-4">
        <img
          src="${item.img}"
          class="w-20 h-20 object-cover rounded-xl">
        <div class="flex-1">
          <h4 class="font-semibold">
            ${item.name}
          </h4>
          <p class="text-gray-600 mb-2">
            ${item.weight}
          </p>
          <div class="flex gap-2 items-center mb-2">
            <button
              onclick="decrementCartItem(${index})"
              class="px-2 py-1 border border-[#8b5a2b] text-[#8b5a2b] rounded hover:bg-[#f8f5f2]">
              −
            </button>
            <span class="px-3 text-center min-w-[30px]">${item.quantity}</span>
            <button
              onclick="incrementCartItem(${index})"
              class="px-2 py-1 border border-[#8b5a2b] text-[#8b5a2b] rounded hover:bg-[#f8f5f2]">
              +
            </button>
          </div>
          <p>
            ${item.price} грн × ${item.quantity} = <span class="font-bold">${itemTotal} грн</span>
          </p>
        </div>
        <button
          onclick="removeFromCart(${index})"
          class="text-red-500 text-xl hover:text-red-700">
          ✕
        </button>
      </div>
    `;
  }).join("");

  document.getElementById("cart-total").textContent = total + " грн";
}

function incrementCartItem(index) {
  cart[index].quantity++;
  saveCart();
  renderCart();
}

function decrementCartItem(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) {
    alert("Кошик порожній");
    return;
  }

  alert("Дякуємо за замовлення ❤️");
  cart = [];
  saveCart();
  renderCart();
  toggleCart();
}

function sortProducts() {
  const type = document.getElementById("sort").value;
  let sorted = [...products];

  if (type === "price-low") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (type === "price-high") {
    sorted.sort((a, b) => b.price - a.price);
  }

  renderProducts(sorted);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();

  const search = document.getElementById("search");

  search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value)
    );
    renderProducts(filtered);
  });
});
