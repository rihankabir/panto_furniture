/* =======================
   PRODUCT DATA
======================= */
const products = [
  { id: 1, name: "Chair", subname: "Sakarias Armchair", category: "chair", price: 392, image: "chair1.png", rating: "stars.png" },
  { id: 2, name: "Chair", subname: "Baltsar Chair", category: "chair", price: 299, image: "chair2.png", rating: "stars.png" },
  { id: 3, name: "Chair", subname: "Anjay Chair", category: "chair", price: 519, image: "chair3.png", rating: "stars.png" },
  { id: 4, name: "Chair", subname: "Nyantuy Chair", category: "chair", price: 921, image: "chair4.png", rating: "stars.png" },

  { id: 5, name: "Luxury Bed", subname: "Premium Bed", category: "bed", price: 900, image: "chair4.png", rating: "stars.png" },
  { id: 6, name: "Chair", subname: "Simple Chair", category: "chair", price: 150, image: "chair2.png", rating: "stars.png" },

  { id: 7, name: "Sofa Comfort", subname: "Soft Sofa", category: "sofa", price: 600, image: "chair3.png", rating: "stars.png" },
  { id: 8, name: "Luxury Bed", subname: "Modern Bed", category: "bed", price: 900, image: "chair4.png", rating: "stars.png" },

  { id: 9, name: "Night Lamp", subname: "Warm Light", category: "lamp", price: 90, image: "lamp1.jpg", rating: "stars.png" },
  { id: 10, name: "Chair Classic", subname: "Classic Wood", category: "chair", price: 150, image: "chair2.png", rating: "stars.png" },

  { id: 11, name: "Luxury Bed", subname: "Royal Bed", category: "bed", price: 900, image: "chair4.png", rating: "stars.png" },
  { id: 12, name: "Chair Classic", subname: "Office Chair", category: "chair", price: 150, image: "chair2.png", rating: "stars.png" },

  { id: 13, name: "Sofa Comfort", subname: "Family Sofa", category: "sofa", price: 600, image: "chair3.png", rating: "stars.png" },
  { id: 14, name: "Luxury Bed", subname: "King Bed", category: "bed", price: 900, image: "chair4.png", rating: "stars.png" },

  { id: 15, name: "Chair Classic", subname: "Dining Chair", category: "chair", price: 150, image: "chair2.png", rating: "stars.png" },
  { id: 16, name: "Sofa Comfort", subname: "Relax Sofa", category: "sofa", price: 600, image: "chair3.png", rating: "stars.png" },

  { id: 17, name: "Luxury Bed", subname: "Soft Mattress", category: "bed", price: 900, image: "chair4.png", rating: "stars.png" }
];

/* =======================
   STATE
======================= */
let cartCount = 0;
let currentCategory = "chair";

const carouselInner = document.getElementById("carouselInner");
const searchInput = document.getElementById("searchInput");
const cartCountEl = document.getElementById("cartCount");

/* =======================
   RESPONSIVE LOGIC
======================= */
function getItemsPerSlide() {
  if (window.innerWidth < 576) return 1;   // mobile
  if (window.innerWidth < 992) return 2;
  if (window.innerWidth < 1100) return 3;   // tablet
  return 4;                               // desktop
}

/* =======================
   RENDER PRODUCTS
======================= */
function renderProducts(list) {
  carouselInner.innerHTML = "";

  const itemsPerSlide = getItemsPerSlide();

  for (let i = 0; i < list.length; i += itemsPerSlide) {
    const chunk = list.slice(i, i + itemsPerSlide);

    let slideHTML = `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row g-4 justify-content-center align-items-center">
    `;

    chunk.forEach(p => {
      slideHTML += `
        <div class=" col-xl-3 col-12 col-sm-12 col-md-5 col-lg-3">
          <div class="card item text-start h-100">
            <img src="images/${p.image}" class="card-img-top context3" alt="${p.name}">

            <div class="card-body">
              <h6>${p.name}</h6>
              <h2 class="txt9">${p.subname || ""}</h2>

              ${p.rating ? `<img src="images/${p.rating}" alt="rating">` : ""}

              <div class="d-flex align-items-center justify-content-between mt-4">
                <p class="context1 mb-0">$${p.price}</p>
                <button class="btn btn-sm" onclick="addToCart()">
                  <img src="images/cart_button.png" alt="add to cart">
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    slideHTML += `
        </div>
      </div>
    `;

    carouselInner.innerHTML += slideHTML;
  }
}

/* =======================
   FILTER PRODUCTS
======================= */
function loadProducts() {
  const searchValue = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(p =>
    p.category === currentCategory &&
    (p.name.toLowerCase().includes(searchValue) ||
     (p.subname && p.subname.toLowerCase().includes(searchValue)))
  );

  renderProducts(filteredProducts);
}

/* =======================
   CART
======================= */
function addToCart() {
  cartCount++;
  cartCountEl.innerText = cartCount;
}

/* =======================
   CATEGORY TABS
======================= */
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".tab-btn.active").classList.remove("active");
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    loadProducts();
  });
});

/* =======================
   SEARCH
======================= */
searchInput.addEventListener("input", loadProducts);

/* =======================
   HANDLE RESIZE (CRITICAL)
======================= */
window.addEventListener("resize", () => {
  loadProducts();
});

/* =======================
   INITIAL LOAD
======================= */
loadProducts();
