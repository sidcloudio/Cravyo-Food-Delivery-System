// ─── CURSOR ───
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('button, a, .cat-card, .food-card, .cart-widget').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ─── NAV SCROLL ───
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ─── CART STATE ───
const toast = document.getElementById('toast');
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById('cartCount');

function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

updateCartCount();

// ─── ADD TO CART ───
function addToCart(btn, name, price) {

  if (btn.classList.contains('added')) {
    // REMOVE one item
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    btn.classList.remove('added');
    btn.textContent = '+';
  } else {
    // ADD item
    cart.push({ name, price: Number(price) });
    btn.classList.add('added');
    btn.textContent = '✓';
  }

  // SAVE
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart:", cart);

  // COUNT UPDATE
  updateCartCount();

  // TOAST SHOW
  if (toast) {
    toast.textContent = btn.classList.contains('added')
      ? `✅ ${name} added!`
      : `❌ ${name} removed!`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // 🔥 BACKEND CALL
  fetch("http://127.0.0.1:5000/add-to-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: 1,
      item_name: name,
      quantity: 1
    })
  })
  .then(res => res.json())
  .then(data => console.log("Backend:", data))
  .catch(err => console.log("Backend offline, localStorage use ho raha hai"));
}

// ─── CLEAR CART ───  ← YE FIX HAI (pehle addToCart ke andar band tha!)
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  if (window.location.pathname.endsWith("cart.html")) {
    window.location.reload();
  }
}

// ─── OPEN CART ───
function openCart() {
  window.location.href = "cart.html";
}

// ─── PLACE ORDER ───
function placeOrder() {
  if (!cart.length) {
    alert('Cart khali hai! Pehle kuch add karo 😄');
    return;
  }
  alert('Order placed successfully! 🎉');
  clearCart();
}

// ─── FAVOURITES ───
function toggleFav(el) {
  el.classList.toggle('liked');
  el.textContent = el.classList.contains('liked') ? '❤️' : '🤍';
}

// ─── CATEGORIES ───
function filterCategory(el) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

// ─── SEARCH ───
function searchFood() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  const val = searchInput.value.trim();
  if (val && toast) {
    toast.textContent = `🔍 Searching for "${val}"...`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchFood();
  });
}

// ─── OFFER ───
function claimOffer() {
  if (toast) {
    toast.textContent = '🎉 Offer claimed!';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));


// 🔐 SIGNUP API
async function signup() {
  const data = {
    first_name: document.getElementById("fname").value,
    last_name: document.getElementById("lname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value
  };

  const res = await fetch("http://127.0.0.1:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (result.message) {
    alert("Signup Successful 🎉");
    window.location.href = "login.html";
  } else {
    alert(result.error);
  }
}


// 🔐 LOGIN API
async function login() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  const res = await fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (result.message) {
    alert("Login Successful 🎉");
    window.location.href = "index.html";
  } else {
    alert("Invalid Credentials ❌");
  }
}
