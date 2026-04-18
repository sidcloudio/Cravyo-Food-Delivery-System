// ─── CURSOR ───
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('button, a, .cat-card, .food-card, .cart-widget').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ─── NAV SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── CART UI + BACKEND ───
  let cartItems = 0;
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');

// Track items (optional future use)
let cart = {};

function addToCart(btn, name) {

  // 🔁 TOGGLE LOGIC
  if (btn.classList.contains('added')) {
    
    // ❌ REMOVE
    cartItems--;
    cartCount.textContent = cartItems;

    btn.classList.remove('added');
    btn.textContent = '+';
    btn.style.background = '';

    toast.textContent = `❌ ${name} removed from cart`;
    
  } else {
    
    // ✅ ADD
    cartItems++;
    cartCount.textContent = cartItems;

    btn.classList.add('added');
    btn.textContent = '✓';
    btn.style.background = '#4CAF50';

    toast.textContent = `✅ ${name} added to cart!`;
  }

  // 🔔 TOAST SHOW
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);



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
  .then(data => console.log(data));
}

// 🛒 OPEN CART
function openCart() {
  fetch("http://127.0.0.1:5000/cart/1")
    .then(res => res.json())
    .then(data => {
      let items = data.map(item => `${item[0]} (x${item[1]})`).join("\n");
      alert(`🛒 Your Cart:\n\n${items}`);
    });
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
  const val = document.getElementById('searchInput').value.trim();
  if (val) {
    toast.textContent = `🔍 Searching for "${val}"...`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }
}
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') searchFood();
});

// ─── OFFER ───
function claimOffer() {
  toast.textContent = '🎉 Offer claimed!';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
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
    headers: {
      "Content-Type": "application/json"
    },
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
    headers: {
      "Content-Type": "application/json"
    },
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
